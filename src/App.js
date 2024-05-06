import React, { useState, useEffect } from 'react';
import './App.css';

function Timer() {
  const [time, setTime] = useState(0);
  const [inputTime, setInputTime] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [isTimerMode, setIsTimerMode] = useState(true);

useEffect(() => {
  let interval;
  if (isRunning) {
  interval = setInterval(() => {
  if (isTimerMode) {
  setTime(prevTime => prevTime - 1);
  } else {
  setTime(prevTime => prevTime + 1);
    }
  }, 1000);
  } else {
  clearInterval(interval);
    }

return () => clearInterval(interval);
  }, [isRunning, isTimerMode]);

const handleStartStop = () => {
    setIsRunning(!isRunning);
  };

const handleReset = () => {
  setTime(0);
  setInputTime('');
  setIsRunning(false);
  };

const handleInputChange = (event) => {
  const { value } = event.target;
  setInputTime(value);
  setTime(parseInt(value));
  };

const toggleMode = () => {
  setIsTimerMode(!isTimerMode);
  setTime(0);
  setInputTime('');
  setIsRunning(false);
  };

const formatTime = () => {
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = time % 60;
  const formattedHours = hours.toString().padStart(2, '0');
  const formattedMinutes = minutes.toString().padStart(2, '0');
  const formattedSeconds = seconds.toString().padStart(2, '0');

return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  };

return (
  <div className="timer-container">
  <h1>{isTimerMode ? 'Timer' : 'Stopwatch'}</h1>
  {isTimerMode && (
  <div className="input-container">
  <input
  type="number"
  value={inputTime}
  onChange={handleInputChange}
  placeholder="Enter time in seconds"
  className="timer-input"/>
</div>
  )}

<div className="time-display">{formatTime()}</div>
  <div className="button-container">
  <button className="start-stop-button" onClick={handleStartStop}>{isRunning ? 'Stop' : 'Start'}</button>
  <button className="reset-button" onClick={handleReset}>Reset</button>
  <button className="mode-switch-button" onClick={toggleMode}>{isTimerMode ? 'Switch to Stopwatch' : 'Switch to Timer'}</button>
</div>
</div>
  );
}

export default Timer;
