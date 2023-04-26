import React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Callback from './components/Callback';
import Dashboard from './components/Dashboard';
import './App.css';


const App = () => {
  const navigate = useNavigate();
  const clientId = '7bcd29159d7d4a8990c1048b8c08a19a';
  const redirectUri = 'http://localhost:3000/callback';

  const handleLogin = () => {
    const authEndpoint = 'https://accounts.spotify.com/authorize';
    const responseType = 'token';
    const scope = 'playlist-read-private';

    const url = `${authEndpoint}?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=${responseType}&scope=${encodeURIComponent(scope)}`;

    window.location.href = url;
  };

  return (
    <div className="app-container">
      <button className="login-button" onClick={handleLogin}>
        Login with Spotify
      </button>
      <Routes>
        <Route path="/callback" element={<Callback />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
};

export default App;
