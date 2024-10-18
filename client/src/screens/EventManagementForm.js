import React, { useState, useEffect } from "react";
import "../styles/EventManagementFormStyles.css"; // Ensure this is the correct path

const EventManage = () => {
  const [eventManage, setEventManage] = useState({
    eventName: '',
    eventDescription: '',
    location: '',
    requiredSkills: [''],
    urgency: '',
    eventDate: '',
  });

  const [pastEvents, setPastEvents] = useState([]);

  useEffect(() => {
    console.log("Event Manage state:", eventManage);
}, [eventManage]);

// When fetching data
useEffect(() => {
  fetch('http://localhost:4000/api/event/event-management')
    .then((response) => response.json())
    .then((data) => {
      console.log("Fetched events data:", data);
      if (data && data.pastEvents) {
        setPastEvents(data.pastEvents);
        console.log("Setting current event:", data.currentEvent); // Debugging line
        setEventManage(data.currentEvent);
      } else {
        console.error("Unexpected data format:", data);
        setPastEvents([]);
      }
    })
    .catch((error) => console.error("Error fetching events:", error));
}, []);
 // Empty dependency array means this runs once when component mounts

 const handleChange = (e) => {
  const { name, value, options } = e.target;

  if (name === "requiredSkills") {
      const selectedSkills = Array.from(options)
          .filter(option => option.selected)
          .map(option => option.value);
      setEventManage({
          ...eventManage,
          [name]: selectedSkills,
      });
  } else  if (name === "urgency") {
    const selectedurgency = Array.from(options)
        .filter(option => option.selected)
        .map(option => option.value);
    setEventManage({
        ...eventManage,
        [name]: selectedurgency,
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
    fetch('http://localhost:4000/api/event/event-management', {
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
    fetch(`http://localhost:4000/api/event/${eventName}`, { // Adjust the endpoint as needed
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
              <option value= "Coordination">Coordination</option>
              <option value= "First Aid"> First Aid</option>
              <option value= "Photography"> Photography</option>
            </select>
          </div>

        <div className="form-group">
          <label htmlFor="eventUrgency">Event Urgency (required):</label>
          <select
            type ="text"
            id="eventUrgency"
            name="urgency"
            value={eventManage.urgency} // Ensure the value is being set correctly
            onChange={handleChange}
            required
          >
            <option value="">Select urgency</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
            <option value="crack">crack</option>

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
