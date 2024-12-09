import React from 'react';

const CoursePreview = ({ courseStyle, course }) => {
  if (!course) return <p>Loading course preview...</p>;

  const { 
    primary_color, 
    secondary_color, 
    primary_font_family, 
    secondary_font_family, 
    heading1_font_size, 
    heading2_font_size, 
    heading3_font_size, 
    big_font_size, 
    medium_font_size 
  } = courseStyle;

  const coursePreviewStyle = {
    backgroundColor: primary_color,
    color: secondary_color,
    fontFamily: primary_font_family,
  };

  const headingStyle = {
    fontFamily: secondary_font_family,
  };

  return (
    <div className="course-preview" style={coursePreviewStyle}>
      <div className="course-header">
        <h1 style={{ ...headingStyle, fontSize: `${heading1_font_size}px` }}>{course.title}</h1>
        <h2 style={{ ...headingStyle, fontSize: `${heading2_font_size}px` }}>{course.subtitle}</h2>
        <h3 style={{ ...headingStyle, fontSize: `${heading3_font_size}px` }}>Course Overview</h3>
      </div>

      <div className="course-description" style={{ fontSize: `${medium_font_size}px` }}>
        <p>{course.description}</p>
      </div>

      <div className="learning-units">
        <h3>Learning Units</h3>
        <ul>
          {course.learning_units.map((unit, index) => (
            <li key={unit.id} style={{ fontSize: `${big_font_size}px` }}>
              {unit.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CoursePreview;
