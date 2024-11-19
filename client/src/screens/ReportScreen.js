import React, { useState, useEffect } from 'react';
import '../styles/ReportPage.css';

const ReportScreen = () => {
  const [volunteerReport, setVolunteerReport] = useState([]);
  const [eventReport, setEventReport] = useState([]);
  const [loading, setLoading] = useState(false);
  const [generatingReport, setGeneratingReport] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setLoading(true);
    setSuccessMessage('');
    setErrorMessage('');

    fetch('/api/report-page') // Relative URL for fetching datafetch('/api/report-page')

      .then((response) => {
        if (!response.ok) {
          return response.json().then((err) => {
            throw new Error(err.message || 'Failed to fetch data from the server.');
          });
        }
        return response.json();
      })
      .then((data) => {
        if (data.volunteerReport && data.eventReport) {
          setVolunteerReport(data.volunteerReport);
          setEventReport(data.eventReport);
          setSuccessMessage('Data fetched successfully!');
        } else {
          throw new Error('Incomplete data received from the server.');
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setErrorMessage(error.message || 'Failed to fetch data. Please try again.');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const generateReport = (format) => {
    setGeneratingReport(true);
    setSuccessMessage('');
    setErrorMessage('');

    fetch(`/api/report-page?format=${format}`, { // Relative URL for generating report
      method: 'GET',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to generate the report.');
        }
        return response.blob(); // Get the file as a blob
      })
      .then((blob) => {
        // Create a link to download the file
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `report.${format}`; // Name of the downloaded file
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url); // Clean up
        setSuccessMessage(`Report downloaded successfully as ${format.toUpperCase()}!`);
      })
      .catch((error) => {
        console.error('Error generating report:', error);
        setErrorMessage('Failed to generate the report. Please try again.');
      })
      .finally(() => {
        setGeneratingReport(false);
      });
  };

  const renderVolunteerTable = () => (
    <table className="data-table">
      <thead>
        <tr>
          <th>Volunteer Name</th>
          <th>Participation History</th>
          <th>ID</th>
        </tr>
      </thead>
      <tbody>
        {volunteerReport.length > 0 ? (
          volunteerReport.map((volunteer, index) => (
            <tr key={index}>
              <td>{volunteer.name}</td>
              <td>{volunteer.history}</td>
              <td>{volunteer.id}</td>
            </tr>
          ))
        ) : (
          <tr><td colSpan="3">No volunteer data available.</td></tr>
        )}
      </tbody>
    </table>
  );

  const renderEventTable = () => (
    <table className="data-table">
      <thead>
        <tr>
          <th>Event Name</th>
          <th>Event Description</th>
          <th>State</th>
          <th>Skills</th>
          <th>Urgency</th>
          <th>Date</th>
          <th>Assignment</th>
          <th>Event ID</th>
        </tr>
      </thead>
      <tbody>
        {eventReport.length > 0 ? (
          eventReport.map((event, index) => (
            <tr key={index}>
              <td>{event.name}</td>
              <td>{event.description}</td>
              <td>{event.state}</td>
              <td>{event.skills}</td>
              <td>{event.urgency}</td>
              <td>{event.date}</td>
              <td>{event.assignment}</td>
              <td>{event.id}</td>
            </tr>
          ))
        ) : (
          <tr><td colSpan="8">No event data available.</td></tr>
        )}
      </tbody>
    </table>
  );

  return (
    <div className="report-page">
      <h1 className="title">Report Page</h1>

      <h2>Volunteer Report</h2>
      {loading ? <div>Loading...</div> : renderVolunteerTable()}

      <h2>Event Report</h2>
      {loading ? <div>Loading...</div> : renderEventTable()}

      {successMessage && <div className="success-message">{successMessage}</div>}
      {errorMessage && <div className="error-message">{errorMessage}</div>}

      <div className="report-buttons">
        <button onClick={fetchData} className="fetch-data-button" disabled={loading || generatingReport}>
          {loading ? 'Fetching...' : 'Fetch Data'}
        </button>
        <button onClick={() => generateReport('csv')} className="generate-report-button" disabled={generatingReport}>
          {generatingReport ? 'Generating CSV...' : 'Download as CSV'}
        </button>
        <button onClick={() => generateReport('pdf')} className="generate-report-button" disabled={generatingReport}>
          {generatingReport ? 'Generating PDF...' : 'Download as PDF'}
        </button>
        <button onClick={() => generateReport('txt')} className="generate-report-button" disabled={generatingReport}>
          {generatingReport ? 'Generating TXT...' : 'Download as TXT'}
        </button>
      </div>
    </div>
  );
};

export default ReportScreen;
