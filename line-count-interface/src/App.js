///////////////////
// App.js
// William Hotch
// September 2024
///////////////////

import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import SeriesTotals from './components/SeriesTotals';
import Trivia from './components/Trivia';
import About from './components/About';
import Landing from './components/Landing';

// a map of abbreviation to full series name
const seriesNameMap = {
  HOTD: 'House of the Dragon',
  HIMYM: 'How I Met Your Mother',
  BB: 'Breaking Bad'
};

function App() {
  const [activeContent, setActiveContent] = useState(''); 
  const [selectedSeason, setSelectedSeason] = useState('all');
  const [selectedEpisode, setSelectedEpisode] = useState('all');
  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [seasonOptions, setSeasonOptions] = useState([]);
  const [episodeOptions, setEpisodeOptions] = useState([]);
  const [selectedSeries, setSelectedSeries] = useState('');
  const [isSeriesDropdownVisible, setIsSeriesDropdownVisible] = useState(false);
  const [aboutText, setAboutText] = useState('');
  const [triviaList, setTriviaList] = useState([]);
  const [landingText, setLandingText] = useState('');
  const [epName, setEpName] = useState('');
  const [type, setType] = useState('');
  const [ecVisible, setEcVisible] = useState(false);
  const [elcaminoIncluded, setElcaminoIncluded] = useState(false);
  const [selectedPart, setSelectedPart] = useState(null);

  // toggles visibilty of the series dropdown
  const toggleSeriesDropdown = () => {
    setIsSeriesDropdownVisible(prev => !prev);
  };

  // when a series is selected, update the states
  const handleSelectSeries = (seriesName) => {
    setSelectedSeries(seriesName);
    setIsSeriesDropdownVisible(false);
    setSelectedSeason('all');
    setSelectedEpisode('all');
    setSelectedPart(null);
  };

  // fetches the trivia file of the current series
  const fetchTrivia = async () => {
    try {
      const response = await fetch(`/trivia/${selectedSeries.toLowerCase()}_trivia.txt`);
      const text = await response.text();
      const triviaArray = text.split('\n').filter(line => line.trim() !== '');
      setTriviaList(triviaArray);
    } catch (error) {
      setTriviaList(['Failed to load Trivia content.']);
    }
  }

  // fetches the about file
  const fetchAbout = async () => {
    try {
      const response = await fetch('/about.txt');
      const text = await response.text();
      setAboutText(text);
    } catch (error) {
      setAboutText('Failed to load About text.');
    }
  }

  // fetches the file for the text on the landing page
  const fetchLanding = async () => {
    try {
      const response = await fetch('/landing.txt');
      const text = await response.text();
      setLandingText(text);
    } catch (error) {
      setLandingText('Failed to load Landing text.');
    }
  }

  // load all seasons into Season dropdown in Data
  useEffect(() => {
    if (activeContent === 'data') {
      // Fetch unique seasons when Data is selected for the Season dropdown
      fetch(`http://127.0.0.1:5000/api/${selectedSeries.toLowerCase()}_unique_seasons`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(seasons => {
          // add El Camino as a season option for Breaking Bad
          if (selectedSeries === 'BB') {
            setSeasonOptions(['all', ...seasons, 'El Camino']);
          } else {
            setSeasonOptions(['all', ...seasons]);
          }

          // Fetch all series totals when "All Seasons" is selected 
          if (selectedSeason === 'all') {
            setSelectedEpisode('all');
            fetchData();  
          }
        })
        .catch(err => {
          setError(err.message);
        });
    } else if (activeContent === 'trivia') {
      // fetch trivia is trivia is selected
      fetchTrivia();
    } else if (activeContent === 'about') {
      // fetch about is about is selected
      fetchAbout();
    }
  }, [selectedSeries, activeContent]);

  // load all episodes into Episode dropdown in Data
  useEffect(() => {
    if (selectedSeason !== 'all') {
      // Reset episode to 'all' immediately when a new season is selected
      setSelectedEpisode('all');

      // Fetch unique episodes when a season is selected
      // when selected season is not El Camino
      if (selectedSeason !== 'El Camino') {
        let url;
        if (selectedPart) {
          url = `http://127.0.0.1:5000/api/${selectedSeries.toLowerCase()}_unique_part_episodes/${selectedSeason}/${selectedPart}`
        } else {
          url = `http://127.0.0.1:5000/api/${selectedSeries.toLowerCase()}_unique_episodes/${selectedSeason}`
        }
        fetch(url)
          .then(response => {
            if(!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then(episodes => {
            setEpisodeOptions(['all', ...episodes]);
          })
          .catch(err => {
            setError(err.message);
          });
      }
    } else {
      // Clear episode options when 'all seasons' is selected
      setEpisodeOptions([]);
    }
  }, [selectedSeason, selectedPart]);

  // useEffects happen simultaneously so below is contructed like this 
  // to let selectedEpisode update before attempting to access it 
  // fetch data for whichever season/episode is selected
  useEffect(() => {
    if (activeContent === 'data' && selectedSeason) {
      if (selectedSeason === 'all') {
        fetchData();
      } else if (selectedEpisode === 'all') {
        fetchData();
      } else if (selectedPart) {
        fetchData();
      } else if (selectedEpisode !== 'all') {
        fetchData();
      }
    }
  }, [selectedSeason, selectedEpisode, episodeOptions, elcaminoIncluded, ecVisible, selectedPart]);

  // fetch data for whichever season/episode is selected
  const fetchData = () => {
    setLoading(true);
    setError(null);
    
    // set the appropriate API url for the situation
    let url;
    // entire series
    if (selectedSeason === 'all') {
      // Breaking Bad with El Camino
      if (selectedSeries === 'BB' && elcaminoIncluded) {
        url = `http://127.0.0.1:5000/api/bb_series_combined_totals`
      }
      else {
        url = `http://127.0.0.1:5000/api/${selectedSeries.toLowerCase()}_series_totals`;
      }
        setType('series');
        setEcVisible(true);
    }
    // El Camino for Breaking Bad
    else if (selectedSeries === 'BB' && selectedSeason === 'El Camino') {
      url = `http://127.0.0.1:5000/api/bb_elcamino_totals`;
      setType('season');
      setEcVisible(false);
    }
    // full season or part
    else if (selectedEpisode === 'all') {
      if (selectedPart) {
        url = `http://127.0.0.1:5000/api/${selectedSeries.toLowerCase()}_part_totals/${selectedSeason}/${selectedPart}`;
      } else {
      url = `http://127.0.0.1:5000/api/${selectedSeries.toLowerCase()}_season_totals/${selectedSeason}`;
      }
      setType('season');
      setEcVisible(true);
    }
    // episode
    else {
      if (selectedPart) {
        url = `http://127.0.0.1:5000/api/${selectedSeries.toLowerCase()}_part_ep_totals/${selectedSeason}/${selectedPart}/${selectedEpisode}`
      } else {
        url = `http://127.0.0.1:5000/api/${selectedSeries.toLowerCase()}_ep_totals/${selectedSeason}/${selectedEpisode}`;
      }
      setType('episode');
      setEcVisible(false);
    }

    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        if (!data || data.length === 0) {
          setApiData(null);
          setError('No data available');
        } else {
          setApiData(data);
        }

        // fetch name of the episode if a single episode is selected
        if (selectedSeason !== 'all' && selectedEpisode !== 'all') {
          let epNameUrl;
          if (selectedPart) {
            // if episode is from a part
            epNameUrl = `http://127.0.0.1:5000/api/${selectedSeries.toLowerCase()}_part_ep_name/${selectedSeason}/${selectedPart}/${selectedEpisode}`;
          } else {
            // if episode is from a season
            epNameUrl = `http://127.0.0.1:5000/api/${selectedSeries.toLowerCase()}_ep_name/${selectedSeason}/${selectedEpisode}`;
          }
          fetch(epNameUrl)
            .then(response => {
              if (!response.ok) {
                throw new Error('Could not access episode name');
              }
              return response.json();
            })
            .then(name => {
              if(!name || name.length === 0) {
                setEpName(null);
              } else {
                setEpName(name.ep_name);
              }
            })
        }

        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      }); 
  };

  // display content on the page
  const renderContent = () => {
    switch (activeContent) {
      // case 'series':
      case 'data':
        return (
          <>
            <SeriesTotals
              data={apiData}
              loading={loading}
              error={error}
              type={type}
              ecVisible={ecVisible}
              setEcVisible={setEcVisible}
              seasonOptions={seasonOptions}
              selectedSeason={selectedSeason}
              setSelectedSeason={setSelectedSeason}
              episodeOptions={episodeOptions}
              selectedEpisode={selectedEpisode}
              setSelectedEpisode={setSelectedEpisode}
              selectedSeries={selectedSeries}
              seriesNameMap={seriesNameMap}
              epName={epName}
              elcaminoIncluded={elcaminoIncluded}
              setElcaminoIncluded={setElcaminoIncluded}
              selectedPart={selectedPart}
              setSelectedPart={setSelectedPart}
            />
          </>
        );
      case 'graph':
        return <div>Coming soon...</div>;  
      case 'trivia':
        return <Trivia triviaList={triviaList} />;
      case 'about':
        return <About aboutText={aboutText} />;
      default:
        fetchLanding();
        return <Landing landingText={landingText} />;
    }
  };

  // HTML for the page
  return (
    <div className="App">
      <Header
        setActiveContent={setActiveContent}
        isSeriesDropdownVisible={isSeriesDropdownVisible}
        toggleSeriesDropdown={toggleSeriesDropdown}
        handleSelectSeries={handleSelectSeries}
        selectedSeries={selectedSeries}
        seriesNameMap={seriesNameMap}
      />
      <main>
        {renderContent()}
      </main>
    </div>
  );
}

export default App;