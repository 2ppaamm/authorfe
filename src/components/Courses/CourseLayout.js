import React from 'react';
import './CourseLayout.css';

const CourseLayout = ({ children }) => (
  <div className="course-layout">
    <main className="course-content">{children}</main>
  </div>
);

export default CourseLayout;
