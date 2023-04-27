import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/styles.css';


const Callback = () => {
  const navigate = useNavigate();

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
      localStorage.setItem('spotify_access_token', hash.access_token);
      navigate('/dashboard');
    } else {
      navigate('/');
    }
  }, [navigate]);

  return <div className="callback-container">Redirecting...</div>;
};

export default Callback;
