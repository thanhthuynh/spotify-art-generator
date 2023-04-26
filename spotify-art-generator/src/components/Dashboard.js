import React, { useEffect, useState } from 'react';
//import cloudinary from './utils/cloudinary';
import '../styles/Dashboard.css';

function evaluateSentiment(audioFeatures) {
  const numTracks = audioFeatures.length;
  const totalValence = audioFeatures.reduce((sum, track) => sum + track.valence, 0);
  const totalEnergy = audioFeatures.reduce((sum, track) => sum + track.energy, 0);
  const totalDanceability = audioFeatures.reduce((sum, track) => sum + track.danceability, 0);

  const avgValence = totalValence / numTracks;
  const avgEnergy = totalEnergy / numTracks;
  const avgDanceability = totalDanceability / numTracks;

  const sentimentScore = (avgValence + avgEnergy + avgDanceability) / 3;

  if (sentimentScore >= 0.6) {
    return 'positive';
  } else if (sentimentScore >= 0.4) {
    return 'neutral';
  } else {
    return 'negative';
  }
}

const Dashboard = () => {
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    const accessToken = localStorage.getItem('spotify_access_token');
    if (!accessToken) {
      return;
    }

    const fetchData = async () => {
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
    };

    fetchData();
  }, []);

  return (
    <div className="dashboard-container">
      <h1>Your Playlists</h1>
      <ul className="playlist-list">
        {playlists.map((playlist) => (
          <li key={playlist.id}>
            <h3>{playlist.name}</h3>
            <p>Sentiment: {playlist.sentiment}</p>
            <ul>
              {playlist.tracksData &&
                playlist.tracksData.map((trackItem) => (
                  <li key={trackItem.track.id}>{trackItem.track.name}</li>
                ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
    );
};

export default Dashboard;