// src/components/Auth/ForgotPassword.js
import React, { useState } from 'react';
import axios from 'axios';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8000/api/auth/forgot-password', { email })
      .then(response => {
        alert('Password reset link sent!');
      })
      .catch(error => {
        console.error('Error sending reset link:', error);
      });
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ForgotPasswordPage;
