// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';  // Use ReactDOM from react-dom for React 17
import './index.css';  // Import global CSS
import App from './App';  // Import the main App component

// Render the app
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')  // Ensure the 'root' div exists in your index.html
);
