// frontend/src/App.jsx

/**
 * Root Application Component.
 *
 * Responsibilities:
 * - Set up the main application layout.
 * - Configure client-side routing (e.g., using React Router).
 * - Define the routes for different pages (e.g., Home, Login, Register, Profile).
 * - Manage global state if necessary (e.g., with Context API or Redux).
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import { AuthProvider } from './context/AuthContext'; // Import AuthProvider

function App() {
  return (
    <AuthProvider> {/* Wrap the entire application with AuthProvider */}
      <Router>
        {/* component1 */}
        <Navbar />

        <main>
        {/* component2 */}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/profile/:id" element={<ProfilePage />} />
          </Routes>
        </main>
      </Router>
    </AuthProvider>
  );
}

export default App;
