import React, { useState, useEffect } from "react";
import "../styles/EventManagementFormStyles.css"; // Ensure this is the correct path

const EventManage = () => {
  const [eventManage, setEventManage] = useState({
    eventName: 'Annual Charity Run',
    eventDescription: 'A charity run for a local cause.',
    location: 'Houston Park',
    requiredSkills: ['Volunteering', 'Teamwork'],
    urgency: 'High',
    eventDate: '2024-12-01',
  });

  const [pastEvents, setPastEvents] = useState([]);

  // Fetch data from server.js on component mount
  useEffect(() => {
    fetch('http://localhost:4000/api/events') // Correct the URL to the backend
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched events data:", data);
        if (Array.isArray(data)) {
          setPastEvents(data); // Set the state if it's an array
        } else {
          console.error("Expected an array but got:", data);
          setPastEvents([]); // Handle the error appropriately
        }
      })
      .catch((error) => console.error("Error fetching events:", error));
  }, []); // Empty dependency array means this runs once when component mounts

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, options } = e.target;

    // Handle multiple select for skills
    if (name === "requiredSkills") {
      const selectedSkills = Array.from(options)
        .filter(option => option.selected)
        .map(option => option.value);
        
      setEventManage({
        ...eventManage,
        [name]: selectedSkills,
      });
    } else {
      setEventManage({
        ...eventManage,
        [name]: value,
      });
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Send the form data (eventManage) to the backend server
    fetch('http://localhost:4000/api/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eventManage),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Event created:", data);
        // Optionally, refresh the pastEvents list or reset the form
      })
      .catch((error) => console.error("Error creating event:", error));
  };

  // Handle edit button click
  const handleEdit = (event) => {
    setEventManage(event); // Populate form with the selected event data
  };

  // Handle delete button click
  const handleDelete = (eventName) => {
    // Delete the event from the backend
    fetch(`http://localhost:4000/api/events/${eventName}`, { // Adjust the endpoint as needed
      method: 'DELETE',
    })
      .then(() => {
        // Update the pastEvents state
        setPastEvents(pastEvents.filter(event => event.eventName !== eventName));
      })
      .catch((error) => console.error("Error deleting event:", error));
  };

  return (
    <section className="event-management">
      <div>
        <form id="eventManage" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="eventName">Event Name (100 characters, required):</label>
            <input
              type="text" 
              id="eventName"
              name="eventName" 
              value={eventManage.eventName} 
              onChange={handleChange} 
              maxLength="100"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="eventDescription">Event Description:</label>
            <input
              type="text" 
              id="eventDescription"
              name="eventDescription" 
              value={eventManage.eventDescription} 
              onChange={handleChange} 
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="eventLocation">Event Location:</label>
            <input
              type="text" 
              id="eventLocation"
              name="location" 
              value={eventManage.location} 
              onChange={handleChange} 
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="requiredSkills">Event Skills (required):</label>
            <select
              id="requiredSkills"
              name="requiredSkills" 
              value={eventManage.requiredSkills} 
              onChange={handleChange} 
              required
              multiple
            >
              <option value="Volunteering">Volunteering</option>
              <option value="Teamwork">Teamwork</option>
              <option value="Leadership">Leadership</option>
              <option value="Communication">Communication</option>
              <option value="Problem-Solving">Problem-Solving</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="eventUrgency">Event Urgency (required):</label>
            <select
              id="eventUrgency"
              name="urgency" 
              value={eventManage.urgency} 
              onChange={handleChange} 
              required
            >
              <option value="">Select urgency</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="eventDate">Event Date (required):</label>
            <input
              type="date"
              id="eventDate"
              name="eventDate"
              value={eventManage.eventDate}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit">Submit Event</button>
        </form>

        <h2>Created Events</h2>
        <table className="past-events">
          <thead>
            <tr>
              <th>Event Name</th>
              <th>Event Description</th>
              <th>Location</th>
              <th>Skills</th>
              <th>Urgency</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pastEvents.map((event, index) => (
              <tr key={index}>
                <td>{event.eventName}</td>
                <td>{event.eventDescription}</td>
                <td>{event.location}</td>
                <td>{event.requiredSkills.join(', ')}</td>
                <td>{event.urgency}</td>
                <td>{event.eventDate}</td>
                <td>
                  <button onClick={() => handleEdit(event)}>Edit</button>
                  <button onClick={() => handleDelete(event.eventName)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default EventManage;
