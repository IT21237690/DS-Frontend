import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';


const AllCoursesPage = () => {
    const [courses, setCourses] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get('http://localhost:5002/api/course/allCourses');
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

    const handleDownload = async (courseCode) => {
        try {

            const token = localStorage.getItem('token');
            const decodedToken = jwtDecode(token);
            const sid = decodedToken.sid;

            // Call the download route on the server
            const response = await axios.get(`http://localhost:5002/api/course/download/${sid}/${courseCode}`, {
                responseType: 'blob', // Set responseType to 'blob' for binary data
            });

            // Create a temporary URL for the blob response
            const url = window.URL.createObjectURL(new Blob([response.data]));

            // Create a link element to trigger the download
            const link = document.createElement('a');
            link.href = url;

            // Extract the filename from the download URL
            const filename = extractFilenameFromUrl(response.headers['content-disposition']);

            // Set the filename for the downloaded file
            link.setAttribute('download', filename);

            // Append the link to the document body and trigger the click event
            document.body.appendChild(link);
            link.click();

            // Clean up the temporary URL
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error downloading video:', error);
        }
    };

    // Function to extract filename from content-disposition header
    const extractFilenameFromUrl = (contentDisposition) => {
        const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
        const matches = filenameRegex.exec(contentDisposition);
        if (matches != null && matches[1]) {
            return matches[1].replace(/['"]/g, '');
        }
        return 'download.mp4'; // Default filename
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
                            <td>
                                <button onClick={() => handleEnroll(course.code)}>Enroll</button>
                                <button onClick={() => handleDownload(course.code)}>Download</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AllCoursesPage;
