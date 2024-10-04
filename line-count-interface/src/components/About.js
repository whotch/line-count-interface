//////////////////
// About.js
// William Hotch
// September 2024
//////////////////

import React, { useEffect } from 'react';
import './About.css';
import Coffee from './Coffee.js';

// HTML for the About page
const About = ({ aboutText }) => {
  return (
    <div className="app-container">
        <div className="about-container">
            <div className="title-container">
                <h2>About</h2>
            </div>
            <li className="about-text">{aboutText}</li>
            <div>
            <Coffee />
            </div>
        </div>
    </div>
  );
};

export default About;
