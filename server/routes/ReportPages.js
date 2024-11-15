import express from 'express';
import { pool } from '../db.js'; // Ensure your DB connection is correctly configured
import fs from 'fs';
import path from 'path';
import { createObjectCsvWriter } from 'csv-writer';
import PDFDocument from 'pdfkit';
import { v4 as uuidv4 } from 'uuid'; // For unique file naming
import { fileURLToPath } from 'url';

const ReportPRouter = express.Router();
const __dirname = path.dirname(fileURLToPath(import.meta.url)); // Simulate __dirname

ReportPRouter.get('/report-page', async (req, res) => {
  try {
    console.log('Request received to generate report');

    // Fetch volunteer data
    let volunteerReport = [];
    try {
      const [volunteerResult] = await pool.query('SELECT name, history, id FROM volunteerReport');
      volunteerReport = volunteerResult;
      console.log('Volunteer Data:', volunteerReport);
    } catch (error) {
      console.error('Error fetching volunteer data:', error.message);
      throw new Error('Failed to fetch volunteer data.');
    }

    // Fetch event data
    let eventReport = [];
    try {
      const [eventResult] = await pool.query('SELECT name, description, state, skills, urgency, date, assignment, id FROM eventReport');
      eventReport = eventResult;
      console.log('Event Data:', eventReport);
    } catch (error) {
      console.error('Error fetching event data:', error.message);
      throw new Error('Failed to fetch event data.');
    }

    // Handle no data case
    if (!volunteerReport.length && !eventReport.length) {
      return res.status(404).json({ success: false, message: 'No data available for the report' });
    }

    // Check the requested format
    const format = req.query.format;
    const uniqueId = uuidv4(); // Generate a unique identifier

    if (format === 'csv') {
      // Generate and send CSV
      const volunteerHeaders = Object.keys(volunteerReport[0] || {});
      const eventHeaders = Object.keys(eventReport[0] || {});

      const csvData = [
        { Section: 'Volunteer Report', ...Object.fromEntries(volunteerHeaders.map(h => [h, h])) },
        ...volunteerReport.map(row => ({ Section: 'Volunteer Report', ...row })),

        // Divider row for separation
        { Section: '', ...Object.fromEntries([...volunteerHeaders, ...eventHeaders].map(h => [h, ''])) },

        { Section: 'Event Report', ...Object.fromEntries(eventHeaders.map(h => [h, h])) },
        ...eventReport.map(row => ({ Section: 'Event Report', ...row })),
      
   
      ];

      const allHeaders = ['Section', ...new Set([...volunteerHeaders, ...eventHeaders])];
      const filePath = path.join(__dirname, `combined-report-${uniqueId}.csv`);

      const csvWriter = createObjectCsvWriter({
        path: filePath,
        header: allHeaders.map(header => ({ id: header, title: header })),
      });

      await csvWriter.writeRecords(csvData);

      res.download(filePath, `report-${uniqueId}.csv`, (err) => {
        if (err) {
          console.error('Error sending CSV file:', err.message);
          res.status(500).json({ success: false, message: 'Error generating CSV report' });
        }
        fs.unlink(filePath, (unlinkErr) => {
          if (unlinkErr) console.error('Error deleting CSV file:', unlinkErr.message);
        });
      });
    } else if (format === 'pdf') {
      // Generate and send PDF
      const filePath = path.join(__dirname, `report-${uniqueId}.pdf`);
      const doc = new PDFDocument();
      const writeStream = fs.createWriteStream(filePath);

      doc.pipe(writeStream);

      // Write volunteer data
      doc.fontSize(18).text('Volunteer Report', { underline: true });
      volunteerReport.forEach((volunteer) => {
        doc.fontSize(12).text(`Name: ${volunteer.name}`);
        doc.text(`History: ${volunteer.history}`);
        doc.text(`ID: ${volunteer.id}`);
        doc.moveDown();
      });

      // Write event data
      doc.addPage().fontSize(18).text('Event Report', { underline: true });
      eventReport.forEach((event) => {
        doc.fontSize(12).text(`Name: ${event.name}`);
        doc.text(`State: ${event.state}`);
        doc.text(`Skills: ${event.skills}`);
        doc.text(`Urgency: ${event.urgency}`);
        doc.text(`Date: ${event.date}`);
        doc.text(`Description: ${event.description}`);
        doc.text(`Assignment: ${event.assignment}`);
        doc.text(`ID: ${event.id}`);
        doc.moveDown();
      });

      doc.end();

      writeStream.on('finish', () => {
        res.download(filePath, `report-${uniqueId}.pdf`, (err) => {
          if (err) {
            console.error('Error sending PDF file:', err.message);
            res.status(500).json({ success: false, message: 'Error generating PDF report' });
          }
          fs.unlink(filePath, (unlinkErr) => {
            if (unlinkErr) console.error('Error deleting PDF file:', unlinkErr.message);
          });
        });
      });
    } else if (format === 'txt') {
      // Generate and send TXT
      const filePath = path.join(__dirname, `report-${uniqueId}.txt`);
      let fileContent = 'Volunteer Report\n\n';
      volunteerReport.forEach((volunteer) => {
        fileContent += `Name: ${volunteer.name}\nHistory: ${volunteer.history}\nID: ${volunteer.id}\n\n`;
      });

      fileContent += '\nEvent Report\n\n';
      eventReport.forEach((event) => {
        fileContent += `Name: ${event.name}\nDescription: ${event.description}\nState: ${event.state}\nSkills: ${event.skills}\nUrgency: ${event.urgency}\nDate: ${event.date}\nAssignment: ${event.assignment}\nID: ${event.id}\n\n`;
      });

      fs.writeFileSync(filePath, fileContent);

      res.download(filePath, `report-${uniqueId}.txt`, (err) => {
        if (err) {
          console.error('Error sending TXT file:', err.message);
          res.status(500).json({ success: false, message: 'Error generating TXT report' });
        }
        fs.unlink(filePath, (unlinkErr) => {
          if (unlinkErr) console.error('Error deleting TXT file:', unlinkErr.message);
        });
      });
    } else {
      // Default: return JSON
      res.json({
        success: true,
        volunteerReport,
        eventReport,
      });
    }
  } catch (error) {
    console.error('Error generating report:', error.message);
    res.status(500).json({ success: false, message: `Error generating report: ${error.message}` });
  }
});

export default ReportPRouter;
