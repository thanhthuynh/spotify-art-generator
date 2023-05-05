import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'firebase/compat/auth';
import '../styles/styles.css';
import { auth, signInWithCustomToken } from '../utils/firebase'

const Callback = () => {
  const navigate = useNavigate();
  const [accessToken, setAccessToken] = useState('');

  const authenticateWithFirebase = async (spotifyAccessToken) => {
    try {
      const response = await fetch('http://localhost:8000/api/authenticate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ accessToken: spotifyAccessToken }),
      });
  
      const data = await response.json();
      const customToken = data.firebaseToken;
  
      // Store the Spotify user ID in local storage
      localStorage.setItem('spotify_user_id', data.spotifyUserId);
  
      await signInWithCustomToken(auth, customToken);
    } catch (error) {
      console.error('Error authenticating with Firebase:', error);
    }
  };
  

  useEffect(() => {
    const hash = window.location.hash
      .substring(1)
      .split('&')
      .reduce((initial, item) => {
        const parts = item.split('=');
        initial[parts[0]] = decodeURIComponent(parts[1]);
        return initial;
      }, {});

    if (hash.access_token) {
      setAccessToken(hash.access_token);
      localStorage.setItem('spotify_access_token', hash.access_token);
      authenticateWithFirebase(hash.access_token);
      navigate('/dashboard');
    } else {
      navigate('/');
    }
  }, [navigate]);

  return <div className="callback-container">Redirecting...</div>;
};

export default Callback;
