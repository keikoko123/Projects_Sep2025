// frontend/src/pages/RegisterPage.jsx

/**
 * Register Page Component.
 *
 * Responsibilities:
 * - Display a form for new users to register.
 * - Manage the state of the form inputs (e.g., username, email, password).
 * - Handle form submission, calling the register API endpoint.
 * - Redirect the user to the login page upon successful registration.
 * - Display error messages if registration fails.
 */

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      await axios.post(
        '/api/auth/register',
        { username, email, password },
        config
      );
      setMessage('Registration successful! Please log in.');
      navigate('/login');
    } catch (error) {
      setMessage(error.response.data.message || error.message);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      {message && <p>{message}</p>}
      <form onSubmit={submitHandler}>
        <div>
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
      <p>
        Have an Account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}

export default RegisterPage;
