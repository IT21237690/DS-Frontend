import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';


const AddCourse = () => {
  const [courseData, setCourseData] = useState({
    code: '',
    cname: '',
    description: '',
    price: '',
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
    formData.append('price', courseData.price);
    formData.append('title', courseData.title);
    formData.append('video', courseData.video);
  
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:9080/api/course/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      });
      console.log('Course added:', response.data);
      setShowDoneMessage(true); // Set state to show done message
  
      // Display success message using SweetAlert
      Swal.fire({
        icon: 'success',
        title: 'Course added successfully!',
        showConfirmButton: false,
        timer: 1500
      }).then(() => {
        // Redirect to all courses page
        window.location.href = '/allcourses'; // Adjust the path as needed
      });
    } catch (error) {
      console.error('Error adding course:', error);
      // Handle error response here
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-xl font-semibold mb-4">Add Course</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="code" className="block">Code:</label>
          <input type="text" id="code" name="code" value={courseData.code} onChange={handleChange} className="w-full border border-gray-300 rounded py-2 px-3" />
        </div>
        <div className="mb-4">
          <label htmlFor="cname" className="block">Course Name:</label>
          <input type="text" id="cname" name="cname" value={courseData.cname} onChange={handleChange} className="w-full border border-gray-300 rounded py-2 px-3" />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block">Description:</label>
          <textarea id="description" name="description" value={courseData.description} onChange={handleChange} className="w-full border border-gray-300 rounded py-2 px-3"></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="credits" className="block">Price:</label>
          <input type="text" id="credits" name="price" value={courseData.price} onChange={handleChange} className="w-full border border-gray-300 rounded py-2 px-3" />
        </div>
        <div className="mb-4">
          <label htmlFor="title" className="block">Video Title:</label>
          <input type="text" id="title" name="title" value={courseData.title} onChange={handleChange} className="w-full border border-gray-300 rounded py-2 px-3" />
        </div>
        <div className="mb-4">
          <label htmlFor="video" className="block">Upload Video:</label>
          <input type="file" id="video" name="video" onChange={handleVideoChange} className="w-full border border-gray-300 rounded py-2 px-3" />
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Add Course</button>
      </form>
      {showDoneMessage && <div className="text-green-500">Course added successfully!</div>} {/* Display done message */}
    </div>
  );
  
};

export default AddCourse;
