// src/components/Dashboard/ContentList.js
import React from 'react';

const ContentList = ({ courses }) => (
  <div className="content-list">
    {courses.map(course => (
      <div key={course.id} className="course-card">
        <img src={course.image} alt={course.title} />
        <div className="author">
          <img src={course.authorImage} alt={course.author} />
          <div>{course.author}</div>
        </div>
        <div>{course.title}</div>
        <div>{course.numUnits} learning units</div>
        <div>Updated at {new Date(course.updatedAt).toLocaleString()}</div>
      </div>
    ))}
  </div>
);

export default ContentList;
