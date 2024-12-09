// src/components/Auth/StartFreeTrialPage.js
import React, { useState } from 'react';
import axios from 'axios';

const StartFreeTrialPage = () => {
  const [formData, setFormData] = useState({
    workEmail: '',
    password: '',
    firstName: '',
    lastName: '',
    organization: '',
    country: '',
    phone: '',
    termsAccepted: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.termsAccepted) {
      axios.post('http://localhost:8000/api/auth/start-trial', formData)
        .then(response => {
          alert('Free trial started!');
          // Redirect to dashboard or login
        })
        .catch(error => {
          console.error('Error starting free trial:', error);
        });
    } else {
      alert('Please accept the terms and privacy policy.');
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Work Email" value={formData.workEmail} onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })} required />
        <input type="password" placeholder="Password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} required />
        <input type="text" placeholder="First Name" value={formData.firstName} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} required />
        <input type="text" placeholder="Last Name" value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} required />
        <input type="text" placeholder="Organization" value={formData.organization} onChange={(e) => setFormData({ ...formData, organization: e.target.value })} required />
        <select value={formData.country} onChange={(e) => setFormData({ ...formData, country: e.target.value })} required>
          <option value="">Select Country</option>
          {/* Add country options here */}
        </select>
        <input type="tel" placeholder="Phone" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} required />
        <label>
          <input type="checkbox" checked={formData.termsAccepted} onChange={() => setFormData({ ...formData, termsAccepted: !formData.termsAccepted })} />
          By clicking, you agree to our terms and privacy notice.
        </label>
        <button type="submit">Start Free Trial</button>
      </form>
    </div>
  );
};

export default StartFreeTrialPage;
