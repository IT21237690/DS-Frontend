import React, { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminPage = () => {
    const [courses, setCourses] = useState([]);
    const navigate = useNavigate(); 


  useEffect(() => {
    fetchUnapprovedCourses();
  }, []);

  const fetchUnapprovedCourses = async () => {
    try {
      const response = await axios.get('http://localhost:9080/api/course/allCourses');
      // Extract courses directly from response data
      const unapprovedCourses = response.data.filter(course => !course.isApproved);
      setCourses(unapprovedCourses);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };
  
  
  

  const handleApprove = async (code) => {
    try {
      await axios.put(`http://localhost:9080/api/user/admin/${code}/approve`);
      // After approving, remove the approved course from the list
      setCourses(courses.filter(course => course.code !== code));
    } catch (error) {
      console.error('Error approving course:', error);
    }
  };

  const handleDelete = async (code) => {
    try {
      await axios.delete(`http://localhost:9080/api/course/delete/${code}`);
      // After deleting, remove the deleted course from the list
      setCourses(courses.filter(course => course.code !== code));
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  const handleLogout = () => {
    // Clear any user authentication state (e.g., clear token from local storage)
    localStorage.removeItem('token');
    
    // Redirect the user to the login page
    navigate('/login');
  };
  

  return (
    <div>
      {/* Navigation Bar */}
      <nav className="bg-gray-800 p-4 mb-8">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-white text-xl font-bold">ADMIN Dashboard</h1>
          <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={handleLogout}>Logout</button>
        </div>
      </nav>
  
      {/* Course Table */}
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold mb-4">Unapproved Courses</h2>
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-800">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2">Course Name</th>
                <th className="px-4 py-2">Code</th>
                <th className="px-4 py-2">Description</th>
                <th className="px-4 py-2">Instructor</th>
                <th className="px-4 py-2">Price</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {courses.map(course => (
                <tr key={course.code} className="border-t border-gray-400">
                  <td className="px-4 py-2">{course.cname}</td>
                  <td className="px-4 py-2">{course.code}</td>
                  <td className="px-4 py-2">{course.description}</td>
                  <td className="px-4 py-2">{course.instructorId}</td>
                  <td className="px-4 py-2">{course.price}</td>
                  <td className="px-4 py-2 flex">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2" onClick={() => handleApprove(course.code)}>Approve</button>
                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded" onClick={() => handleDelete(course.code)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
  
  
  
};

export default AdminPage;
