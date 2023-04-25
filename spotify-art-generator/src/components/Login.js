import React from "react";
import { authEndpoint, clientId, redirectUri, scopes } from "../spotify";

const Login = () => {
  const loginUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
    "%20"
  )}&response_type=token&show_dialog=true`;

  return (
    <div className="login">
      <h1>Login with Spotify</h1>
      <a href={loginUrl} className="login__button">
        Login
      </a>
    </div>
  );
};

export default Login;
