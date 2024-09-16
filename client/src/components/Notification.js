import React, { useState, useEffect } from 'react';
import { FaBell } from 'react-icons/fa';
import Badge from 'react-bootstrap/Badge';
import '../styles/Notification.css'; // Import the CSS for this component

const Notification = ({ events }) => {
  const [notifications, setNotifications] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Function to toggle dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Mark a notification as read
  const markAsRead = (id) => {
    setNotifications(
      notifications.map((n) =>
        n.id === id ? { ...n, is_read: true } : n
      )
    );
  };

  // Simulate notifications based on the passed events (props)
  useEffect(() => {
    if (events) {
      console.log('Events received:', events); // Log events to verify
      const newNotifications = events.map((event) => ({
        id: event._id,
        message: `New Event: ${event.name} at ${event.location}`,
        date: event.Date,
        is_read: false,
      }));
      setNotifications(newNotifications);
    }
  }, [events]);

  const unreadCount = notifications.filter((n) => !n.is_read).length;

  return (
    <div className="notification-container">
      {/* Notification Bell with unread count */}
      <FaBell className="notification-bell-icon" onClick={toggleDropdown} />
      {unreadCount > 0 && <Badge pill bg="danger" className="notification-badge">{unreadCount}</Badge>}

      {/* Dropdown that shows notifications */}
      {isDropdownOpen && (
        <div className="notification-dropdown">
          <h4 className="notification-title">Notifications</h4>
          <ul className="notification-list">
            {notifications.length === 0 && <li>No new notifications</li>}
            {notifications.map((notification) => (
              <li
                key={notification.id}
                className={`notification-item ${notification.is_read ? 'read' : 'unread'}`}
              >
                <div onClick={() => markAsRead(notification.id)} className="notification-message">
                  {notification.message}
                  <small className="notification-date"> Scheduled for {notification.date}</small>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Notification;
