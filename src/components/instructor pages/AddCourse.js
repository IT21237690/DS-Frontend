import React, { useState } from 'react';
import axios from 'axios';

const AddCourse = () => {
  const [courseData, setCourseData] = useState({
    code: '',
    cname: '',
    description: '',
    credits: '',
    title: '',
    video: null
  });
  const [showDoneMessage, setShowDoneMessage] = useState(false); // New state

  const handleChange = (e) => {
    setCourseData({ ...courseData, [e.target.name]: e.target.value });
  };

  const handleVideoChange = (e) => {
    setCourseData({ ...courseData, video: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('code', courseData.code);
    formData.append('cname', courseData.cname);
    formData.append('description', courseData.description);
    formData.append('credits', courseData.credits);
    formData.append('title', courseData.title);
    formData.append('video', courseData.video);

    try {
      const response = await axios.post('http://localhost:5002/course/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Course added:', response.data);
      setShowDoneMessage(true); // Set state to show done message
      // Handle success, redirection, or any other action here
    } catch (error) {
      console.error('Error adding course:', error);
      // Handle error response here
    }
  };

  return (
    <div>
      <h2>Add Course</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="code">Code:</label>
          <input type="text" id="code" name="code" value={courseData.code} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="cname">Name:</label>
          <input type="text" id="cname" name="cname" value={courseData.cname} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea id="description" name="description" value={courseData.description} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="credits">Credits:</label>
          <input type="text" id="credits" name="credits" value={courseData.credits} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="title">Video Title:</label>
          <input type="text" id="title" name="title" value={courseData.title} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="video">Upload Video:</label>
          <input type="file" id="video" name="video" onChange={handleVideoChange} />
        </div>
        <button type="submit">Add Course</button>
      </form>
      {showDoneMessage && <div>Course added successfully!</div>} {/* Display done message */}
    </div>
  );
};

export default AddCourse;
