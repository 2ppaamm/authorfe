import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from './Sidebar';
import CoursePreview from './CoursePreview';
import axios from 'axios';
import './TemplateSelector.css';

const TemplateSelector = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Getting the course ID from the URL params

  const [selectedDevice, setSelectedDevice] = useState('laptop');
  const [course, setCourse] = useState(null);
  const [courseStyle, setCourseStyle] = useState({
    primary_color: '#960000',
    secondary_color: '#d0acac',
    supporting_color_1: '#000',
    supporting_color_2: '#fff',
    primary_font_color: '#000',
    secondary_font_color: '#444444',
    primary_font_family: 'Raleway',
    secondary_font_family: 'Raleway',
    heading1_font_size: 16,
    heading2_font_size: 14,
    heading3_font_size: 13,
    big_font_size: 13,
    medium_font_size: 11,
    small_font_size: 10,
    very_small_font_size: 8,
    layout_settings: '',
    logo: '',
    animated_logo: '',
    favicon: '',
    start_logo: '',
    course_navigation_placement: '',
    lesson_header_style: '',
    AI_text_generation: '',
    AI_image_generation: '',
    course_divider: '',
    level: '',
    tone: '',
    learning_style: '',
    verbosity: '',
    citations_required: false,
    visual_style: '',
  });

  const [isLoading, setIsLoading] = useState(true); // Track loading state

  const devices = [
    { id: 'laptop', label: 'Laptop', icon: 'fa-laptop' },
    { id: 'tablet-portrait', label: 'Tablet Portrait', icon: 'fa-tablet' },
    { id: 'tablet-landscape', label: 'Tablet Landscape', icon: 'fa-tablet-alt' },
    { id: 'mobile-portrait', label: 'Mobile Portrait', icon: 'fa-mobile' },
    { id: 'mobile-landscape', label: 'Mobile Landscape', icon: 'fa-mobile-alt' },
    { id: 'desktop', label: 'Desktop', icon: 'fa-desktop' },
    { id: 'tv', label: 'TV', icon: 'fa-tv' },
  ];

  useEffect(() => {
    fetchCourseStyle();
    fetchCourseData();
  }, []);

  const fetchCourseStyle = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `http://localhost:8000/api/courses/${id}/course_style`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      // Update courseStyle state with fetched data for all fields
      if (response.data && response.data.length > 0) {
        setCourseStyle(response.data[0]);
      }
    } catch (error) {
      console.error('Error fetching course style:', error.response || error.message);
    } finally {
      setIsLoading(false); // Stop loading when fetch completes
    }
  };

  const fetchCourseData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:8000/api/courses/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCourse(response.data);
    } catch (error) {
      console.error('Error fetching course data:', error);
    }
  };

  const handleColorChange = (colorType, value) => {
    setCourseStyle((prevStyle) => ({ ...prevStyle, [colorType]: value }));
  };

  const onSave = async (updatedCourseStyle) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `http://localhost:8000/api/courses/${id}/course_style`,
        updatedCourseStyle, // Send the updated courseStyle object
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert('Course style saved successfully!');
    } catch (error) {
      console.error('Error saving course style:', error.response || error.message);
      alert('Failed to save course style.');
    }
  };

  const renderDevices = () =>
    devices.map((device) => (
      <button
        key={device.id}
        className={selectedDevice === device.id ? 'active-tab' : ''}
        onClick={() => setSelectedDevice(device.id)}
      >
        <i className={`fa ${device.icon} ${device.flip ? 'rotate-90' : ''}`}></i>
      </button>
    ));

  return (
    <div className="template-container">
      {/* Top Navigation */}
      <header className="top-nav">
        <div className="left-nav">
          <button onClick={() => navigate(`/course/${id}`)} className="back-btn">
            <i className="fa fa-arrow-left"></i>
          </button>
          <h1 className="course-title">Template Selector</h1>
        </div>
        <div className="middle-nav">
          <p>Template Selector</p>
        </div>
        <div className="right-nav">{renderDevices()}</div>
      </header>

      {/* Main Content Layout */}
      <div className="main-content">
        <Sidebar courseStyle={courseStyle} setCourseStyle={setCourseStyle} onSave={onSave} />
        <CoursePreview courseStyle={courseStyle} course={course} />
      </div>
    </div>
  );
};

export default TemplateSelector;
