import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AllCoursesPage = () => {
    const [courses, setCourses] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get('/api/course/allCourses');
                setCourses(response.data);
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };

        fetchCourses();
    }, []);

    const handleThumbnailClick = (videoUrl) => {
        // Play video by setting the videoUrl as the source
        window.location.href = '/video-player?url=' + encodeURIComponent(videoUrl);
    };

    const handleEnroll = (courseCode) => {
        // Assuming you're using React Router for navigation
        navigate(`/payment?course=${courseCode}`);
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
                        <th></th> 
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
                                {course.video.thumbnail && (
                                    <img 
                                        src={`data:image/png;base64,${course.video.thumbnail}`} 
                                        alt={course.cname + ' Thumbnail'} 
                                        style={{ width: '100px', height: 'auto', cursor: 'pointer' }}
                                        onClick={() => handleThumbnailClick(course.video.url)}
                                    />
                                )}
                            </td>
                            <td><button onClick={() => handleEnroll(course.code)}>Enroll</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AllCoursesPage;
