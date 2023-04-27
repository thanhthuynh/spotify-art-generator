import React from 'react';

const PlaylistItem = ({ playlist, onSelectPlaylist }) => (
  <li className="playlist-item">
    <h3 className="playlist-name">{playlist.name}</h3>
    {<img src={playlist.imageUrl} alt={`${playlist.name} cover`} />}
    <p className="playlist-sentiment">Sentiment: {playlist.sentiment}</p>
    <ul>
      {playlist.tracksData &&
        playlist.tracksData.map((trackItem) => (
          <li key={trackItem.track.id}>{trackItem.track.name}</li>
        ))}
    </ul>
    <button onClick={() => onSelectPlaylist(playlist)}>Select Playlist</button>
  </li>
);

export default PlaylistItem;
