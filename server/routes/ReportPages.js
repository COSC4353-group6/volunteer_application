import express from 'express';
import { pool } from '../db.js'; // Ensure your DB connection is correctly configured
import fs from 'fs';
import path from 'path';
import { createObjectCsvWriter } from 'csv-writer';
import PDFDocument from 'pdfkit';
import { v4 as uuidv4 } from 'uuid';
import { fileURLToPath } from 'url';

const ReportPRouter = express.Router();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

ReportPRouter.get('/report-page', async (req, res) => {
  try {
    console.log(`[${new Date().toISOString()}] Request received from ${req.ip}`);

    // Fetch volunteer data
    let volunteerReport = [];
    let eventReport = [];

    try {
      const [volunteerResult] = await pool.query('SELECT name, history, id FROM volunteerReport');
      volunteerReport = volunteerResult;
    } catch (error) {
      console.error('Volunteer Data Fetch Error:', error.message);
      throw new Error('Failed to fetch volunteer data.');
    }

    try {
      const [eventResult] = await pool.query('SELECT name, description, state, skills, urgency, date, assignment, id FROM eventReport');
      eventReport = eventResult;
    } catch (error) {
      console.error('Event Data Fetch Error:', error.message);
      throw new Error('Failed to fetch event data.');
    }

    if (!volunteerReport.length && !eventReport.length) {
      return res.status(404).json({ success: false, message: 'No data available for the report' });
    }

    const format = req.query.format || 'json';
    const uniqueId = uuidv4();

    switch (format.toLowerCase()) {
      case 'csv':
        await generateCSV(volunteerReport, eventReport, res, uniqueId);
        break;
      case 'pdf':
        await generatePDF(volunteerReport, eventReport, res, uniqueId);
        break;
      case 'txt':
        await generateTXT(volunteerReport, eventReport, res, uniqueId);
        break;
      default:
        res.json({ success: true, volunteerReport, eventReport });
    }
  } catch (error) {
    console.error('Error Generating Report:', error.message);
    res.status(500).json({ success: false, message: `Error generating report: ${error.message}` });
  }
});

const generateCSV = async (volunteerReport, eventReport, res, uniqueId) => {
  const headers = volunteerReport.length ? Object.keys(volunteerReport[0]) : [];
  const filePath = path.join(__dirname, `report-${uniqueId}.csv`);

  const csvWriter = createObjectCsvWriter({
    path: filePath,
    header: headers.map((header) => ({ id: header, title: header })),
  });

  try {
    await csvWriter.writeRecords(volunteerReport);
    res.download(filePath, (err) => {
      cleanUpFile(filePath);
    });
  } catch (err) {
    console.error('CSV Generation Error:', err.message);
  }
};

const generatePDF = async (volunteerReport, eventReport, res, uniqueId) => {
  const filePath = path.join(__dirname, `report-${uniqueId}.pdf`);
  const doc = new PDFDocument();
  const writeStream = fs.createWriteStream(filePath);

  doc.pipe(writeStream);
  doc.text('Volunteer Report');
  volunteerReport.forEach((item) => doc.text(JSON.stringify(item)));
  doc.end();

  writeStream.on('finish', () => {
    res.download(filePath, (err) => cleanUpFile(filePath));
  });
};

const cleanUpFile = (filePath) => {
  fs.unlink(filePath, (err) => {
    if (err) console.log(`Error Cleaning File ${filePath}`);
  });
};

export default ReportPRouter;
