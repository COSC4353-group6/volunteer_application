import "../styles/EventManagementFormStyles.css"; // Ensure this is the correct path

export default function EventManagementForm () {
  return (
    <section class="event-management-form">
    <div>
      <form id="profileForm">
        <div class="form-group">
          <label for="eventName">Event Name (100 characters, required):</label>
          <input
            type="text"
            id="eventName"
            name="eventName"
            maxlength="100"
            required
          />
        </div>

        <div class="form-group">
          <label for="eventDescription">Event Description (Text area, required):</label>
          <textarea id="eventDescription" name="eventDescription" rows="4" required></textarea>
        </div>

        <div class="form-group">
          <label for="location">Location (Text area, required):</label>
          <textarea id="location" name="location" rows="4" required></textarea>
        </div>

        <div class="form-group">
          <label for="requiredSkills">Required Skills (Multi-select dropdown, required):</label>
          <select id="requiredSkills" name="requiredSkills" multiple required>
            <option value="Skill1">Skill 1</option>
            <option value="Skill2">Skill 2</option>
            <option value="Skill3">Skill 3</option>
            
          </select>
        </div>

        <div class="form-group">
          <label for="urgency">Urgency (Drop down, selection required):</label>
          <select id="urgency" name="urgency" required>
            <option value="">Select urgency</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            
          </select>
        </div>

        <div class="form-group">
          <label for="eventDate">Event Date (Calendar, date picker):</label>
          <input type="date" id="eventDate" name="eventDate" required />
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  </section>
  );
}