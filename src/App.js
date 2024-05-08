import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import UserDetailsPage from './components/UserDetailsPage';
import AllCourses from './components/AllCourses';
import CreateComponent from './components/instructor pages/AddCourse';
// import UpdateComponent from './components/UpdateComponent';
// import DeleteComponent from './components/DeleteComponent';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/userdetails" element={<UserDetailsPage />} />
        <Route path="/allcourses" element={<AllCourses />} />
        <Route path="/course/add" element={<CreateComponent />} />
        {/* <Route path="/course/:id/edit" element={<UpdateComponent />} />
        <Route path="/course/:id/delete" element={<DeleteComponent />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
