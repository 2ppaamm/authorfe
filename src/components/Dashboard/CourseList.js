import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import ExportScormButton from './ExportScormButton';

const CourseList = () => {
    const [courses, setCourses] = useState([]);
    const { authToken } = useContext(AuthContext);

    useEffect(() => {
        fetch('/api/courses', {
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        })
            .then((res) => res.json())
            .then((data) => setCourses(data))
            .catch((err) => console.error('Failed to fetch courses:', err));
    }, [authToken]);

    return (
        <div>
            <h1>My Courses</h1>
            {courses.length > 0 ? (
                courses.map((course) => (
                    <div key={course.id} style={{ marginBottom: '20px' }}>
                        <h3>{course.title}</h3>
                        <p>{course.description}</p>
                        <ExportScormButton courseId={course.id} />
                    </div>
                ))
            ) : (
                <p>No courses available.</p>
            )}
        </div>
    );
};

export default CourseList;
