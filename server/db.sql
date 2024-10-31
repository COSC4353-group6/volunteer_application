CREATE SCHEMA `voltmatchpro_db`;
USE voltmatchpro_db;


CREATE TABLE locations (
    _id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(225) NOT NULL UNIQUE
);

CREATE TABLE states (
    -- in case needed
  state_code CHAR(2) PRIMARY KEY,  -- e.g., TX, CA, NY
  state_name VARCHAR(50) NOT NULL  -- Full name, e.g., Texas, California
);


CREATE TABLE urgencies (
     _id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
     rating varchar(255) NOT NULL UNIQUE
);

CREATE TABLE categories (
    _id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title varchar(225) NOT NULL UNIQUE
    
);

CREATE TABLE users (
    _id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NULL DEFAULT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(20) NOT NULL,
    isOrganzier BOOLEAN DEFAULT FALSE,
    skills VARCHAR(255) NOT NULL,
    volunteerHistory VARCHAR(255), 
    createdAt DATETIME NOT NULL,  
    eventCount INT DEFAULT 0 NOT NULL,
    location VARCHAR(225) NOT NULL,
    FOREIGN KEY (location) REFERENCES locations(title)
);



CREATE TABLE events (
  _id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  image VARCHAR(225) NOT NULL, 
  description VARCHAR(255) NOT NULL, 
  status VARCHAR(255) NOT NULL, 
  timesHeld INT DEFAULT 0 NOT NULL, 
  category VARCHAR(225) NOT NULL,
  location VARCHAR(225) NOT NULL,
  urgency VARCHAR(225) NOT NULL,
  FOREIGN KEY (category) REFERENCES categories(title) ON DELETE NO ACTION ON UPDATE NO ACTION,
  FOREIGN KEY (location) REFERENCES locations(title) ON DELETE NO ACTION ON UPDATE NO ACTION,
  FOREIGN KEY (urgency) REFERENCES urgencies(rating) ON DELETE NO ACTION ON UPDATE NO ACTION,
  createdAt DATETIME NOT NULL 
);



CREATE TABLE volunteerConfirmation (
    volunteerConfirmationID int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id bigint,
    confirmationDate datetime,
    event_id bigint,
    FOREIGN KEY (user_id) REFERENCES users(_id),
FOREIGN KEY (event_id) REFERENCES events(_id)
);

CREATE TABLE volunteer_requests (
    request_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id bigint,
    event_id bigint,
    request_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(_id),
    FOREIGN KEY (event_id) REFERENCES events(_id)
);

CREATE TABLE notifications (
    notification_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT,
    event_id BIGINT,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    notification_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(_id),
    FOREIGN KEY (event_id) REFERENCES events(_id)
);
