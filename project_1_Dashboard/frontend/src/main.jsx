// frontend/src/main.jsx

/**
 * Main entry point for the React application.
 *
 * Responsibilities:
 * - Import the root component (App).
 * - Render the application into the DOM.
 * - Wrap the application with any top-level providers (e.g., for routing or state management).
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // Assuming you have a global CSS file
import axios from 'axios';

// Set default base URL for axios
axios.defaults.baseURL = window.VITE_API_URL || 'http://localhost:5000';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
