import  { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2'


const EditCoursePage = () => {
    const navigate = useNavigate();
    const { courseCode } = useParams(); 
    const [courseData, setCourseData] = useState({
        cname: '',
        description: '',
        title: '',
        price: '',
        video: null
    });

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                console.log(courseCode);
                const response = await axios.get(`http://localhost:9080/api/course/get/${courseCode}`);
                if (response.data.video) {
                    setCourseData(prevState => ({
                        ...prevState,
                        cname: response.data.cname,
                        description: response.data.description,
                        title: response.data.video.title,
                        price: response.data.price
                    }));
                } else {
                    console.log('No videos found for the course');
                }
            } catch (error) {
                console.error('Error fetching course:', error);
            }
        };
    
        fetchCourse();
    }, [courseCode]);

    const handleChange = (e) => {
        setCourseData({ ...courseData, [e.target.name]: e.target.value });
    };

    const handleVideoChange = (e) => {
        setCourseData({ ...courseData, video: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('cname', courseData.cname);
        formData.append('description', courseData.description);
        formData.append('title', courseData.title);
        formData.append('video', courseData.video);
        formData.append('price', courseData.price);


        try {
            await axios.patch(`http://localhost:9080/api/course/update/${courseCode}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            Swal.fire({
                title: "Course Updated Successfully",
                icon: "success"
              }).then((result) => {
                if (result.isConfirmed) {
                  window.location.href = "/allcoursesIns"; // Redirect to the login page
                }
              });
        } catch (error) {
            console.error('Error updating course:', error);
        }
    };
const handleGoBack =()=>{
    navigate('/allcoursesIns')
}
    return (
        <div className="container mx-auto px-4 py-8 bg-gray-300 rounded-lg shadow-lg m-4">
            
  <h1 className="text-3xl font-bold text-blue-900 mb-6 text-center">Edit Course</h1>
  
  <form onSubmit={handleSubmit}>
    
    <div className="mb-4">
      <label htmlFor="cname" className="block text-gray-700 font-semibold mb-2">Course Name:</label>
      <input type="text" id="cname" name="cname" value={courseData.cname} onChange={handleChange} className="w-full px-4 py-2 bg-white rounded-lg shadow-md focus:outline-none focus:ring focus:border-blue-500" />
    </div>
    <div className="mb-4">
      <label htmlFor="description" className="block text-gray-700 font-semibold mb-2">Description:</label>
      <textarea id="description" name="description" value={courseData.description} onChange={handleChange} className="w-full px-4 py-2 bg-white rounded-lg shadow-md focus:outline-none focus:ring focus:border-blue-500"></textarea>
    </div>
    <div className="mb-4">
      <label htmlFor="price" className="block text-gray-700 font-semibold mb-2">Price:</label>
      <input id="price" name="price" value={courseData.price} onChange={handleChange} className="w-full px-4 py-2 bg-white rounded-lg shadow-md focus:outline-none focus:ring focus:border-blue-500"></input>
    </div>
    <div className="mb-4">
      <label htmlFor="title" className="block text-gray-700 font-semibold mb-2">Video Title:</label>
      <input type="text" id="title" name="title" value={courseData.title} onChange={handleChange} className="w-full px-4 py-2 bg-white rounded-lg shadow-md focus:outline-none focus:ring focus:border-blue-500" />
    </div>
    <div className="mb-4">
      <label htmlFor="video" className="block text-gray-700 font-semibold mb-2">Upload Video:</label>
      <input type="file" id="video" name="video" onChange={handleVideoChange} className="w-full px-4 py-2 bg-white rounded-lg shadow-md focus:outline-none focus:ring focus:border-blue-500" />
    </div>
    <button type="submit" className="bg-gray-500 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-gray-600 transition duration-300">Update Course</button>
  </form>
</div>

    );
};

export default EditCoursePage;
