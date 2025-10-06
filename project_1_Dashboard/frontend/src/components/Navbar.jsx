// frontend/src/components/Navbar.jsx

/**
 * Navigation Bar Component.
 *
 * Responsibilities:
 * - Display navigation links (e.g., Home, Profile, Login, Register).
 * - Show different links based on whether the user is authenticated.
 * - Include a "Logout" button for authenticated users.
 */

import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext'; // Import AuthContext

function Navbar() {
  const navigate = useNavigate();
  const { userInfo, setUserInfo } = useContext(AuthContext); // Use AuthContext

  const logoutHandler = () => {
    setUserInfo(null); // Clear user info from context
    navigate('/login');
  };

  return (
    <nav>
      <Link to="/">Home</Link>
      {userInfo ? (
        <>
          <Link to="/profile">Profile</Link>
          <button onClick={logoutHandler}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;
