import React, { useState } from "react";
import "../styles/EventManagementFormStyles.css"; // Ensure this is the correct path

const EventManagementForm = () => {
  // Hard-coded event data for the form
  const [eventData, setEventManagementForm] = useState({
    eventName: "Charity Marathon",
    eventDescription: "A charity marathon to raise funds for local shelters.",
    location: "Central Park, New York",
    requiredSkills: ["Coordination", "First Aid", "Photography"],
    urgency: "medium",
    eventDate: "2024-12-15",
    availability: ["2024-12-10", "2024-12-11"],
  });

  // Hard-coded past events data
  const [pastEvents, setPastEvents] = useState([
    {
      eventName: "Beach Cleanup",
      eventDescription: 'Cleaning the beach for community service.',
      location: "Miami Beach, FL",
      eventDate: "2024-09-15",
      requiredSkills: ["Teamwork", "Physical Work"],
      isEditing: false, // Track if event is being edited
    },
    {
      eventName: "Food Drive",
      eventDescription:"Helping with organinzing the food",
      location: "Houston, TX",
      eventDate: "2024-10-05",
      requiredSkills: ["Organization", "Logistics"],
      isEditing: false, // Track if event is being edited
    },
    {
      eventName: "Blood Donation",
      eventDescription: "Helping with taking blood from the patients",
      location: "Dallas, TX",
      eventDate: "2024-08-15",
      requiredSkills: ["Nursing", "Medical Assistance"],
      isEditing: false, // Track if event is being edited
    },
  ]);

  // Handle change of availability date
  const handleAvailabilityChange = (index, value) => {
    const updatedAvailability = [...eventData.availability];
    updatedAvailability[index] = value;
    setEventManagementForm({ ...eventData, availability: updatedAvailability });
  };

  // Add a new availability date input
  const handleAddDate = () => {
    setEventManagementForm({
      ...eventData,
      availability: [...eventData.availability, ""],
    });
  };

  // Handle form submission (no actual API call in this case)
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Event Data:", eventData);
    alert("Event updated successfully (simulated)");
  };

  // Handle delete event
  const handleDelete = (indexToDelete) => {
    const updatedEvents = pastEvents.filter((_, index) => index !== indexToDelete);
    setPastEvents(updatedEvents);
  };

  // Toggle edit mode for an event
  const handleEditToggle = (index) => {
    const updatedEvents = pastEvents.map((event, idx) =>
      idx === index ? { ...event, isEditing: !event.isEditing } : event
    );
    setPastEvents(updatedEvents);
  };

  // Handle change when editing event details
  const handleEventChange = (index, field, value) => {
    const updatedEvents = [...pastEvents];
    updatedEvents[index] = { ...updatedEvents[index], [field]: value };
    setPastEvents(updatedEvents);
  };

  return (
    <section className="event-management">
      <div>
        {/* Event Form */}
        <form id="eventForm" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="eventName">Event Name (100 characters, required):</label>
            <input
              type="text"
              id="eventName"
              name="eventName"
              value={eventData.eventName}
              onChange={(e) => setEventManagementForm({ ...eventData, eventName: e.target.value })}
              maxLength="100"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="eventDescription">Event Description (Text area, required):</label>
            <textarea
              id="eventDescription"
              name="eventDescription"
              value={eventData.eventDescription}
              onChange={(e) => setEventManagementForm({ ...eventData, eventDescription: e.target.value })}
              maxLength="100"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="location">Location (Text area, required):</label>
            <textarea
              id="location"
              name="location"
              value={eventData.location}  
              onChange={(e) => setEventManagementForm({ ...eventData, location: e.target.value })}
              maxLength="100"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="requiredSkills">Required Skills (Multi-select, required):</label>
            <select
              id="requiredSkills"
              name="requiredSkills"
              multiple
              value={eventData.requiredSkills}  
              onChange={(e) => 
                setEventManagementForm({
                  ...eventData, 
                  requiredSkills: Array.from(e.target.selectedOptions, option => option.value),
                })
              }
              required
            >
              <option value="Coordination">Coordination</option>
              <option value="First Aid">First Aid</option>
              <option value="Photography">Photography</option>
              {/* Add more options as needed */}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="urgency">Urgency (Drop down, required):</label>
            <select
              id="urgency"
              name="urgency"
              required
              value={eventData.urgency}
              onChange={(e) => setEventManagementForm({ ...eventData, urgency: e.target.value })}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="eventDate">Event Date:</label>
            <input
              type="date"
              id="eventDate"
              name="eventDate"
              value={eventData.eventDate}
              onChange={(e) => setEventManagementForm({ ...eventData, eventDate: e.target.value })}
              required
            />
          </div>

          {/* Availability Input Fields */}
          <div className="form-group">
            <label>Availability Dates:</label>
            {eventData.availability.map((date, index) => (
              <div key={index}>
                <input 
                  type="date"
                  value={date}
                  onChange={(e) => handleAvailabilityChange(index, e.target.value)}
                  required
                />
              </div>
            ))}
            <button type="button" onClick={handleAddDate}>Add Availability Date</button>
          </div>

          <button type="submit">Submit</button>
        </form>
      </div>

      {/* Table for Past Events with Edit/Delete */}
      <div className="past-events">
        <h3>Past Events</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Event Name</th>
              <th>Event Description</th>
              <th>Location</th>
              <th>Event Date</th>
              <th>Required Skills</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pastEvents.map((event, index) => (
              <tr key={index}>
                {event.isEditing ? (
                  <>
                    <td>
                      <input
                        type="text"
                        value={event.eventName}
                        onChange={(e) => handleEventChange(index, "eventName", e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={event.eventDescription}
                        onChange={(e) => handleEventChange(index, "eventDescription", e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={event.location}
                        onChange={(e) => handleEventChange(index, "location", e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="date"
                        value={event.eventDate}
                        onChange={(e) => handleEventChange(index, "eventDate", e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={event.requiredSkills.join(", ")}
                        onChange={(e) => handleEventChange(index, "requiredSkills", e.target.value.split(", "))}
                      />
                    </td>
                  </>
                ) : (
                  <>
                    <td>{event.eventName}</td>
                    <td>{event.eventDescription}</td>
                    <td>{event.location}</td>
                    <td>{event.eventDate}</td>
                    <td>{event.requiredSkills.join(", ")}</td>
                  </>
                )}
                <td>
                  <button onClick={() => handleEditToggle(index)}>
                    {event.isEditing ? "Save" : "Edit"}
                  </button>
                  <button onClick={() => handleDelete(index)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default EventManagementForm;