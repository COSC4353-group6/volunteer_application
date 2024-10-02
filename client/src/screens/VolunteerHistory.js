import React, { useState, useEffect } from 'react';
import '../styles/VolunteerHistory.css'; 
import axios from "axios"
import logo from '../images/volt2.png'; 

const VolunteerHistory = () => {
  const [volunteerHistory, setVolunteerHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const {data }= await axios.get('/api/volunteer-history');
        setVolunteerHistory(data);
      } catch (error) {
        console.error('Error fetching volunteer history:', error);
      }
    };
    fetchHistory();
  }, []);

  return (
    <div className="volunteer-history">
      <header className="volunteerheader">
        <img src={logo} alt="Logo" className="logo-header" />
        Volunteer History
      </header>
      <main>
        <div>
          <h1>Volunteer Participation History</h1>
          <table>
            <thead>
              <tr>
                <th>Volunteer ID</th>
                <th>Event Name</th>
                <th>Event Description</th>
                <th>Location</th>
                <th>Required Skills</th>
                <th>Urgency</th>
                <th>Event Date</th>
                <th>Participation Status</th>
              </tr>
            </thead>
            <tbody>
              {volunteerHistory.map((history) => (
                <tr key={history.volunteerId}>
                  <td>{history.volunteerId}</td>
                  <td>{history.eventName}</td>
                  <td>{history.eventDescription}</td>
                  <td>{history.location}</td>
                  <td>{history.requiredSkills.join(', ')}</td>
                  <td>{history.urgency}</td>
                  <td>{history.eventDate}</td>
                  <td>{history.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default VolunteerHistory;
