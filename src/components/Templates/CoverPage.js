import React from 'react';

const CoverPage = ({ courseData }) => {
  const { coverImage, courseTitle, courseDescription, author, authorImage } = courseData;

  return (
    <div className="cover-page">
      {/* Cover Image */}
      <div className="cover-image" style={{ backgroundImage: `url(${coverImage})` }}></div>

      {/* Course Title */}
      <h1 className="course-title">{courseTitle}</h1>

      {/* Author */}
      <div className="author-info">
        <img className="author-image" src={authorImage} alt="Author" />
        <span className="author-name">{author}</span>
      </div>

      {/* Course Description */}
      <p className="course-description">{courseDescription}</p>
    </div>
  );
};

export default CoverPage;
