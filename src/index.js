import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import '../src/styles/globals.css'
import Scoreboard from './components/Scoreboard';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Scoreboard />
  </React.StrictMode>
);
reportWebVitals();
