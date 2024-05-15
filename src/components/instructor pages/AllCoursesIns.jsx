import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import axios from 'axios';

const AllCoursesInsPage = () => {
    const [courses, setCourses] = useState([]);

    const fetchCourses = async () => {
        try {
            const response = await axios.get('http://localhost:5002/api/course/allCourses');
            setCourses(response.data);
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    };

    useEffect(() => {
        fetchCourses();
    }, []);

    const handleDelete = async (code) => {
        try {
            await axios.delete(`http://localhost:5002/api/course/delete/${code}`);
            // After successful deletion, refetch the courses to update the list
            fetchCourses();
        } catch (error) {
            console.error('Error deleting course:', error);
        }
    };

    return (
        <div className="relative">
  <button className="absolute mt-4 ml-8 bg-gray-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-gray-600 transition duration-300" onClick={() => handleNavigateToHome()}>
    Home
  </button>
  <div>
    <h1 className="  text-3xl font-bold text-gray-800 mb-4 text-center">All Courses</h1>
    <div className="overflow-x-auto container m-8 bg-gray-300 rounded-2xl">
      <table className="w-full whitespace-nowrap">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-3 px-4 font-semibold text-gray-700">Course Name</th>
            <th className="py-3 px-4 font-semibold text-gray-700">Code</th>
            <th className="py-3 px-4 font-semibold text-gray-700">Description</th>
            <th className="py-3 px-4 font-semibold text-gray-700">Thumbnail</th>
            <th className="py-3 px-4 font-semibold text-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {courses.map(course => (
            <tr key={course._id}>
              <td className="py-4 px-4">{course.cname}</td>
              <td className="py-4 px-4">{course.code}</td>
              <td className="py-4 px-4">{course.description}</td>
              <td className="py-4 px-4">
                {course.video && course.video.thumbnailUrl ? (
                  <img src={course.video.thumbnailUrl} alt={course.video.title} className="w-24 h-auto" />
                ) : (
                  <p>No video available</p>
                )}
              </td>
              <td className="py-4 px-4">
                <button className="bg-red-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md mr-2 hover:bg-red-600 transition duration-300" onClick={() => handleDelete(course.code)}>Delete</button>
                <Link to={`/editcourse/${course.code}`}>
                  <button className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition duration-300">Edit</button>
                </Link>
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

export default AllCoursesInsPage;
