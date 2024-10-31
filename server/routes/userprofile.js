import express from 'express';
import jwt from 'jsonwebtoken'; // Importing JWT library
const userProfileRouter = express.Router();

/// Get user profile
userProfileRouter.get('/user-profile', isAuth, async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM userProfile WHERE user_id = $1', [req.user.id]);
    
    if (rows.length === 0) {
      return res.status(404).json({ message: "User profile not found" });
    }

    const userProfile = rows[0]; // Assuming you want the first row
    res.json(userProfile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Update user profile
userProfileRouter.post('/user-profile', isAuth, async (req, res) => {
  const updatedProfile = req.body;

  try {
    const { rowCount } = await pool.query(
      'UPDATE userProfile SET fullName = $1, address1 = $2, address2 = $3, city = $4, state = $5, zipCode = $6, skill = $7, preferences = $8, availability = $9 WHERE user_id = $10',
      [
        updatedProfile.fullName,
        updatedProfile.address1,
        updatedProfile.address2,
        updatedProfile.city,
        updatedProfile.state,
        updatedProfile.zipCode,
        updatedProfile.skill,
        updatedProfile.preferences,
        updatedProfile.availability,
        req.user.id,
      ]
    );

    if (rowCount === 0) {
      return res.status(404).json({ message: "User profile not found" });
    }

    res.json({ success: true, profile: updatedProfile });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default userProfileRouter;