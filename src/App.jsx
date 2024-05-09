import { Routes,Route } from 'react-router-dom';
import LoginPage from './components/LoginPage.jsx';
import InsLoginPage from './components/instructor pages/InstructorLoginPage.jsx';
import RegisterPage from './components/RegisterPage.jsx';
import UserDetailsPage from './components/UserDetailsPage.jsx';
import InsDetailsPage from './components/instructor pages/InstructorDetailsPage.jsx';
import AllCourses from './components/AllCourses.jsx';
import CreateComponent from './components/instructor pages/AddCourse.jsx';
import UpdateComponent from './components/instructor pages/EditCourseDetails.jsx';
import AllCoursesIns from './components/instructor pages/AllCoursesIns.jsx';
import PaymentGateway from "./PaymentGateway.jsx";

import ProtectedRoute from './ProtectedRoute.jsx';

function App() {
  return (
    <div>
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/Inslogin" element={<InsLoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/userdetails" element={<UserDetailsPage />} />
            <Route path="/Insdetails" element={<InsDetailsPage />} />
            <Route path="/allcourses" element={<AllCourses />} />
            {/* Use ProtectedRoute for protected routes */}
            <Route path="/course/add" element={<ProtectedRoute element={<CreateComponent />} />} />
            <Route path="/course/:code/edit" element={<ProtectedRoute element={<UpdateComponent />} />} />
            <Route path="/allcoursesIns" element={<ProtectedRoute element={<AllCoursesIns />} />} />
            <Route path="/payment" element={<PaymentGateway/>} />
        </Routes>
    </div>
  )
}


export default App;
