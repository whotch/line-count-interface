////////////////////
// Trivia.js
// William Hotch
// September 2024
////////////////////

import React from 'react';
import './Trivia.css';

// HTML for Trivia page
const Trivia = ({ triviaList }) => {
    return (
        <div className="app-container">
            <div className="trivia-container">
                <div className="title-container">
                    <h2>Trivia</h2>
                </div>
                <ul className="trivia-list">
                    {triviaList.map((trivia, index) => (
                        <li key={index} className="trivia-item">
                            {trivia}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Trivia;