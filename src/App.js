import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import CourseDetails from './components/Courses/CourseDetails';
import TemplateSelector from './components/Courses/TemplateSelector';
import Settings from './components/Courses/CourseSettings';
import SignInPage from './components/Auth/SignInPage'; // Import the login screen
import 'font-awesome/css/font-awesome.min.css'; // For Font Awesome 4
import Global from './styles/global.css';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<SignInPage />} /> {/* Default to login screen */}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/course/:id" element={<CourseDetails />} />
      <Route path="/course/:id/template-selector" element={<TemplateSelector />} />
      <Route path="/course/:id/settings" element={<Settings />} />
    </Routes>
  );
};

export default App;
