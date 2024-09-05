import React, { useState, useEffect } from "react";
import "./styles/countdown.css"; // Styles for the mystical frame and timer

const Countdown = ({ initialTime }) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  useEffect(() => {
    // Function to update the time left every second
    const timerInterval = setInterval(() => {
      setTimeLeft((prevTimeLeft) => {
        if (prevTimeLeft <= 1000) {
          clearInterval(timerInterval);
          return 0;
        }
        return prevTimeLeft - 1000;
      });
    }, 1000);

    return () => clearInterval(timerInterval); // Clear the interval when the component unmounts
  }, []);

  // Function to format milliseconds into HH:MM:SS
  const formatTime = (time) => {
    const hours = Math.floor(time / (1000 * 60 * 60));
    const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((time % (1000 * 60)) / 1000);
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(seconds).padStart(2, "0")}`;
  };

  return (
    <div className="countdown-container">
      <div className="mystical-frame mystical-frame-cd">
        <div className="countdown-timer">{formatTime(timeLeft)}</div>
      </div>
    </div>
  );
};

export default Countdown;
