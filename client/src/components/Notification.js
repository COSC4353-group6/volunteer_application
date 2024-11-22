// import React, { useState, useEffect } from 'react';
// import { FaBell } from 'react-icons/fa';
// import Badge from 'react-bootstrap/Badge';
// import '../styles/Notification.css'; // Import the CSS for this component

// const Notification = ({ userId }) => {
//   const [notifications, setNotifications] = useState([]);
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);

//   // Function to toggle dropdown visibility
//   const toggleDropdown = () => {
//     setIsDropdownOpen(!isDropdownOpen);
//   };

//   // Fetch notifications when the component mounts
//   useEffect(() => {
//     const fetchNotifications = async () => {
//       if (!userId) return; // Exit if no userId is provided

//       try {
//         const response = await fetch(`/api/notifications/${userId}`);
//         const data = await response.json();
//         setNotifications(data);
//       } catch (error) {
//         console.error('Error fetching notifications:', error);
//       }
//     };

//     fetchNotifications();
//   }, [userId]); // Fetch notifications when userId changes

//   // Mark a notification as read
//   const markAsRead = async (id) => {
//     try {
//       await fetch(`/api/notifications/read/${id}`, { method: 'POST' });
//       setNotifications(
//         notifications.map((n) =>
//           n.notification_id === id ? { ...n, is_read: true } : n
//         )
//       );
//     } catch (error) {
//       console.error('Error marking notification as read:', error);
//     }
//   };

//   const unreadCount = notifications.filter((n) => !n.is_read).length;

//   return (
//     <div className="notification-container">
//       {/* Notification Bell with unread count */}
//       <FaBell className="notification-bell-icon" onClick={toggleDropdown} />
//       {unreadCount > 0 && <Badge pill bg="danger" className="notification-badge">{unreadCount}</Badge>}

//       {/* Dropdown that shows notifications */}
//       {isDropdownOpen && (
//         <div className="notification-dropdown">
//           <h4 className="notification-title">Notifications</h4>
//           <ul className="notification-list">
//             {notifications.length === 0 && <li>No new notifications</li>}
//             {notifications.map((notification) => (
//               <li
//                 key={notification.notification_id}
//                 className={`notification-item ${notification.is_read ? 'read' : 'unread'}`}
//               >
//                 <div onClick={() => markAsRead(notification.notification_id)} className="notification-message">
//                   {notification.message}
//                   <small className="notification-date">{new Date(notification.notification_date).toLocaleString()}</small>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Notification;

import React, { useState, useEffect } from 'react';
import { FaBell } from 'react-icons/fa';
import Badge from 'react-bootstrap/Badge';
import '../styles/Notification.css'; // Import the CSS for this component

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/notifications');
        const data = await response.json();
        console.log('Fetched notifications:', data); // Log the fetched data

        // Update the state only if the fetched data is different
        setNotifications(data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  const markAsRead = async (id) => {
    try {
      await fetch(`http://localhost:4000/api/notifications/${id}/mark-as-read`, { method: 'PUT' });
      setNotifications(
        notifications.map((n) =>
          n.id === id ? { ...n, isRead: true } : n
        )
      );
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <div className="notification-container">
      <FaBell className="notification-bell-icon" onClick={toggleDropdown} />
      {unreadCount > 0 && <Badge pill bg="danger" className="notification-badge">{unreadCount}</Badge>}
      {isDropdownOpen && (
        <div className="notification-dropdown">
          <h4 className="notification-title">Notifications</h4>
          <ul className="notification-list">
            {notifications.length === 0 && <li>No new notifications</li>}
            {notifications.map((notification) => (
              <li
                key={notification.id}
                className={`notification-item ${notification.isRead ? 'read' : 'unread'}`}
              >
                <div onClick={() => markAsRead(notification.id)} className="notification-message">
                  {notification.message}
                  <small className="notification-date">{new Date(notification.createdAt).toLocaleString()}</small>
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
