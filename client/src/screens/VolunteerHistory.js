import React, { useState, useEffect } from 'react';
import '../styles/VolunteerHistory.css'; 
import axios from "axios"
import logo from '../images/volt2.png'; 

const VolunteerHistory = () => {
  const [volunteerHistory, setVolunteerHistory] = useState([]);

  // Fetch the volunteer history data from the API
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const { data } = await axios.get('/api/volunteerhistory');
       
        setVolunteerHistory(data);
        console.log(data)
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
          <h1>Your Participation History</h1>
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Event ID</th>
                <th>Event Category</th>
                <th>Location</th>
                <th>Urgency</th>
                <th>Event Date</th>
                <th>timesHeld</th>
                <th>Status</th>

              </tr>
            </thead>
            <tbody>
              {Array.isArray(volunteerHistory) && volunteerHistory.length > 0 ? (
                volunteerHistory.map((history) => (
                  <tr key={history._id}>
                    <td>{history.title}</td>
                    <td>{history._id}</td>
                    <td>{history.category}</td>
                    <td>{history.location}</td>
                    <td>{history.urgency}</td>
                    <td>{history.createdAt}</td>
                    <td>{history.timesHeld}</td>
                    <td>{history.status}</td>


                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8">No data available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default VolunteerHistory;
