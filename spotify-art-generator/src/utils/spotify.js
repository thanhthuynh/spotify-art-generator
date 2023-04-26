import secureRandomString from "secure-random-string";

export const authEndpoint = "https://accounts.spotify.com/authorize";

export const clientId = "7bcd29159d7d4a8990c1048b8c08a19a";
export const redirectUri = "http://localhost:3000/callback";

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

export const generateCodeVerifier = () => {
  return secureRandomString({ length: 128 });
};

export const generateCodeChallenge = (codeVerifier) => {
  const hashed = new TextEncoder().encode(codeVerifier);
  return btoa(String.fromCharCode.apply(null, new Uint8Array(hashed)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
};

export const getLoginUrlWithPkce = (codeChallenge) => {
  return `${authEndpoint}?client_id=${clientId}&redirect_uri=${encodeURIComponent(
    redirectUri
  )}&scope=${encodeURIComponent(scopes.join(" "))}&response_type=code&code_challenge=${codeChallenge}&code_challenge_method=S256`;
};

export const getCodeFromUrl = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get("code");
  return { code };
};

export const exchangeCodeForTokens = async (code) => {
  // Replace the following line with your actual token exchange implementation
  // based on the server-side API you've set up.
  const response = await fetch("/api/your_token_exchange_endpoint", {
    method: "POST",
    body: JSON.stringify({ code }),
  });

  if (!response.ok) {
    throw new Error("Failed to exchange code for tokens");
  }

  const data = await response.json();
  return {
    access_token: data.access_token,
    refresh_token: data.refresh_token,
  };
};