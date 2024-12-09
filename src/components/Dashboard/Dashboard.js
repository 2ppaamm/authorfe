import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';  // For navigation
import axios from 'axios';  // For making API calls
import './Dashboard.css';  // Import the CSS file

const Dashboard = () => {
  const [courses, setCourses] = useState([]);  // State for storing courses
  const [searchTerm, setSearchTerm] = useState('');  // State for search
  const [sortOrder, setSortOrder] = useState('recent');  // State for sorting
  const navigate = useNavigate();  // Navigation hook
  const token = localStorage.getItem('token');  // Get token from localStorage

  // Function to fetch courses from the backend
  const fetchCourses = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/user/courses', {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log('Fetched courses:', response.data); // Log the response to verify
      setCourses(response.data); // Set the courses state with the response data
    } catch (error) {
      console.error('Error fetching courses:', error);
      alert('Error fetching courses');
    }
  };

  useEffect(() => {
    // If there's no token, redirect to login page
    if (!token) {
      navigate('/');
    } else {
      fetchCourses();  // Fetch courses once the component is mounted
    }
  }, [token, navigate]);  // Re-run the effect if token or navigate changes

  // Sort courses by recent or title
  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  // Filter courses based on the search term
  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sorting the courses based on selected order
  const sortedCourses = filteredCourses.sort((a, b) => {
    if (sortOrder === 'recent') {
      return new Date(b.updatedAt) - new Date(a.updatedAt);  // Sort by recent
    } else {
      return a.title.localeCompare(b.title);  // Sort by title
    }
  });

  const handleCourseClick = (courseId) => {
    // Navigate to the CourseDetails page and pass the course ID
    navigate(`/course/${courseId}`);
  };

  return (
    <div className="dashboard-container">
      {/* Top Navigation Bar */}
      <header className="top-nav">
        <div className="logo">EBIZ Authorade</div>
        <nav className="nav-links">
          <a href="/dashboard">Dashboard</a>
          <a href="/content">Content</a>
          <a href="/question-banks">Question Banks</a>
        </nav>
        <div className="profile">
          <img src="profile-picture.png" alt="User" className="profile-pic" />
          <div className="dropdown">
            <button className="dropdown-btn">Account</button>
            <div className="dropdown-content">
              <a href="/profile">Profile</a>
              <a href="/" onClick={() => localStorage.removeItem('token')}>Logout</a>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Layout */}
      <div className="main-content">
        {/* Left Sidebar */}
        <aside className="sidebar">
          <button className="create-btn">+ Create New</button>
          <nav className="sidebar-links">
            <a href="/all-content">All Content</a>
            <a href="/shared-with-me">Shared with Me</a>
            <a href="/my-folders">My Folders</a>
          </nav>
        </aside>

        {/* Right Section: Courses */}
        <section className="courses-section">
          <div className="courses-grid">
            {sortedCourses.length === 0 ? (
              <p>No courses found</p>
            ) : (
              sortedCourses.map((course) => (
                <div key={course.id} className="course-card" onClick={() => handleCourseClick(course.id)}>
                  <img src={course.image} alt={course.title} className="course-image" />
                  <div className="course-info">
                    <h3>{course.title}</h3>
                    <p>Author: {course.author}</p>
                    <p>{course.numUnits} Learning Units</p>
                    <p>Updated at {new Date(course.updatedAt).toLocaleString()}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
