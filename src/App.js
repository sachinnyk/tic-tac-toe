import React from "react";
import "./App.css";
import Box from "./Box.js";

function App() {
  return (
    <div>
      <nav className="navbar  navbar-dark bg-dark">
        <span className="navbar-brand mb-0 h1">Tic Tac Toe</span>
      </nav>
      <div className="App">
        <Box />
      </div>
    </div>
  );
}

export default App;
