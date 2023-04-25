import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getTokenFromUrl } from "../spotify";
import { getDatabase, ref } from "firebase/database";
import axios from "axios";

const Callback = () => {
  const [navigate, setNavigate] = useState(false);

  useEffect(() => {
    const handleToken = async () => {
      const { access_token } = getTokenFromUrl();
      window.location.hash = "";

      if (access_token) {
        try {
          const response = await axios.get("https://api.spotify.com/v1/me", {
            headers: { Authorization: `Bearer ${access_token}` },
          });
          const userId = response.data.id;

          // Save the access token to Firebase
          ref(getDatabase()).child(`spotify_tokens/${userId}`).set(access_token);

          // Navigate to the user's playlists page
          setNavigate(true);
        } catch (error) {
          console.error("Error getting user data from Spotify", error);
        }
      }
    };

    handleToken();
  }, []);

  return navigate ? <Navigate to="/playlists" /> : <div>Loading...</div>;
};

export default Callback;
