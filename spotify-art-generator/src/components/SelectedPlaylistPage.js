import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import evaluateSentiment from './evaluateSentiment';
import openai from '../utils/openAI';
import '../styles/styles.css';

const SelectedPlaylistPage = () => {
    const [playlist, setPlaylist] = useState(null);
    const [sentimentImageUrl, setSentimentImageUrl] = useState(null);
    const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
        const accessToken = localStorage.getItem('spotify_access_token');
        if (!accessToken) {
          return;
        }
      
        // Fetch the playlist data by its ID
        const response = await fetch(`https://api.spotify.com/v1/playlists/${id}`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        const playlist = await response.json();
      
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
      
        setPlaylist(playlist);
      };      
    
    fetchData();
  }, [id]);

  const handleCloudinaryGenerateImage = (sentiment) => {
    const color = sentiment === 'positive' ? '00FF00' : sentiment === 'neutral' ? 'FFFF00' : 'FF0000';
    const variation = Math.floor(Math.random() * 50); // Random variation from 0 to 49
    const newColor = (parseInt(color, 16) + variation).toString(16).padStart(6, '0');
    const timestamp = Date.now();
  
    const imageUrl = `https://res.cloudinary.com/dajpbc6qh/image/upload/w_1024,h_1024,c_fill,bo_5px_solid_rgb:${newColor},b_rgb:${newColor}/base_white.png?t=${timestamp}`;
  
    setSentimentImageUrl(imageUrl);
  };

  const [result, setResult] = useState("");
  const handleDALLEGenerateImage = async () => {
    try {
      const response = await openai.createImage({
        prompt: 'Create a 1024x1024 image that conveys ' + playlist.sentiment,
        n: 1,
        size: '1024x1024',
      });
  
      console.log(response.data.data[0].url);
      setResult(response.data.data[0].url);
    } catch (error) {
      if (error.response) {
        // The request was made, and the server responded with a status code
        // that falls outside the range of 2xx
        console.error('Error generating image:', error.response.data);
      } else if (error.request) {
        // The request was made, but no response was received
        console.error('Error generating image:', error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error generating image:', error.message);
      }
    }
  };
  

  return (
    <div className="selected-playlist-page">
      {playlist && (
        <>
          <h1>{playlist.name}</h1>
          <p>Sentiment: {playlist.sentiment}</p>
          <button onClick={() => handleCloudinaryGenerateImage(playlist.sentiment)}>Generate Sentiment Image with Cloudinary</button>
          {sentimentImageUrl && <img src={sentimentImageUrl} alt="Cloudinary Sentiment" />}

          <button onClick={handleDALLEGenerateImage}>Generate Sentiment Image with Open AI</button>
          {result && <img className="result-image" src={result} alt="DALL-E Sentiment" />}

        </>
      )}
    </div>
  );
};

export default SelectedPlaylistPage;