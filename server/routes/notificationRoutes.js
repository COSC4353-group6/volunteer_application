import express from 'express';
import { pool } from '../db.js';

const router = express.Router();

// Fetch all notifications
router.get('/', async (req, res) => {
  try {
    const [notifications] = await pool.query(
      `SELECT * FROM notificationsevent ORDER BY createdAt DESC`
    );
    res.status(200).json(notifications);
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({ error: 'Error fetching notifications' });
  }
});

// Mark notification as read
router.put('/:id/mark-as-read', async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query(
      `UPDATE notificationsevent SET is_read = TRUE WHERE id = ?`,
      [id]
    );
    res.status(200).json({ message: 'Notification marked as read' });
  } catch (error) {
    console.error('Error marking notification as read:', error);
    res.status(500).json({ error: 'Error updating notification' });
  }
});

export default router;
