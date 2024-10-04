////////////////////
// Landing.js
// William Hotch
// September 2024
////////////////////

import React from 'react';
import './Landing.css';

// HTML for landing page
const Landing = ({ landingText }) => {
  return (
    <div className="app-container">
        <div className="landing-container">
            <li className="landing-text">{landingText}</li>
        </div>
    </div>
  );
};

export default Landing;
