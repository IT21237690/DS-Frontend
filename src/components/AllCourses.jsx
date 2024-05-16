import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import ErrorModal from './ErrorModal';


const AllCoursesPage = () => {
    const [courses, setCourses] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get('http://localhost:9080/api/course/allCourses');
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
          const response = await axios.get(`http://localhost:9080/api/course/download/${sid}/${courseCode}`, {
              responseType: 'blob', // Set responseType to 'blob' for binary data
          });
  
          // If the response is successful, proceed with downloading the file
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          const filename = extractFilenameFromUrl(response.headers['content-disposition']);
          link.setAttribute('download', filename);
          document.body.appendChild(link);
          link.click();
          window.URL.revokeObjectURL(url);
      } catch (error) {
          if (error.response && error.response.status === 409) {
              // Display a pop-up message if user needs to enroll in the course for download
              setShowModal(true);
          } else {
              console.error('Error downloading video:', error);
          }
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
        navigate('/userdetails'); 
    }

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
      <div className="relative">
        <button onClick={handleHome} className="absolute top-4 left-4 bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-gray-500 transition duration-300">
          BACK
        </button>
        <div className="container mx-auto px-4 py-8 bg-gradient-to-r from-cyan-900 to-cyan-800 bg-opacity-50 rounded-2xl m-8 min-h-screen">
          <h1 className="text-3xl font-bold text-gray-100 mb-8 text-center">All Courses</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {courses.map(course => (
              <div key={course._id} className="bg-white rounded-lg shadow-lg p-6">
                <div className="mb-4 aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
                  {course.video.thumbnail && (
                    <img 
                      src={`data:image/png;base64,${course.video.thumbnail}`} 
                      alt={`${course.cname} Thumbnail`} 
                      className="object-cover cursor-pointer"
                    />
                  )}
                </div>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">{course.cname}</h2>
                <p className="text-gray-600 mb-2">{course.code}</p>
                <p className="text-gray-600 mb-2">{course.description}</p>
                <p className="text-gray-600 mb-4">Price: {course.price}</p>
                <div className="flex justify-between">
                  <button className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition duration-300" onClick={() => handleEnroll(course.code)}>Enroll</button>
                  <button className="bg-gray-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-gray-600 transition duration-300" onClick={() => handleDownload(course.code)}>Download</button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <ErrorModal show={showModal} onClose={handleCloseModal} />
      </div>
    );        
};

export default AllCoursesPage;
