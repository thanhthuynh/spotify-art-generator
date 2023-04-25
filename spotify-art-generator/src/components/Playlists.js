import React, { useEffect, useState } from "react";
import { getDatabase, ref } from "firebase/database";
import axios from "axios";

const Playlists = () => {
  const [playlists, setPlaylists] = useState([]);
  const [userId, setUserId] = useState(null);

  const getAccessToken = async () => {
    const response = await ref(getDatabase()).child("spotify_tokens").once("value");
    const tokens = response.val();

    if (tokens) {
      const [firstUserId, firstAccessToken] = Object.entries(tokens)[0];
      setUserId(firstUserId);
      return firstAccessToken;
    }

    return null;
  };

  useEffect(() => {
    const fetchPlaylists = async () => {
      const access_token = await getAccessToken();

      if (access_token) {
        try {
          const response = await axios.get(
            `https://api.spotify.com/v1/me/playlists`,
            { headers: { Authorization: `Bearer ${access_token}` } }
          );
          setPlaylists(response.data.items);
        } catch (error) {
          console.error("Error fetching playlists", error);
        }
      }
    };

    fetchPlaylists();
  }, []);

  const fetchPlaylistSongs = async (playlistId) => {
    const access_token = await getAccessToken();

    if (access_token) {
      try {
        const response = await axios.get(
          `https://api.spotify.com/v1/playlists/${playlistId}/tracks?limit=5`,
          { headers: { Authorization: `Bearer ${access_token}` } }
        );
        return response.data.items.map((item) => item.track);
      } catch (error) {
        console.error("Error fetching playlist tracks", error);
      }
    }

    return [];
  };

  return (
    <div className="playlists">
      <h1>User Playlists</h1>
      <div className="playlists__list">
        {playlists.map((playlist) => (
          <div key={playlist.id} className="playlist">
            <h3>{playlist.name}</h3>
            <button
              onClick={async () => {
                const tracks = await fetchPlaylistSongs(playlist.id);
                console.log(tracks);
              }}
            >
              Load 5-song preview
            </button>
            {/* Render the tracks here */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Playlists;
