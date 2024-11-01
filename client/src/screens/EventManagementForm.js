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
  });

  const [pastEvents, setPastEvents] = useState([]);

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
          setEventManage(data.currentEvent || {
            eventName: '',
            eventDescription: '',
            state_name: '',
            requiredSkills: [],
            urgency: '',
            eventDate: '',
          });
        } else {
          console.error("Unexpected data format:", data);
          setPastEvents([]);
        }
      })
      .catch((error) => console.error("Error fetching events:", error));
  }, []);
  
  const handleChange = (e) => {
    const { name, value, options } = e.target;

    if (name === "requiredSkills") {
      const selectedSkills = Array.from(options)
          .filter(option => option.selected)
          .map(option => option.value);
      setEventManage(prevState => ({
          ...prevState,
          [name]: selectedSkills,
      }));
    } else {
      setEventManage(prevState => ({
          ...prevState,
          [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Simple client-side validation
    if (!eventManage.eventName || !eventManage.state_name || !eventManage.eventDate || eventManage.requiredSkills.length === 0) {
      alert("Please fill in all required fields.");
      return;
    }
  
    fetch('http://localhost:4000/api/event/event-management', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eventManage),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) { // Assuming the API returns a success flag
          console.log("Event created:", data);
          // Refresh pastEvents
          fetch('http://localhost:4000/api/event/event-management')
            .then((response) => response.json())
            .then((data) => setPastEvents(data.pastEvents || []));
          setEventManage({
            eventName: '',
            eventDescription: '',
            state_name: '',
            requiredSkills: [],
            urgency: '',
            eventDate: '',
          });
        } else {
          console.error("Failed to create event:", data.message);
          alert("Failed to create event: " + data.message);
        }
      })
      .catch((error) => {
        console.error("Error creating event:", error);
        alert("Error creating event: " + error.message);
      });
  };
  
  const handleEdit = (event) => {
    setEventManage(event); // Populate form with the selected event data
  };

  const handleDelete = (eventName) => {
    fetch(`http://localhost:4000/api/event/${eventName}`, {
      method: 'DELETE',
    })
      .then(() => {
        setPastEvents(prevEvents => prevEvents.filter(event => event.eventName !== eventName));
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

          <button type="submit">Submit Event</button>
        </form>

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
