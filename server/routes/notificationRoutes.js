import express from 'express';
import { pool } from '../db.js';

const notificationRouter = express.Router();

// Send notification to a user
notificationRouter.post('/send', async (req, res) => {
    const { user_id, event_id, message } = req.body;
    try {
        await pool.query(
            'INSERT INTO notifications (user_id, event_id, message) VALUES (?, ?, ?)',
            [user_id, event_id, message]
        );
        res.status(201).send({ success: true, message: 'Notification sent.' });
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
});

// Get notifications for a specific user
notificationRouter.get('/:userId', async (req, res) => {
    const userId = req.params.userId;
    try {
        const [notifications] = await pool.query(
            'SELECT * FROM notifications WHERE user_id = ? ORDER BY notification_date DESC',
            [userId]
        );
        res.send(notifications);
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
});

// Mark a notification as read
notificationRouter.post('/read/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('UPDATE notifications SET is_read = 1 WHERE notification_id = ?', [id]);
        res.send({ success: true, message: 'Notification marked as read.' });
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
});

export default notificationRouter;
