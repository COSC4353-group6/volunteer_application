import express from 'express';
import { pool } from '../db.js'; // Ensure your DB connection is correctly configured
import fs from 'fs';
import path from 'path';
import { createObjectCsvWriter } from 'csv-writer';
import PDFDocument from 'pdfkit';

const ReportPRouter = express.Router();

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
      const [eventResult] = await pool.query('SELECT description, assignment, id FROM eventReport');
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

    if (format === 'csv') {
      // Generate and send CSV
      const filePath = path.join(path.resolve(), 'combined-report.csv');
      const csvWriter = createObjectCsvWriter({
        path: filePath,
        header: Object.keys(volunteerReport[0] || eventReport[0]).map((key) => ({ id: key, title: key })),
      });

      await csvWriter.writeRecords([...volunteerReport, ...eventReport]);

      res.download(filePath, 'report.csv', (err) => {
        if (err) {
          console.error('Error sending CSV file:', err.message);
          res.status(500).json({ success: false, message: 'Error generating CSV report' });
        }
        // Clean up file after sending
        fs.unlink(filePath, (unlinkErr) => {
          if (unlinkErr) console.error('Error deleting CSV file:', unlinkErr.message);
        });
      });
    } else if (format === 'pdf') {
      // Generate and send PDF
      const filePath = path.join(path.resolve(), 'report.pdf');
      const doc = new PDFDocument();

      doc.pipe(fs.createWriteStream(filePath)); // Save PDF to file

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
        doc.fontSize(12).text(`Description: ${event.description}`);
        doc.text(`Assignment: ${event.assignment}`);
        doc.text(`ID: ${event.id}`);
        doc.moveDown();
      });

      doc.end();

      res.download(filePath, 'report.pdf', (err) => {
        if (err) {
          console.error('Error sending PDF file:', err.message);
          res.status(500).json({ success: false, message: 'Error generating PDF report' });
        }
        // Clean up file after sending
        fs.unlink(filePath, (unlinkErr) => {
          if (unlinkErr) console.error('Error deleting PDF file:', unlinkErr.message);
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
