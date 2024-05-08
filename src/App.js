import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import UserDetailsPage from './components/UserDetailsPage';
import AllCourses from './components/AllCourses';
import CreateComponent from './components/instructor pages/AddCourse';
import UpdateComponent from './components/instructor pages/EditCourseDetails';
import AllCoursesIns from './components/instructor pages/AllCoursesIns';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/userdetails" element={<UserDetailsPage />} />
        <Route path="/allcourses" element={<AllCourses />} />
        <Route path="/course/add" element={<CreateComponent />} />
        <Route path="/course/:code/edit" element={<UpdateComponent />} />
        <Route path="/allcoursesIns" element={<AllCoursesIns />} />
      </Routes>
    </Router>
  );
};

export default App;
