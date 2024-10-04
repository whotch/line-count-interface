/////////////////////
// Clickbox.js
// William Hotch
// September 2024
/////////////////////

import React from 'react';
import './Clickbox.css';

// HTML for the clickboxes that can appear on Data
function Clickbox({
    selectedSeason,
    selectedEpisode,
    selectedSeries,
    elcaminoIncluded, setElcaminoIncluded,
    ecVisible, setEcVisible,
    type
}) {
    // toggle between including El Camino
    const handleElcaminoToggle = () => {
        setElcaminoIncluded(prev => !prev);
    }

    // toggle episode count visibility
    const handleEcToggle = () => {
        setEcVisible(prev => !prev);
    }

    return (
        <div className="clickbox">
            {/* episode count toggle – hidden because I would have to add other stuff and I don't feel like it right now */}
            {(type !== 'episode' && selectedSeason !== 'El Camino' && false) && (
                <label className="clickbox-label" htmlFor="ec-toggle">
                    Hide Episode Count
                    <input
                        type="checkbox"
                        id="ec-toggle"
                        checked={ecVisible}
                        onChange={handleEcToggle}
                    />
                </label>
            )}

            {/* include El Camino in series totals for Breaking Bad */}
            {selectedSeries === 'BB' && selectedSeason === 'all' && (
                <label className="clickbox-label" htmlFor="include-elcamino">
                    Include El Camino
                    <input
                        type="checkbox"
                        id="include-elcamino"
                        checked={elcaminoIncluded}
                        onChange={handleElcaminoToggle}
                    />
                </label>
            )}
        </div>
    )
}

export default Clickbox;