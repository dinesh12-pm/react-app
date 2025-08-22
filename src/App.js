// src/App.js
import React, { useState } from 'react';
import './App.css';

function App() {
  const [visits, setVisits] = useState(0);

  const handleClick = () => {
    setVisits(visits + 1);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to My React App!</h1>
        <p>Button clicked {visits} times</p>
        <button onClick={handleClick}>Click Me!</button>
      </header>
    </div>
  );
}

export default App;

