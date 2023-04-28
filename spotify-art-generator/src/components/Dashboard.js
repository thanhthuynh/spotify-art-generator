import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PlaylistList from './PlaylistList';
import Logout from './Logout';
import '../styles/styles.css';
import evaluateSentiment from './evaluateSentiment';
import { ThreeDots } from 'react-loader-spinner';


const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [displayName, setDisplayName] = useState('');
  const [playlists, setPlaylists] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem('spotify_access_token');
    if (!accessToken) {
      return;
    }

    const fetchData = async () => {
      setIsLoading(true);
      const response = await fetch('https://api.spotify.com/v1/me/playlists', {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const data = await response.json();
      const firstFivePlaylists = data.items.slice(0, 5);

      for (const playlist of firstFivePlaylists) {
        // Fetch the playlist tracks
        const trackResponse = await fetch(playlist.tracks.href, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        const trackData = await trackResponse.json();
        const tracks = trackData.items.slice(0, 5);
        playlist.tracksData = tracks;

        // Fetch the audio features for the tracks
        const trackIds = tracks.map((trackItem) => trackItem.track.id).join(',');
        const audioFeaturesResponse = await fetch(`https://api.spotify.com/v1/audio-features?ids=${trackIds}`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        const audioFeaturesData = await audioFeaturesResponse.json();

        // Evaluate the sentiment based on audio features
        const sentiment = evaluateSentiment(audioFeaturesData.audio_features);
        playlist.sentiment = sentiment;
      }

      setPlaylists([...firstFivePlaylists]);

      const userProfileResponse = await fetch('https://api.spotify.com/v1/me', {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      const userProfileData = await userProfileResponse.json();
      setDisplayName(userProfileData.display_name);

      setIsLoading(false);
    };

    fetchData();
  }, []);

  const handleSelectPlaylist = (playlist) => {
    navigate(`/selected-playlist/${playlist.id}`);
  };

  const handleLogout = () => {
    localStorage.removeItem('spotify_access_token');
    navigate('/'); // Navigate back to the login page
  };

  return (
    <>
      {isLoading ? (
        <div className="loader-wrapper">
          <ThreeDots 
            height="80" 
            width="80" 
            radius="9"
            color="#4fa94d" 
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClassName=""
            visible={true}
          />
        </div>
      ) : (
        <>
        <div className="dashboard-container">
          <div className="dashboard-header">
            <h1>{displayName}'s Playlists</h1>
            <Logout onLogout={handleLogout} />
          </div>
          <PlaylistList playlists={playlists} onSelectPlaylist={handleSelectPlaylist} />
        </div>
        </>
      )}
    </>
  );
};

export default Dashboard;