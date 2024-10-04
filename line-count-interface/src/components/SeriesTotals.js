////////////////////
// SeriesTotals.js
// William Hotch
// September 2024
////////////////////

import React, { useState, useEffect } from 'react';
import DataOptions from './DataOptions';
import Clickbox from './Clickbox';

// HTML for the totals component on Data
function SeriesTotals({
    data, 
    loading, 
    error, 
    type, 
    seasonOptions, 
    selectedSeason, setSelectedSeason, 
    episodeOptions, 
    selectedEpisode, setSelectedEpisode,
    selectedSeries,
    seriesNameMap,
    epName,
    elcaminoIncluded, setElcaminoIncluded,
    ecVisible, setEcVisible,
    selectedPart, setSelectedPart
}) {
    if (loading) {
    //   return <div>Loading...</div>;
    }
  
    if (error) {
      return <div>Error: {error}</div>;
    }
  
    if (!data || data.length === 0) {
      return <div>No data available</div>;
    }

    const renderTotals = () => {
        // check is episode count should be visible
        if (!ecVisible) {
            return (
                // display the data line by line
                <ul>
                    {data.flatMap((item, index) => [
                        <li key={`item-${index}`}>
                            {item.rank}. {item.char_name} - {item.line_count} {item.line_count === 1 ? 'line' : 'lines'}
                        </li>,
                        // with an empty space after every tenth line
                        (index + 1) % 10 === 0 && <li key={`spacer-${index}`} className="spacer">&nbsp;</li>
                    ])}
                </ul>
            );
        }
        
        else {
            return (
                // display the data line by line
                <ul>
                    {data.flatMap((item, index) => [
                        <li key={`item-${index}`}>
                            {item.rank}. {item.char_name} - {item.line_count} {item.line_count === 1 ? 'line' : 'lines'}, {item.ep_count} {item.ep_count === 1 ? 'episode' : 'episodes'}{item.elcamino_bool && '*'}
                        </li>,
                        // with an empty space after every tenth line
                        (index + 1) % 10 === 0 && <li key={`spacer-${index}`} className="spacer">&nbsp;</li>
                    ])}
                </ul>
            );
        }
    };

    return (
        <div className="app-container">
            <div className="totals-outer-container">
                <div className="left-column">
                {/* Season and Episode dropdowns on the left */}
                    <div className="dropdown-container">
                    <DataOptions
                        selectedSeason={selectedSeason}
                        setSelectedSeason={setSelectedSeason}
                        selectedEpisode={selectedEpisode}
                        setSelectedEpisode={setSelectedEpisode}
                        seasonOptions={seasonOptions}
                        episodeOptions={episodeOptions}
                        selectedSeries={selectedSeries}
                        selectedPart={selectedPart}
                        setSelectedPart={setSelectedPart}
                    />
                    </div>
                </div>

                <div className="center-column">
                {/* totals in the middle */}
                    <div className="title-container">
                        <h2>Characters by Number of Lines in<br />{seriesNameMap[selectedSeries]}
                            {type === 'episode' &&
                                (<><br /> {` S${selectedSeason}E${selectedEpisode} "${epName}"`}</>)}
                            {type === 'season' && (
                                (selectedSeason === 'El Camino' && ': El Camino') ||
                                ` Season ${selectedSeason}` + (selectedPart ? `${selectedPart}` : '')
                            )}
                        </h2>
                    </div>

                    <div className="totals-container">
                    <ul className="totals-list">
                        {renderTotals()}
                    </ul>
                    </div>
                </div>

                <div className="right-column">
                {/* clickboxes on the right: episode count toggle and Include El Camino */}
                    <div className="clickbox-container">
                        <Clickbox
                            selectedSeason={selectedSeason}
                            selectedEpisode={selectedEpisode}
                            selectedSeries={selectedSeries}
                            elcaminoIncluded={elcaminoIncluded}
                            setElcaminoIncluded={setElcaminoIncluded}
                            ecVisible={ecVisible}
                            setEcVisible={setEcVisible}
                            type={type}
                        />
                    </div>
                </div>
        </div>
    </div>
    );
}

export default SeriesTotals;