import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import Callback from "./components/Callback";
import Playlists from "./components/Playlists";

function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/callback" element={<Callback />} />
          <Route path="/playlists" element={<Playlists />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
