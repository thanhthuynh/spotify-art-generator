import React from 'react';

const PlaylistItem = ({ playlist, onSelectPlaylist }) => {
  const playlistCoverImage = playlist.images && playlist.images.length > 0 ? playlist.images[0].url : '';
  let trackCounter = 0;

  return (
    <li className="playlist-item">
      <div className="playlist-header">
        <img src={playlistCoverImage} alt={`${playlist.name} cover`} />
        <div>
          <h3>{playlist.name}</h3>
          <p>Sentiment: {playlist.sentiment}</p>
        </div>
      </div>
      <ul className="track-list">
        {playlist.tracksData &&
          playlist.tracksData.map((trackItem) => {
            trackCounter += 1;
            return (
              <li key={trackItem.track.id}>
                <span className="track-number">{trackCounter}. </span>
                <img src={trackItem.track.album.images[2].url} alt={`${trackItem.track.name} cover`} />
                <span>{trackItem.track.name}</span>
              </li>
            );
          })}
      </ul>
      <button onClick={() => onSelectPlaylist(playlist)}>Select Playlist</button>
    </li>
  );
};

export default PlaylistItem;
