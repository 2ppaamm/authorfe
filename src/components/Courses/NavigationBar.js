import React from 'react';
import { useNavigate } from 'react-router-dom';

const NavigationBar = ({ activeTab, onTabChange, onGoBack, courseTitle, courseId }) => {
  const navigate = useNavigate();

  const handleTemplateClick = () => {
    navigate(`/course/${courseId}/template-selector?title=${encodeURIComponent(courseTitle)}`);
  };

  const handleSettingsClick = () => {
    navigate(`/course/${courseId}/settings?title=${encodeURIComponent(courseTitle)}`);
  };

  return (
    <header className="top-nav">
      <div className="left-nav">
        <button onClick={onGoBack} className="back-btn">
          <i className="fa fa-th"></i>
        </button>
        <h1 className="course-title">{courseTitle}</h1>
      </div>

      <div className="middle-nav">
        <button className="template-btn" onClick={handleTemplateClick}>
          <i className="fa fa-paint-brush"></i>
        </button>
        <button className="settings-btn" onClick={handleSettingsClick}>
          <i className="fa fa-cog"></i> Settings
        </button>
      </div>

      <div className="right-nav">
        <div className="tabs">
          {['share', 'review', 'publish', 'preview'].map((tab) => (
            <button
              key={tab}
              className={activeTab === tab ? 'active-tab' : ''}
              onClick={() => onTabChange(tab)}
            >
              {tab === 'preview' ? (
                <>
                  <i className="fa fa-play"></i> Preview
                </>
              ) : (
                tab.charAt(0).toUpperCase() + tab.slice(1)
              )}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};

export default NavigationBar;
