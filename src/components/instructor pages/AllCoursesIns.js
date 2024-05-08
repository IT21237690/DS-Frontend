import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AllCoursesInsPage = () => {
    const [courses, setCourses] = useState([]);

    const fetchCourses = async () => {
        try {
            const response = await axios.get('http://localhost:5002/course/allCourses');
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
            await axios.delete(`http://localhost:5002/course/delete/${code}`);
            // After successful deletion, refetch the courses to update the list
            fetchCourses();
        } catch (error) {
            console.error('Error deleting course:', error);
        }
    };

    return (
        <div>
            <h1>All Courses</h1>
            <table>
                <thead>
                    <tr>
                        <th>Course Name</th>
                        <th>Code</th>
                        <th>Description</th>
                        <th>Credits</th>
                        <th>Thumbnail</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {courses.map(course => (
                        <tr key={course._id}>
                            <td>{course.cname}</td>
                            <td>{course.code}</td>
                            <td>{course.description}</td>
                            <td>{course.credits}</td>
                            <td>
                                {course.videos.length > 0 && (
                                    <img src={course.videos[0].thumbnailUrl} alt={course.videos[0].title} style={{ width: '100px', height: 'auto' }} />
                                )}
                                {!course.videos.length && (
                                    <p>No videos available</p>
                                )}
                            </td>
                            <td>
                                <button onClick={() => handleDelete(course.code)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AllCoursesInsPage;
