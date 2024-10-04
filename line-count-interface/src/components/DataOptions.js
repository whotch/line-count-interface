/////////////////////
// DataOptions.js
// William Hotch
// September 2024
/////////////////////

import React from 'react';
import './DataOptions.css';

// HTML for the Season and Episode dropdowns on Data
function DataOptions({
    selectedSeason, setSelectedSeason, 
    selectedEpisode, setSelectedEpisode, 
    seasonOptions, episodeOptions,
    selectedSeries,
    selectedPart, setSelectedPart
}) {
    // handle the part selection clickboxes
    const handlePartSelection = (part) => {
        if (selectedPart === part) {
            // deselect clickbox is it was already selected
            setSelectedPart(null);
            setSelectedEpisode('all');
        } else {
            // otherwise set the clickbox to be selected which will deselect the other one
            setSelectedPart(part);
            setSelectedEpisode('all');
        }
    }

    return (
        <div className="data-options">
            {/* display series dropdown */}
            <label className="dropdown-label" htmlFor="season-select">Select Season:</label>
            <select
                id="season-select"
                value={selectedSeason}
                onChange={(e) => setSelectedSeason(e.target.value)}
            >
                {seasonOptions.map((season, index) => (
                    <option key={index} value={season}>
                        {season === 'all' ? 'All' : season === 'El Camino' ? 'El Camino' : `Season ${season}`}
                    </option>
                ))}
            </select>

            {/* if a season that has parts is selected, display two clickboxes to optionally select */}
            {selectedSeries === 'BB' && selectedSeason === '5' && (
                <div className='part-clickbox-container'>
                    <label className="clickbox-label" htmlFor="part-a-clickbox">
                    Part A
                        <input
                            type="checkbox"
                            id="part-a-clickbox"
                            checked={selectedPart === 'A'}
                            onChange={() => handlePartSelection('A')}
                        />
                    </label>

                    <label className="clickbox-label" htmlFor="part-b-clickbox">
                    Part B
                        <input
                            type="checkbox"
                            id="part-b-clickbox"
                            checked={selectedPart === 'B'}
                            onChange={() => handlePartSelection('B')}
                        />
                    </label>
                </div>
            )}

            {/* if a season is selected, display episode dropdown */}
            {selectedSeason !== 'all' && selectedSeason !== 'El Camino' && (
                <>
                    <label className="dropdown-label" htmlFor="episode-select">Select Episode:</label>
                    <select
                        id="episode-select"
                        value={selectedEpisode}
                        onChange={(e) => setSelectedEpisode(e.target.value)}
                    >
                        {episodeOptions.map((episode, index) => (
                            <option key={index} value={episode}>
                                {episode === 'all' ? 'All' : `Episode ${episode}`}
                            </option>
                        ))}
                    </select>
                </>
            )}
        </div>
    );
}

export default DataOptions;
