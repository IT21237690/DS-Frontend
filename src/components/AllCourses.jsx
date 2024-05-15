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
                // Filter the courses to display only approved ones
                const approvedCourses = response.data.filter(course => course.isApproved);
                setCourses(approvedCourses);
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

    const handleHome = () => {
        navigate('/home'); 
      }

    return (
        
        <div className="relative">
        <button onClick={handleHome} className="absolute mt-4 ml-8 bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-gray-500 transition duration-300" >
          Home
        </button>
        <div className="container mx-auto px-4 py-8 bg-gradient-to-r bg-cyan-900 bg-opacity-50 rounded-2xl m-8 h-svh">
          <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">All Courses</h1>
          <div className="overflow-x-auto">
            <table className="w-full whitespace-nowrap overflow-auto">
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
                      {course.video.thumbnail && (
                        <img 
                          src={`data:image/png;base64,${course.video.thumbnail}`} 
                          alt={course.cname + ' Thumbnail'} 
                          className="w-24 h-auto cursor-pointer"
                          onClick={() => handleThumbnailClick(course.video.url)}
                        />
                      )}
                    </td>
                    <td className="py-4 px-4">
                      <button className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md mr-2 hover:bg-blue-600 transition duration-300" onClick={() => handleEnroll(course.code)}>Enroll</button>
                      <button className="bg-gray-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-gray-600 transition duration-300" onClick={() => handleDownload(course.code)}>Download</button>
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

export default AllCoursesPage;
