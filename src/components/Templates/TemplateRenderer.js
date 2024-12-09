import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';  // Import from react-beautiful-dnd
import './CourseDetails.css';
import NavigationBar from './NavigationBar'; 

const CourseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);  // State for storing course data
  const [activeTab, setActiveTab] = useState('share');
  const [showOptions, setShowOptions] = useState(null);  // State to toggle the visibility of the options dropdown
  const [selectedAuthor, setSelectedAuthor] = useState(null);  // State to track the selected author
  const [newLearningUnit, setNewLearningUnit] = useState(''); // State for new learning unit input
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [isEditingAuthor, setIsEditingAuthor] = useState(false);

  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [currentUser, setCurrentUser] = useState({ firstname: '', lastname: '' }); // To fetch the current user's name


  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8000/api/current_user', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCurrentUser(response.data);
      } catch (error) {
        console.error('Error fetching current user:', error.response || error.message);
      }
    };
      fetchCurrentUser();
  }, []);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:8000/api/courses/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCourse(response.data);
        if (response.data.author) {
          setSelectedAuthor(response.data.author); // Set initial author
        }
      } catch (error) {
        console.error('Error fetching course details:', error);
        alert('Error fetching course details');
      }
    };

    fetchCourseDetails();
  }, [id]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close dropdown if click happens outside of the dropdown or button
      if (!event.target.closest('.unit-actions')) {
        setShowOptions(null);
      }
    };

    // Attach event listener to detect outside clicks
    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleCourseUpdate = async (field, value) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `http://localhost:8000/api/courses/${id}`,
        { [field]: value }, // Update dynamically based on the field
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const response = await axios.get(`http://localhost:8000/api/courses/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCourse(response.data); // Refresh the course data
    } catch (error) {
      console.error('Error updating course:', error.response || error.message);
    }
  };

  const handleAuthorChange = (newAuthor) => {
    setSelectedAuthor(newAuthor);
    if (newAuthor === "no-author") {
      setCourse({ ...course, author: null });
    } else {
      const updatedCourse = { ...course, author: newAuthor };
      setCourse(updatedCourse);
    }
  };

  const handleMoreOptionsClick = (unitId) => {
    setShowOptions((prev) => (prev === unitId ? null : unitId)); // Toggle dropdown for the clicked unit
  };

  const handleChangeIcon = (unitId) => {
    alert(`Change icon for learning unit ${unitId}`);
  };

 // Handle duplicating a learning unit
  const handleDuplicate = async (unitId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `http://localhost:8000/api/learning-units/${unitId}/duplicate`,
        {}, 
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Add the duplicated learning unit to the course state
      setCourse({
        ...course,
        learning_units: [...course.learning_units, response.data],
      });

      alert('Learning unit duplicated');
    } catch (error) {
      console.error('Error duplicating learning unit:', error);
      alert('Error duplicating learning unit');
    }
  };

  const handleCopyToAnotherCourse = (unitId) => {
    alert(`Copy learning unit ${unitId} to another course`);
  };

 const handleDelete = async (unitId) => {
  try {
    const token = localStorage.getItem('token');
    // Use the correct endpoint format with courseId and unitId
    await axios.delete(`http://localhost:8000/api/courses/${id}/learning-units/${unitId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    // Fetch updated course data after deletion
    const response = await axios.get(`http://localhost:8000/api/courses/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    setCourse(response.data); // Update the course state with the new data
    alert(`Deleted learning unit ${unitId}`);
  } catch (error) {
    console.error('Error deleting unit:', error.response || error.message);
    alert('Error deleting learning unit');
  }
};


  const reorderLearningUnits = async (result) => {
    const { source, destination } = result;
    if (!destination) return;
    const updatedLearningUnits = Array.from(course.learning_units);
    const [removed] = updatedLearningUnits.splice(source.index, 1);
    updatedLearningUnits.splice(destination.index, 0, removed);
    setCourse({ ...course, learning_units: updatedLearningUnits });

    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:8000/api/courses/${id}/update-order`, 
        { learning_units: updatedLearningUnits.map((unit, index) => ({
          id: unit.id,
          order: index + 1, // Reassign order based on new position
        })) }, {
          headers: { Authorization: `Bearer ${token}` },
      });

      const response = await axios.get(`http://localhost:8000/api/courses/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCourse(response.data); // Update state with the fresh data from the backend
    } catch (error) {
      console.error('Error updating order:', error);
    }
  };

  const handleAddLearningUnit = async () => {
    if (!newLearningUnit) return; // Don't add if the input is empty
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`http://localhost:8000/api/courses/${id}/learning-units`, 
        { title: newLearningUnit }, 
        { headers: { Authorization: `Bearer ${token}` } });

      // Add the new learning unit to the course data (front-end state)
      setCourse({ ...course, learning_units: [...course.learning_units, response.data] });
      setNewLearningUnit('');  // Reset input field after adding the learning unit
    } catch (error) {
      console.error('Error adding learning unit:', error);
      alert('Error adding learning unit');
    }
  };

  const handleTabChange = (tab) => setActiveTab(tab);

  const handleGoBack = () => navigate('/dashboard');

  if (!course) {
    return <p>Loading course details...</p>;
  }

  const collaborators = course.collaborators ? course.collaborators : [];
  const allCollaborators = [{ id: "no-author", name: "No Author" }, ...collaborators];
  const sortedLearningUnits = course.learning_units.sort((a, b) => a.order - b.order);

  return (
    <div className="course-details-container">
      {/* Call the navigation bar */}
	  <NavigationBar
		courseTitle={course?.title || 'Loading...'}
		activeTab={activeTab}
		onTabChange={setActiveTab}
		onGoBack={() => navigate('/dashboard')}
	   />

      {/* Course Title, Author Image & Dropdown */}
      <div className="course-header">
		{/* Editable Title */}
		<h2 className="course-title-centered">
		  {isEditingTitle ? (
		    <input
		      type="text"
		      value={newTitle}
		      onChange={(e) => setNewTitle(e.target.value)}
		      onBlur={() => {
		        if (newTitle !== course.title) {
		          handleCourseUpdate('title', newTitle); // Only call if there's a change
		        }
		        setIsEditingTitle(false); // Exit edit mode
		      }}
		      className="course-title-input"
		      autoFocus
		    />
		  ) : (
		    <h2
			    className="course-title-centered"
			    onClick={() => {
		        setIsEditingTitle(true);
		        setNewTitle(course.title); // Set initial value
		      }}
		    >
		      {course.title}
		    </h2>
		  )}
		</h2>

         <div className="author-info">
          <img src={course.author_image} alt="Author" className="author-image" />
          <p>{course.author_name}</p>
          <select onChange={(e) => handleAuthorChange(e.target.value)} value={selectedAuthor}>
            {allCollaborators.map((collaborator, index) => (
              <option key={index} value={collaborator.id}>
                {collaborator.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <hr className="course-divider" />

    {/* Editable Description */}
	<div className="course-description">
	  {isEditingDescription ? (
	    <textarea
	      value={newDescription}
	      onChange={(e) => setNewDescription(e.target.value)}
	      onBlur={() => {
	        if (newDescription !== course.description) {
	          handleCourseUpdate('description', newDescription); // Only call if there's a change
	        }
	        setIsEditingDescription(false); // Exit edit mode
	      }}
	      className="course-description-input" // Match the description style
	      autoFocus
	    />
	  ) : (
	    <p
	      className="course-description"
	      onClick={() => {
	        setIsEditingDescription(true);
	        setNewDescription(course.description); // Set initial value
	      }}
	    >
	      {course.description}
	    </p>
	  )}
 	</div>


      {/* Learning Units Section */}
      <div className="learning-units">
        <h3>Learning Units</h3>
        <DragDropContext onDragEnd={reorderLearningUnits}>
          <Droppable droppableId="droppable">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {sortedLearningUnits.map((unit, index) => (
                  <Draggable key={unit.id} draggableId={unit.id.toString()} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="learning-unit"
                      >
                        <div className="unit-info">
                          <i className="fa fa-bars"></i>
                          <p>{unit.title}</p>
                        </div>

					  {/* Right side: Edit Content and More options */}
					  <div className="unit-actions">
					    <button className="edit-content-btn" onClick={() => alert('Edit Content for: ' + unit.LU_code)}>
					      Edit Content
					    </button>

					    {/* More options icon */}
						<button
						  className="more-options-icon"
						  onClick={() => handleMoreOptionsClick(unit.id)}
						>
						  <i className="fa fa-ellipsis-h"></i>
						</button>

					    {/* Options dropdown */}
					    {showOptions === unit.id && (
					      <div className="options-dropdown">
					        <button onClick={() => handleChangeIcon(unit.id)}>Change Icon</button>
					        <button onClick={() => handleDuplicate(unit.id)}>Duplicate</button>
					        <button onClick={() => handleCopyToAnotherCourse(unit.id)}>Copy to Another Course</button>
					        <button onClick={() => handleDelete(unit.id)}>Delete</button>
					      </div>
					    )}
					  </div>                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
		{/* New Learning Unit Input */}
		<div className="learning-unit new-unit">
		  <div className="unit-info">
		    <input
		      type="text"
		      value={newLearningUnit}
		      onChange={(e) => setNewLearningUnit(e.target.value)}
		      placeholder="+ Add a new learning unit"
		      onKeyPress={(e) => { if (e.key === 'Enter') handleAddLearningUnit(); }}
		    />
		  </div>
		</div>
    </div>
  );
};

export default CourseDetails;
