import React, { useState } from "react";
import "../styles/EventManagementFormStyles.css"; // Ensure this is the correct path

export default function EventManagementForm() {
  // State to hold form data and submitted data
  const [formData, setFormData] = useState({
    eventName: "",
    eventDescription: "",
    location: "",
    requiredSkills: [],
    urgency: "",
    eventDate: ""
  });

  const [submittedData, setSubmittedData] = useState([]);
  const [showTable, setShowTable] = useState(false);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "requiredSkills") {
      // Handle multi-select dropdown
      const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
      setFormData({ ...formData, [name]: selectedOptions });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedData([...submittedData, formData]);
    setFormData({
      eventName: "",
      eventDescription: "",
      location: "",
      requiredSkills: [],
      urgency: "",
      eventDate: ""
    });
    setShowTable(true); // Show table after submission
  };

  // Toggle between form and table views
  const toggleView = () => {
    setShowTable(!showTable);
  };

  return (
    <section className="event-management-form">
      {!showTable ? (
        <div>
          <form id="profileForm" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="eventName">Event Name (100 characters, required):</label>
              <input
                type="text"
                id="eventName"
                name="eventName"
                maxLength="100"
                required
                value={formData.eventName}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="eventDescription">Event Description (Text area, required):</label>
              <textarea
                id="eventDescription"
                name="eventDescription"
                rows="4"
                required
                value={formData.eventDescription}
                onChange={handleInputChange}
              ></textarea>
            </div>

            <div className="form-group">
              <label htmlFor="location">Location (Text area, required):</label>
              <textarea
                id="location"
                name="location"
                rows="4"
                required
                value={formData.location}
                onChange={handleInputChange}
              ></textarea>
            </div>

            <div className="form-group">
              <label htmlFor="requiredSkills">Required Skills (Multi-select dropdown, required):</label>
              <select
                id="requiredSkills"
                name="requiredSkills"
                multiple
                required
                value={formData.requiredSkills}
                onChange={handleInputChange}
              >
                <option value="Skill1">Skill 1</option>
                <option value="Skill2">Skill 2</option>
                <option value="Skill3">Skill 3</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="urgency">Urgency (Drop down, selection required):</label>
              <select
                id="urgency"
                name="urgency"
                required
                value={formData.urgency}
                onChange={handleInputChange}
              >
                <option value="">Select urgency</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="eventDate">Event Date (Calendar, date picker):</label>
              <input
                type="date"
                id="eventDate"
                name="eventDate"
                required
                value={formData.eventDate}
                onChange={handleInputChange}
              />
            </div>

            <button type="submit">Submit</button>
          </form>

          <button onClick={toggleView}>View Table</button>
        </div>
      ) : (
        <div>
          <h2>Submitted Event Data</h2>
          <table className="event-management-table"> {/* Add class here */}
            <thead>
              <tr>
                <th>Event Name</th>
                <th>Description</th>
                <th>Location</th>
                <th>Required Skills</th>
                <th>Urgency</th>
                <th>Event Date</th>
              </tr>
            </thead>
            <tbody>
              {submittedData.map((data, index) => (
                <tr key={index}>
                  <td>{data.eventName}</td>
                  <td>{data.eventDescription}</td>
                  <td>{data.location}</td>
                  <td>{data.requiredSkills.join(', ')}</td>
                  <td>{data.urgency}</td>
                  <td>{data.eventDate}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <button onClick={toggleView}>Back to Form</button>
        </div>
      )}
    </section>
  );
}
