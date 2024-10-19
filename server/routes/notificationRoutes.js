import express from 'express';
import { pool } from '../db.js';

const notificationRouter = express.Router();

// Send notification to a user
let notifications = [
    {
      notification_id: 1,
      user_id: 1,
      event_id: 101,
      message: 'You have been assigned to the Beach Cleanup event.',
      is_read: false,
      notification_date: '2024-10-10',
    },
    {
      notification_id: 2,
      user_id: 1,
      event_id: 102,
      message: 'You have been assigned to the Food Drive event.',
      is_read: false,
      notification_date: '2024-10-12',
    },
  ];
  
  // Send a notification
  notificationRouter.post('/send', (req, res) => {
      const { user_id, event_id, message } = req.body;
      
      const newNotification = {
          notification_id: notifications.length + 1,
          user_id,
          event_id,
          message,
          is_read: false,
          notification_date: new Date().toISOString(),
      };
      
      notifications.push(newNotification);
      res.status(201).send({ success: true, message: 'Notification sent.', newNotification });
  });
  
  // Get notifications for a specific user
  notificationRouter.get('/:userId', (req, res) => {
      const userId = parseInt(req.params.userId);
      const userNotifications = notifications.filter(notification => notification.user_id === userId);
      res.send(userNotifications);
  });
  
  // Mark a notification as read
  notificationRouter.post('/read/:id', (req, res) => {
      const notificationId = parseInt(req.params.id);
      const notification = notifications.find(n => n.notification_id === notificationId);
      
      if (notification) {
          notification.is_read = true;
          res.send({ success: true, message: 'Notification marked as read.' });
      } else {
          res.status(404).send({ success: false, message: 'Notification not found.' });
      }
  });
  
  export default notificationRouter;