////////////////////
// Header.js
// William Hotch
// September 2024
////////////////////

import React, { useState} from 'react';
import './Header.css';

// HTML for the header
const Header = ({
    setActiveContent,
    isSeriesDropdownVisible,
    toggleSeriesDropdown,
    handleSelectSeries,
    selectedSeries,
    seriesNameMap,
}) => {
    const [activeButton, setActiveButton] = useState('');

    // update states when a button is clicked
    const handleButtonClick = (buttonName) => {
        if (buttonName !== 'series') {
            if (selectedSeries || buttonName === 'about') {
                setActiveButton(buttonName);
                setActiveContent(buttonName); 
            }
        }
    };

    // display full series name
    const getDisplaySeriesName = (abbreviation) => {
        return seriesNameMap[abbreviation] || 'Series';
    };
    
    return (
        <header className="header">
            <div className="button-container">

                <div className="series-button-container">
                    <button
                    className={`button ${activeButton === 'series' || selectedSeries ? 'active' : ''}`}
                    onClick={() => {
                        toggleSeriesDropdown();
                        handleButtonClick('series');
                    }}>
                        {selectedSeries ? getDisplaySeriesName(selectedSeries) : 'Series'}
                    </button>
                    {isSeriesDropdownVisible && (
                        <div className="dropdown">
                            <ul>
                                <li onClick={() => handleSelectSeries('BB')}>Breaking Bad</li>
                                <li onClick={() => handleSelectSeries('HOTD')}>House of the Dragon</li>
                                <li onClick={() => handleSelectSeries('HIMYM')}>How I Met Your Mother</li>
                            </ul>
                        </div>
                    )}
                </div>

                <button
                    className={`button ${activeButton === 'data' ? 'active' : ''}`}
                    onClick={() => handleButtonClick('data')}
                >
                    Data
                </button>
                
                <button
                    className={`button ${activeButton === 'graph' ? 'active' : ''}`}
                    onClick={() => handleButtonClick('graph')}
                >
                    Graph
                </button>

                <button
                    className={`button ${activeButton === 'trivia' ? 'active' : ''}`}
                    onClick={() => handleButtonClick('trivia')}
                >
                    Trivia
                </button>

                <button
                    className={`button ${activeButton === 'about' ? 'active' : ''}`}
                    onClick={() => handleButtonClick('about')}
                >
                    About
                </button>
            </div>
        </header>
    );
};

export default Header;