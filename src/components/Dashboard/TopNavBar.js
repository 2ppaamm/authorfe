// src/components/Dashboard/TopNavBar.js
import React from 'react';

const TopNavBar = () => (
  <div className="top-nav">
    <div className="left">EBIZ Authorade</div>
    <div className="middle">
      <input type="text" placeholder="Search all content" />
      <select>
        <option value="recent">Sort by Recent</option>
        <option value="title">Sort by Title</option>
      </select>
    </div>
    <div className="right">
      <img src="/path/to/profile.jpg" alt="Profile" />
      <div>Account</div>
    </div>
  </div>
);

export default TopNavBar;
