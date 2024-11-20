import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios
import '../styles/UserProfileStyle.css';

const UserProfile = () => {
  const [userProfile, setUserProfile] = useState({
    fullName: '',
    address1: '',
    address2: '',
    city: '',
    state_name: '',
    zipCode: '',
    skill: '',
    preferences: '',
    availability: [''], // Initialize as an array with a default empty string
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get('/api/user-profile');
        console.log('Fetched user profile data:', response.data);
        setUserProfile({
          ...response.data,
          availability: response.data.availability || [''], // Ensure availability is always an array
        });
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };
    fetchUserProfile();
  }, []);

  const handleAddDate = () => {
    setUserProfile({
      ...userProfile,
      availability: [...userProfile.availability, ''],
    });
  };

  const handleAvailabilityChange = (index, value) => {
    const updatedAvailability = [...userProfile.availability];
    updatedAvailability[index] = value;
    setUserProfile({ ...userProfile, availability: updatedAvailability });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/user-profile', userProfile, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.data.success) {
        alert('Profile updated successfully');
      } else {
        alert('Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating user profile:', error);
      alert('An error occurred while updating the profile');
    }
  }; 

  return (
    <section className="user-profile">
      <div>
        <form id="userProfileForm" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="fullName">Full Name (50 characters, required):</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={userProfile.fullName}
              onChange={(e) => setUserProfile({ ...userProfile, fullName: e.target.value })}
              maxLength="50"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="address1">Address 1 (100 characters, required):</label>
            <input
              type="text"
              id="address1"
              name="address1"
              value={userProfile.address1}
              onChange={(e) => setUserProfile({ ...userProfile, address1: e.target.value })}
              maxLength="100"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="address2">Address 2 (100 characters, optional):</label>
            <input
              type="text"
              id="address2"
              name="address2"
              value={userProfile.address2}
              onChange={(e) => setUserProfile({ ...userProfile, address2: e.target.value })}
              maxLength="100"
            />
          </div>
          <div className="form-group">
            <label htmlFor="city">City (100 characters, required):</label>
            <input
              type="text"
              id="city"
              name="city"
              value={userProfile.city}
              onChange={(e) => setUserProfile({ ...userProfile, city: e.target.value })}
              maxLength="100"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="state">State (required):</label>
            <select
              id="state"
              name="state"
              value={userProfile.state_name}
              onChange={(e) => setUserProfile({ ...userProfile, state_name: e.target.value })}
              required
            >
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
              <option value="ME">Maine</option>
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
              {/* List of states */}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="zipCode">Zip Code (9 characters, required):</label>
            <input
              type="text"
              id="zipCode"
              name="zipCode"
              value={userProfile.zipCode}
              onChange={(e) => setUserProfile({ ...userProfile, zipCode: e.target.value })}
              maxLength="9"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="skill">Skills (required):</label>
            <input
              type="text"
              id="skill"
              name="skill"
              value={userProfile.skill}
              onChange={(e) => setUserProfile({ ...userProfile, skill: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="preferences">Preferences (optional):</label>
            <textarea
              id="preferences"
              name="preferences"
              value={userProfile.preferences}
              onChange={(e) => setUserProfile({ ...userProfile, preferences: e.target.value })}
              rows="4"
            />
          </div>
          <div className="form-group">
            <label htmlFor="availability">Availability (optional):</label>
            {userProfile.availability?.map((date, index) => (
              <input
                key={index}
                type="date"
                value={date}
                onChange={(e) => handleAvailabilityChange(index, e.target.value)}
              />
            ))}
            <button type="button" onClick={handleAddDate}>Add Availability</button>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </section>
  );
};

export default UserProfile;
