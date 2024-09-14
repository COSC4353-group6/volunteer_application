import React from 'react';
import '../styles/VolunteerHistory.css'; 
import logo from '../images/volt2.png'; 

const volunteerHistory = [
  {
    volunteerId: '0001',
    eventName: 'Beach Cleanup',
    eventDescription: 'Cleaning the beach for community service.',
    location: 'Miami Beach, FL',
    requiredSkills: ['Teamwork', 'Physical Work'],
    urgency: 'High',
    eventDate: '2024-09-15',
    status: 'Completed',
  },
  {
    volunteerId: '0002',
    eventName: 'Tree Planting',
    eventDescription: 'Planting trees in the local park.',
    location: 'Central Park, NY',
    requiredSkills: ['Gardening', 'Environment Care'],
    urgency: 'Low',
    eventDate: '2024-10-01',
    status: 'Pending',
  },
  {
    volunteerId: '0003',
    eventName: 'Animal Shelter',
    eventDescription: 'Assisting with animal care and shelter maintenance',
    location: 'Chatsworth, CA',
    requiredSkills: ['Animal Care', 'Cleaning', 'Compassion'],
    urgency: 'Medium',
    eventDate: '2024-11-07',
    status: 'Pending',
  },
];

const VolunteerHistory = () => {
  return (
    <div>
      <header className='volunteerheader'>
      <img src={logo} alt="Logo" className="header-logo" />
        Volunteer History
      </header>

      <main>
        <section id="volunteer-history">
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
        </section>
      </main>
    </div>
  );
};

export default VolunteerHistory;