import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // For navigation
import axios from 'axios';  // Make sure axios is installed
import './SignInPage.css';  // Import the styles for the sign-in page

const SignInPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();  // Hook for navigation

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make API request to login
      const response = await axios.post('http://localhost:8000/api/login', {
        email,
        password
      });

      // Check if response contains token and store it in localStorage
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);

        // Redirect to the dashboard after successful login
        navigate('/dashboard');
      } else {
        alert('Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      alert('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="signin-container">
      <div className="signin-form">
        <h2>Sign In</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn-submit">Sign In</button>
        </form>

        <div className="other-links">
          <a href="/forgot-password">Forgot your password?</a>
          <a href="/sign-up">Create a new account</a>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
