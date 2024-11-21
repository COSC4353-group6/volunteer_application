import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/EventManagementFormStyles.css";

const EventManage = () => {
  const [eventManage, setEventManage] = useState({
    eventName: "",
    eventDescription: "",
    state_name: "",
    requiredSkills: "", // Plain text
    urgency: "",
    eventDate: "",
    event_id: "",
  });
  const [pastEvents, setPastEvents] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [event_id, setEventId] = useState(null);
  const [message, setMessage] = useState("");

  // Fetch past events on component mount
  useEffect(() => {
    axios
      .get("api/event/event-management")
      .then((response) => {
        if (response.data && response.data.pastEvents) {
          setPastEvents(response.data.pastEvents);
        } else {
          console.error("Unexpected data format:", response.data);
          setPastEvents([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
        setPastEvents([]);
      });
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventManage((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission (Create/Update event)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("api/event/event-management", eventManage, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 201 || response.status === 200) {
        setMessage("Event submitted successfully!");
        setEventManage({
          eventName: "",
          eventDescription: "",
          state_name: "",
          requiredSkills: "",
          urgency: "",
          eventDate: "",
          event_id: "",
        });
        if (isEditing) {
          setIsEditing(false);
          setEventId(null);
        }
        // Refresh events after submission
        axios.get("api/event/event-management").then((res) => {
          setPastEvents(res.data.pastEvents || []);
        });
      } else {
        setMessage("Failed to submit event.");
      }
    } catch (error) {
      console.error("Error during submission:", error);
      setMessage("An error occurred: " + error.message);
    }
  };

  // Handle event editing
  const handleEdit = (event) => {
    setEventManage(event); // Populate form with selected event data
    setIsEditing(true); // Enable editing mode
    setEventId(event.event_id); // Set event ID
  };

  // Handle event deletion
  const handleDelete = (event_id) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      axios
        .delete(`api/event/event-management/${event_id}`)
        .then(() => {
          setPastEvents((prevEvents) =>
            prevEvents.filter((event) => event.event_id !== event_id)
          );
          setMessage("Event deleted successfully!");
        })
        .catch((error) => {
          console.error("Error deleting event:", error);
          setMessage("Failed to delete the event.");
        });
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
            <label htmlFor="state_name">Event Location (State):</label>
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
            <label htmlFor="requiredSkills">Required Skills:</label>
            <input
              type="text"
              id="requiredSkills"
              name="requiredSkills"
              value={eventManage.requiredSkills}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="urgency">Event Urgency (required):</label>
            <select
              id="urgency"
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
            <label htmlFor="event_id">Event ID (required):</label>
            <input
              type="text"
              id="event_id"
              name="event_id"
              value={eventManage.event_id}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit">{isEditing ? "Update Event" : "Submit Event"}</button>
        </form>

        {message && <p className="message">{message}</p>}

        <h2>Created Events</h2>
        <table className="past-events">
          <thead>
            <tr>
              <th>Event Name</th>
              <th>Event Description</th>
              <th>State</th>
              <th>Required Skills</th>
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
                <td>{event.requiredSkills}</td>
                <td>{event.urgency}</td>
                <td>{event.eventDate}</td>
                <td>{event.event_id}</td>
                <td>
                  <button onClick={() => handleEdit(event)}>Edit</button>
                  <button onClick={() => handleDelete(event.event_id)}>Delete</button>
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
