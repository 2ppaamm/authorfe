import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // For navigation
import './SignInPage.css';  // Import the styles for the sign-in page

const SignInPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();  // Hook for navigation

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Example: Simulating a login API request and setting the token
    try {
      // Make your login API request here
      // Assuming the response contains a token (you will get the token from your API response)
      const response = { token: 'fake-token' };

      // Store token in localStorage for future requests
      localStorage.setItem('token', response.token);
      
      // Navigate to the Dashboard after successful login
      navigate('/dashboard');
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
