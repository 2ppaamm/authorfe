// src/components/Auth/SignInPage.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const SignInPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8000/api/auth/login', { email, password })
      .then(response => {
        localStorage.setItem('token', response.data.token);
        // Redirect to dashboard after successful login
      })
      .catch(error => {
        console.error('Error logging in:', error);
      });
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <label>
          <input type="checkbox" checked={rememberMe} onChange={() => setRememberMe(!rememberMe)} />
          Remember Me
        </label>
        <button type="submit">Sign In</button>
        <div>
          <Link to="/forgot-password">Forgot your password?</Link>
        </div>
        <div>
          By signing in, you agree to our <Link to="/terms">terms and conditions</Link>.
        </div>
      </form>
    </div>
  );
};

export default SignInPage;
