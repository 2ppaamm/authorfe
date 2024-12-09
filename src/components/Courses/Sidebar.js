import React, { useState } from 'react';
import './Sidebar.css';

const Sidebar = ({ courseStyle, setCourseStyle, onSave }) => {
  const [selectedFontFamily, setSelectedFontFamily] = useState(courseStyle.primary_font_family || 'Raleway');
  const [selectedSecondaryFontFamily, setSelectedSecondaryFontFamily] = useState(courseStyle.secondary_font_family || 'Raleway');
  const [selectedLayout, setSelectedLayout] = useState(courseStyle.layout_settings || 'Default');
  const [selectedCourseNav, setSelectedCourseNav] = useState(courseStyle.course_navigation_placement || 'Left');
  const [selectedLessonHeader, setSelectedLessonHeader] = useState(courseStyle.lesson_header_style || 'Default');
  const [selectedLevel, setSelectedLevel] = useState(courseStyle.level || 'Beginner');
  const [selectedTone, setSelectedTone] = useState(courseStyle.tone || 'Friendly');
  const [selectedLearningStyle, setSelectedLearningStyle] = useState(courseStyle.learning_style || 'Visual');
  const [selectedCitationsRequired, setSelectedCitationsRequired] = useState(courseStyle.citations_required || 'No');
  const [selectedVerbosity, setSelectedVerbosity] = useState(courseStyle.verbosity || 'Medium');
  const [selectedVisualStyle, setSelectedVisualStyle] = useState(courseStyle.visual_style || 'Modern');

  // Handle color input or change
  const handleColorChange = (e, field) => {
    // If it's a checkbox, ensure it returns a boolean
    const value = field === 'citations_required' ? e.target.checked : e.target.value;
    
    setCourseStyle({ ...courseStyle, [field]: value });
  };

  const renderColorPicker = (field, label) => (
    <div className="form-field">
      <div className="color-box" onClick={() => document.getElementById(`${field}-color-picker`).click()}>
        <span>{label}</span>
      </div>
      <input
        type="color"
        id={`${field}-color-picker`}
        value={courseStyle[field] || '#960000'}
        onChange={(e) => handleColorChange(e, field)}
        style={{ display: 'none' }}
      />
      <input
        type="text"
        value={courseStyle[field] || '#960000'}
        onChange={(e) => handleColorChange(e, field)}
        placeholder="#hex color"
      />
    </div>
  );

   // Handle font family change for primary font (Heading 1, 2, 3)
  const handlePrimaryFontFamilyChange = (e) => {
    const newFontFamily = e.target.value;
    setSelectedFontFamily(newFontFamily);
    setCourseStyle({
      ...courseStyle,
      primary_font_family: newFontFamily,
    });
  };

  // Handle font family change for secondary font (Big, Medium, Small, Very Small)
  const handleSecondaryFontFamilyChange = (e) => {
    const newFontFamily = e.target.value;
    setSelectedSecondaryFontFamily(newFontFamily);
    setCourseStyle({
      ...courseStyle,
      secondary_font_family: newFontFamily,
    });
  };

  // Handle font style change for bold, italic, etc.
  const handleFontStyleChange = (heading, style) => {
    const updatedFontStyles = { ...courseStyle.fontStyles };

    if (!updatedFontStyles[heading]) {
      updatedFontStyles[heading] = { bold: false, italic: false, strikethrough: false, fontSize: 16, fontFamily: selectedFontFamily };
    }

    updatedFontStyles[heading][style] = !updatedFontStyles[heading][style];

    setCourseStyle({ ...courseStyle, fontStyles: updatedFontStyles });
  };

  // Handle font size change
  const handleFontSizeChange = (e, field) => {
    const value = e.target.value;
    setCourseStyle({ ...courseStyle, [field]: value });
  };

  // Handle image upload
  const handleImageUpload = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCourseStyle({ ...courseStyle, [field]: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const renderImagePreview = (field, label) => (
    <div className="form-field image-container">
      <label>{label}</label>
      <div className="image-box">
        <img src={courseStyle[field] || 'https://via.placeholder.com/120'} alt={label} className="image-preview" />
      </div>
      <div className="upload-container">
        <input
          type="text"
          value={courseStyle[field] || ''}
          onChange={(e) => handleColorChange(e, field)}
          placeholder="Enter image URL or upload image"
        />
        <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, field)} />
      </div>
    </div>
  );

  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Course Style Settings</h2>

      {/* Category */}
      <div className="form-field">
        <label>Category</label>
        <input
          type="text"
          value={courseStyle.category || '1'}
          onChange={(e) => handleColorChange(e, 'category')}
        />
      </div>

      {/* Color Boxes with Color Inputs */}
      <div className="color-section">
        {renderColorPicker('primary_color', 'Primary Color')}
        {renderColorPicker('secondary_color', 'Secondary Color')}
        {renderColorPicker('supporting_color_1', 'Supporting Color 1')}
        {renderColorPicker('supporting_color_2', 'Supporting Color 2')}
      </div>

      {/* Divider */}
      <div className="divider"></div>

      {/* Font Family Dropdown for Primary Font */}
      <div className="form-field">
        <label>Primary Font Family</label>
        <select value={selectedFontFamily} onChange={handlePrimaryFontFamilyChange}>
          <option value="Raleway">Raleway</option>
          <option value="Arial">Arial</option>
          <option value="Times New Roman">Times New Roman</option>
          <option value="Verdana">Verdana</option>
          <option value="Georgia">Georgia</option>
        </select>
      </div>

      {/* Font Family Dropdown for Secondary Font */}
      <div className="form-field">
        <label>Secondary Font Family</label>
        <select value={selectedSecondaryFontFamily} onChange={handleSecondaryFontFamilyChange}>
          <option value="Raleway">Raleway</option>
          <option value="Arial">Arial</option>
          <option value="Times New Roman">Times New Roman</option>
          <option value="Verdana">Verdana</option>
          <option value="Georgia">Georgia</option>
        </select>
      </div>

      {/* Font Size for Headings */}
      {['heading1_font_size', 'heading2_font_size', 'heading3_font_size'].map((field, idx) => (
        <div key={idx} className="form-field">
          <label>{`Heading ${idx + 1} Font Size`}</label>
          <input
            type="number"
            value={courseStyle[field] || 16}
            onChange={(e) => handleFontSizeChange(e, field)}
            placeholder="Font size"
          />
        </div>
      ))}

      {/* Font Size for Other Text */}
      {['big_font_size', 'medium_font_size', 'small_font_size', 'very_small_font_size'].map((field, idx) => (
        <div key={idx} className="form-field">
          <label>{`${field.replace('_', ' ')} Font Size`}</label>
          <input
            type="number"
            value={courseStyle[field] || 13}
            onChange={(e) => handleFontSizeChange(e, field)}
            placeholder="Font size"
          />
        </div>
      ))}

      {/* Logos */}
      {renderImagePreview('logo', 'Logo')}
      {renderImagePreview('animated_logo', 'Animated Logo')}
      {renderImagePreview('favicon', 'Favicon')}
      {renderImagePreview('start_logo', 'Start Logo')}

      {/* Other Fields */}
      <div className="form-field">
        <label>Course Navigation Placement</label>
        <input
          type="text"
          value={courseStyle.course_navigation_placement || ''}
          onChange={(e) => handleColorChange(e, 'course_navigation_placement')}
        />
      </div>

      <div className="form-field">
        <label>Lesson Header Style</label>
        <input
          type="text"
          value={courseStyle.lesson_header_style || ''}
          onChange={(e) => handleColorChange(e, 'lesson_header_style')}
        />
      </div>

      <div className="form-field">
        <label>AI Text Generation</label>
        <input
          type="text"
          value={courseStyle.AI_text_generation || ''}
          onChange={(e) => handleColorChange(e, 'AI_text_generation')}
        />
      </div>

      <div className="form-field">
        <label>AI Image Generation</label>
        <input
          type="text"
          value={courseStyle.AI_image_generation || ''}
          onChange={(e) => handleColorChange(e, 'AI_image_generation')}
        />
      </div>

      <div className="form-field">
        <label>Course Divider</label>
        <input
          type="text"
          value={courseStyle.course_divider || ''}
          onChange={(e) => handleColorChange(e, 'course_divider')}
        />
      </div>

      <div className="form-field">
        <label>Level</label>
        <input
          type="text"
          value={courseStyle.level || ''}
          onChange={(e) => handleColorChange(e, 'level')}
        />
      </div>

      <div className="form-field">
        <label>Tone</label>
        <input
          type="text"
          value={courseStyle.tone || ''}
          onChange={(e) => handleColorChange(e, 'tone')}
        />
      </div>

      <div className="form-field">
        <label>Learning Style</label>
        <input
          type="text"
          value={courseStyle.learning_style || ''}
          onChange={(e) => handleColorChange(e, 'learning_style')}
        />
      </div>

      <div className="form-field">
        <label>Verbosity</label>
        <input
          type="text"
          value={courseStyle.verbosity || ''}
          onChange={(e) => handleColorChange(e, 'verbosity')}
        />
      </div>

      <div className="form-field">
        <label>Citations Required</label>
        <input
          type="checkbox"
          checked={courseStyle.citations_required || false}  // Ensure it is a boolean
          onChange={(e) => handleColorChange(e, 'citations_required')}
        />
      </div>

      <div className="form-field">
        <label>Visual Style</label>
        <input
          type="text"
          value={courseStyle.visual_style || ''}
          onChange={(e) => handleColorChange(e, 'visual_style')}
        />
      </div>

      {/* Save Button */}
      <button className="save-btn" onClick={onSave}>Save Changes</button>
    </div>
  );
};

export default Sidebar;