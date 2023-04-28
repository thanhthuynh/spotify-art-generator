import React from 'react';

const Login = () => {
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
    <div className="login-container">
      <h1> Spotify Playlist AI Art Generator</h1>
      <button className="login-button" onClick={handleLogin}>
        Login with Spotify
      </button>
      <footer>Developed by Thanh Huynh, Caden Huffman, and Jung (Jenny) Youjung</footer>
    </div>
  );
};

export default Login;