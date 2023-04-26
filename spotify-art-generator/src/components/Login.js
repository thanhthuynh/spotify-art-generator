import React, { useEffect } from "react";
import {
  getLoginUrlWithPkce,
  generateCodeVerifier,
  generateCodeChallenge,
} from "../spotify";

const Login = () => {
  const codeVerifier = generateCodeVerifier();
  const codeChallenge = generateCodeChallenge(codeVerifier);
  const loginUrl = getLoginUrlWithPkce(codeChallenge);

  useEffect(() => {
    localStorage.setItem("code_verifier", codeVerifier);
  }, []);

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
