import "../styles/userprofile.css"
// import 

export default function UserProfile () {
  return (
    <section>
      <header>
        <img src="volt2.png" alt="Logo" class="header-logo" />
        User Profile
      </header>

      <div>
        <form id="profileForm">
          <div class="form-group">
            <label for="fullName">Full Name (50 characters, required):</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              maxlength="50"
              required
            />
          </div>

          <div class="form-group">
            <label for="address1">Address 1 (100 characters, required):</label>
            <input
              type="text"
              id="address1"
              name="address1"
              maxlength="100"
              required
            />
          </div>

          <div class="form-group">
            <label for="address2">Address 2 (100 characters, optional):</label>
            <input type="text" id="address2" name="address2" maxlength="100" />
          </div>

          <div class="form-group">
            <label for="city">City (100 characters, required):</label>
            <input type="text" id="city" name="city" maxlength="100" required />
          </div>

          <div class="form-group">
            <label for="state">State (required):</label>
            <select id="state" name="state" required>
              <option value="">Select a state</option>
              <option value="AL">Alabama</option>
              <option value="AK">Alaska</option>
              <option value="AZ">Arizona</option>
              <option value="AR">Arkansas</option>
              <option value="CA">California</option>
              <option value="CO">Colorado</option>
              <option value="CT">Connecticut</option>
              <option value="DE">Delaware</option>
              <option value="FL">Florida</option>
              <option value="GA">Georgia</option>
              <option value="HI">Hawaii</option>
              <option value="ID">Idaho</option>
              <option value="IL">Illinois</option>
              <option value="IN">Indiana</option>
              <option value="IA">Iowa</option>
              <option value="KS">Kansas</option>
              <option value="KY">Kentucky</option>
              <option value="LA">Louisiana</option>
              <option value="ME">dive</option>
              <option value="MD">Maryland</option>
              <option value="MA">Massachusetts</option>
              <option value="MI">Michigan</option>
              <option value="MN">Minnesota</option>
              <option value="MS">Mississippi</option>
              <option value="MO">Missouri</option>
              <option value="MT">Montana</option>
              <option value="NE">Nebraska</option>
              <option value="NV">Nevada</option>
              <option value="NH">New Hampshire</option>
              <option value="NJ">New Jersey</option>
              <option value="NM">New Mexico</option>
              <option value="NY">New York</option>
              <option value="NC">North Carolina</option>
              <option value="ND">North Dakota</option>
              <option value="OH">Ohio</option>
              <option value="OK">Oklahoma</option>
              <option value="OR">Oregon</option>
              <option value="PA">Pennsylvania</option>
              <option value="RI">Rhode Island</option>
              <option value="SC">South Carolina</option>
              <option value="SD">South Dakota</option>
              <option value="TN">Tennessee</option>
              <option value="TX">Texas</option>
              <option value="UT">Utah</option>
              <option value="VT">Vermont</option>
              <option value="VA">Virginia</option>
              <option value="WA">Washington</option>
              <option value="WV">West Virginia</option>
              <option value="WI">Wisconsin</option>
              <option value="WY">Wyoming</option>
            </select>
          </div>

          <div class="form-group">
            <label for="zipCode">Zip Code (9 characters, required):</label>
            <input
              type="text"
              id="zipCode"
              name="zipCode"
              maxlength="9"
              minlength="5"
              required
            />
          </div>

          <div class="form-group">
            <label for="Skill">Skills (required):</label>
            <input
              type="text"
              id="Skill"
              name="Skill"
              placeholder="Enter in the skills you have"
              required
            />
          </div>

          <div class="form-group">
            <label for="preferences">Preferences (optional):</label>
            <textarea id="preferences" name="preferences" rows="4"></textarea>
          </div>

          <div class="form-group">
            <label for="availability">
              Availability (multiple dates allowed, required):
            </label>
            <input type="date" id="availability" name="availability" required />
            <button type="button" id="addDate">
              Add another date
            </button>
          </div>

          <button type="submit">Submit</button>
        </form>
      </div>
    </section>
  );
}
