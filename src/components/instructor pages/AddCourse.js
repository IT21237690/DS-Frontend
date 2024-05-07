import React, { useState } from 'react';
import axios from 'axios';

const AddCourse = () => {
    const [cname, setCname] = useState('');
    const [code, setCode] = useState('');
    const [description, setDescription] = useState('');
    const [credits, setCredits] = useState('');
    const [faculty, setFaculty] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newCourse = {
            cname,
            code,
            description,
            credits,
            faculty
        };

        try {
            await axios.post('http://localhost:5000/course/add', newCourse, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            // Optionally: redirect or update state to reflect the addition
        } catch (error) {
            console.error('Error adding course:', error);
        }
    };

    return (
        <div>
            <h1>Add New Course</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" value={cname} onChange={e => setCname(e.target.value)} placeholder="Course Name" />
                <input type="text" value={code} onChange={e => setCode(e.target.value)} placeholder="Code" />
                <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Description"></textarea>
                <input type="text" value={credits} onChange={e => setCredits(e.target.value)} placeholder="Credits" />
                <input type="text" value={faculty} onChange={e => setFaculty(e.target.value)} placeholder="Faculty" />
                <button type="submit">Add Course</button>
            </form>
        </div>
    );
};

export default AddCourse;
