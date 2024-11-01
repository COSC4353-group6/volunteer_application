import React, { useState, useEffect } from "react";
import "../styles/EventManagementFormStyles.css"; // Ensure this is the correct path

const EventManage = () => {
  const [eventManage, setEventManage] = useState({
    eventName: '',
    eventDescription: '',
    state_name: '',
    requiredSkills: [],
    urgency: '',
    eventDate: '',
    event_id: '',
  });
  const [pastEvents, setPastEvents] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [event_id, setEventId] = useState(null);
  const [message, setMessage] = useState(''); // State for submission message
  const [submitted, setSubmitted] = useState(false); // State to track if the form was submitted

  useEffect(() => {
    fetch('http://localhost:4000/api/event/event-management')
      .then((response) => response.json())
      .then((data) => {
        if (data && data.pastEvents) {
          const updatedEvents = data.pastEvents.map(event => ({
            ...event,
            requiredSkills: Array.isArray(event.requiredSkills) ? event.requiredSkills : [],
          }));
          setPastEvents(updatedEvents);
        } else {
          console.error("Unexpected data format:", data);
          setPastEvents([]);
        }
      })
      .catch((error) => console.error("Error fetching events:", error));
  }, []);

  const handleChange = (e) => {
    const { name, value, type, selectedOptions } = e.target;
    if (type === "select-multiple") {
      const selectedSkills = Array.from(selectedOptions, option => option.value);
      setEventManage((prev) => ({ ...prev, [name]: selectedSkills }));
    } else {
      setEventManage((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/api/event/event-management', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventManage),
      });

      if (!response.ok) {
        const errorText = await response.text(); // Get the raw response text
        console.error("Error response:", errorText); // Log the error response
        setMessage("Failed to submit the event. Please try again.");
      } else {
        setEventManage({
          eventName: '',
          eventDescription: '',
          state_name: '',
          requiredSkills: [],
          urgency: '',
          eventDate: '',
          event_id: '',
        });
        const data = await response.json();
        setMessage("Event submitted successfully!");
        if (isEditing) {
          // Logic to update the pastEvents array if necessary
          setIsEditing(false);
          setEventId(null);
        }
      }
    } catch (error) {
      console.error("Error during submission:", error);
      setMessage("An error occurred: " + error.message);
    }
  };

  const handleEdit = (event) => {
    setEventManage(event); // Populate form with the selected event data
    setIsEditing(true); // Set edit mode
    setEventId(event.event_id); // Set the ID of the event being edited
  };

  const handleDelete = (eventName) => {
    if (window.confirm(`Are you sure you want to delete the event: ${eventName}?`)) {
      fetch(`http://localhost:4000/api/event/event-management`, {
        method: 'DELETE',
      })
        .then(() => {
          setPastEvents(prevEvents => prevEvents.filter(event => event.eventName !== eventName));
        })
        .catch((error) => console.error("Error deleting event:", error));
    }
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
              id="state_name"
              name="state_name"
              value={eventManage.state_name}
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
              <option value="Coordination">Coordination</option>
              <option value="First Aid">First Aid</option>
              <option value="Photography">Photography</option>
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

          <div className="form-group">
            <label htmlFor="eventID">Event ID (required):</label>
            <input
              type="text"
              id="eventID"
              name="event_id"
              value={eventManage.event_id}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit">{isEditing ? "Update Event" : "Submit Event"}</button>
        </form>

        {message && <p className={`message ${submitted ? 'success' : 'error'}`}>{message}</p>}

        <h2>Created Events</h2>
        <table className="past-events">
          <thead>
            <tr>
              <th>Event Name</th>
              <th>Event Description</th>
              <th>State</th>
              <th>Skills</th>
              <th>Urgency</th>
              <th>Date</th>
              <th>Event ID</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pastEvents.map((event, index) => (
              <tr key={index}>
                <td>{event.eventName}</td>
                <td>{event.eventDescription}</td>
                <td>{event.state_name}</td>
                <td>{event.requiredSkills.join(', ')}</td>
                <td>{event.urgency}</td>
                <td>{event.eventDate}</td>
                <td>{event.event_id}</td>
                <td>
                  <button onClick={() => handleEdit(event)}>Edit</button>
                  <button onClick={() => handleDelete(event)}>Delete</button>
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
