import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
<<<<<<< Updated upstream
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

=======
        <div>
            <h1>All Courses</h1>
            <table>
                <thead>
                    <tr>
                        <th>Course Name</th>
                        <th>Code</th>
                        <th>Description</th>
                        <th>Thumbnail</th>
                        <th>Approved</th> {/* New column for approved status */}
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {courses.map(course => (
                        <tr key={course._id}>
                            <td>{course.cname}</td>
                            <td>{course.code}</td>
                            <td>{course.description}</td>
                            <td>
                            {course.video.thumbnail && (
                                    <img 
                                        src={`data:image/png;base64,${course.video.thumbnail}`} 
                                        alt={course.cname + ' Thumbnail'} 
                                        style={{ width: '100px', height: 'auto', cursor: 'pointer' }}
                                        onClick={() => handleThumbnailClick(course.video.url)}
                                    />
                                )}
                            </td>
                            <td>{course.isApproved ? 'Approved' : 'Not Approved'}</td> {/* Display approved status */}
                            <td>
                                <button onClick={() => handleDelete(course.code)}>Delete</button>
                                <Link to={`/editcourse/${course.code}`}>
                                    <button>Edit</button>
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
>>>>>>> Stashed changes
    );
};

export default AllCoursesInsPage;
