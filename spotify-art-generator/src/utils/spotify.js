export const authEndpoint = "https://accounts.spotify.com/authorize";

export const clientId = process.env.SPOTIFY_CLIENT_ID;
export const redirectUri = process.env.SPOTIFY_REDIRECT_URI;

export const scopes = [
  "user-read-private",
  "user-read-email",
  "playlist-read-private",
  "playlist-read-collaborative",
];

export const getLoginUrl = () => {
  return `${authEndpoint}?client_id=${clientId}&redirect_uri=${encodeURIComponent(
    redirectUri
  )}&scope=${encodeURIComponent(scopes.join(" "))}&response_type=token`;
};

export const getTokenFromUrl = () => {
  const urlParams = new URLSearchParams(window.location.hash.substring(1));
  const access_token = urlParams.get("access_token");
  return { access_token };
};