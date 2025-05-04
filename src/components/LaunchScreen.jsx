import React, { useState } from 'react';
import './LaunchScreen.css';

const LaunchScreen = ({ onLaunch }) => {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(true);
    setTimeout(() => {
      onLaunch(); // Navigate after curtain opens
    },1000); // Match with animation duration
  };

  return (
    <div className={`launch-container ${clicked ? 'clicked' : ''}`} onClick={handleClick}>
      <div className="curtain curtain-left" />
      <div className="curtain curtain-right" />
      <div className="welcome-text">
        <h1>Welcome to <span>DataBrainHub</span></h1>
        
      </div>
    </div>
  );
};

export default LaunchScreen;
