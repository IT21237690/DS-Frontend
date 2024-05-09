import  { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import { toast } from 'react-toastify';

const EditCoursePage = () => {
    const navigate = useNavigate();
    const { code } = useParams(); 
    const [courseData, setCourseData] = useState({
        cname: '',
        description: '',
        credits: '',
        title: '',
        video: null
    });

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                console.log(code);
                const response = await axios.get(`http://localhost:5002/course/get/${code}`);
                if (response.data.video) {
                    setCourseData(prevState => ({
                        ...prevState,
                        cname: response.data.cname,
                        description: response.data.description,
                        credits: response.data.credits,
                        title: response.data.video.title
                    }));
                } else {
                    console.log('No videos found for the course');
                }
            } catch (error) {
                console.error('Error fetching course:', error);
            }
        };
    
        fetchCourse();
    }, [code]);

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
        formData.append('credits', courseData.credits);
        formData.append('title', courseData.title);
        formData.append('video', courseData.video);

        try {
            await axios.patch(`http://localhost:5002/course/update/${code}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            toast.success('Course updated successfully!');
            navigate('/allcoursesIns');
        } catch (error) {
            console.error('Error updating course:', error);
        }
    };

    return (
        <div>
            <h1>Edit Course</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="cname">Course Name:</label>
                    <input type="text" id="cname" name="cname" value={courseData.cname} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="description">Description:</label>
                    <textarea id="description" name="description" value={courseData.description} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="credits">Credits:</label>
                    <input type="text" id="credits" name="credits" value={courseData.credits} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="title">Video Title:</label>
                    <input type="text" id="title" name="title" value={courseData.title} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="video">Upload Video:</label>
                    <input type="file" id="video" name="video" onChange={handleVideoChange} />
                </div>
                <button type="submit">Update Course</button>
            </form>
        </div>
    );
};

export default EditCoursePage;
