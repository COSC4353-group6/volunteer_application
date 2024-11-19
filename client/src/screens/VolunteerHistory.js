import React, { useState, useEffect } from 'react';
import '../styles/VolunteerHistory.css'; 
import axios from "axios";
import logo from '../images/volt2.png'; 

const VolunteerHistory = () => {
  const [volunteerHistory, setVolunteerHistory] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state 

  // Fetch the volunteer history data from the API
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const { data } = await axios.get('/api/volunteerHistory');
        setVolunteerHistory(data);
      } catch (error) {
        console.error('Error fetching volunteer history:', error);
      } finally {
        setLoading(false); // Set loading to false after fetching
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
          {loading ? ( // Conditional rendering for loading state
            <p>Loading...</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Event ID</th>
                  <th>Event Category</th>
                  <th>Location</th>
                  <th>Urgency</th>
                  <th>Event Date</th>
                  <th>Times Held</th>
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
                      <td>{new Date(history.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</td>
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
          )}
        </div>
      </main>
    </div>
  );
};

export default VolunteerHistory;
