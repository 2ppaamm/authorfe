import React from 'react';
import { useSearchParams, useParams } from 'react-router-dom';
import CourseLayout from './CourseLayout'; // Ensure CourseLayout is imported

const CourseSettings = () => {
  const { id } = useParams(); // Course ID
  const [searchParams] = useSearchParams();
  const courseTitle = searchParams.get('title'); // Course Title

  return (
    <CourseLayout
      courseTitle={courseTitle}
      activeTab="settings"
      onTabChange={(tab) => console.log(tab)} // Handle tab changes
      onGoBack={() => window.history.back()}
    >
      <div>
        <h2>Course Settings for {courseTitle}</h2>
        {/* Prefilled form for editing course settings */}
      </div>
    </CourseLayout>
  );
};

export default CourseSettings;
