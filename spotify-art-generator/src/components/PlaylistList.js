import React from 'react';
import PlaylistItem from './PlaylistItem';

const PlaylistList = ({ playlists, onSelectPlaylist }) => (
  <ul className="playlist-list">
    {playlists.map((playlist) => (
      <PlaylistItem key={playlist.id} playlist={playlist} onSelectPlaylist={onSelectPlaylist} />
    ))}
  </ul>
);

export default PlaylistList;
