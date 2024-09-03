import React, { useEffect, useState } from 'react';
import './App.css';
import CountdownTimer from './countdownTimer';

function App() {
  const THREE_DAYS_IN_MS = 4.06 * 24 * 60 * 60 * 1000;
  
  // Check if the target date is already saved in localStorage
  const storedDate = localStorage.getItem('targetDate');
  const NOW_IN_MS = new Date().getTime();
  
  let dateTimeAfterRender;

  if (storedDate) {
    dateTimeAfterRender = parseInt(storedDate, 10);
  } else {
    dateTimeAfterRender = NOW_IN_MS + THREE_DAYS_IN_MS;
    localStorage.setItem('targetDate', dateTimeAfterRender);
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>Volunteer Application coming soon...</p>
        <CountdownTimer targetDate={dateTimeAfterRender} />
      </header>
    </div>
  );
}

export default App;
