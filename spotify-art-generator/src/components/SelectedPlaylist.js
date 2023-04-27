import React from 'react';

const SelectedPlaylist = ({ playlist }) => (
  <div className="selected-playlist">
    <h2>Selected Playlist</h2>
    <h3>{playlist.name}</h3>
    <img src={playlist.imageUrl} alt={`${playlist.name} cover`} />
    <p>Sentiment: {playlist.sentiment}</p>
  </div>
);

export default SelectedPlaylist;