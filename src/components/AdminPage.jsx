import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminPage = () => {
    const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchUnapprovedCourses();
  }, []);

  const fetchUnapprovedCourses = async () => {
    try {
      const response = await axios.get('http://localhost:5002/api/course/allCourses');
      // Extract courses directly from response data
      const unapprovedCourses = response.data.filter(course => !course.isApproved);
      setCourses(unapprovedCourses);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };
  
  
  

  const handleApprove = async (code) => {
    try {
      await axios.put(`http://localhost:5000/api/user/admin/${code}/approve`);
      // After approving, remove the approved course from the list
      setCourses(courses.filter(course => course.code !== code));
    } catch (error) {
      console.error('Error approving course:', error);
    }
  };

  const handleDelete = async (code) => {
    try {
      await axios.delete(`http://localhost:5002/api/course/delete/${code}`);
      // After deleting, remove the deleted course from the list
      setCourses(courses.filter(course => course.code !== code));
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  return (
    <div>
      <h1>Unapproved Courses</h1>
      <table>
        <thead>
          <tr>
            <th>Course Name</th>
            <th>Code</th>
            <th>Description</th>
            <th>Instructor</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.map(course => (
            <tr key={course.code}>
              <td>{course.cname}</td>
              <td>{course.code}</td>
              <td>{course.description}</td>
              <td>{course.instructorId}</td>
              <td>${course.price}</td>
              <td>
                <button onClick={() => handleApprove(course.code)}>Approve</button>
                <button onClick={() => handleDelete(course.code)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
  
};

export default AdminPage;
