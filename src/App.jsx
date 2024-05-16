import { Routes, Route } from 'react-router-dom';
import "./App.css";

// Import components
import LoginPage from './components/LoginPage.jsx';
import InsLoginPage from './components/instructor pages/InstructorLoginPage.jsx';
import RegisterPage from './components/RegisterPage.jsx';
import UserDetailsPage from './components/UserDetailsPage.jsx';
import InsDetailsPage from './components/instructor pages/InstructorDetailsPage.jsx';
import Home from "./components/home pages/Home.jsx";
import About from "./components/home pages/About.jsx";
import Work from "./components/home pages/Work.jsx";
import Contact from "./components/home pages/Contact.jsx";
import Footer from "./components/home pages/Footer.jsx";
import AllCourses from './components/AllCourses.jsx';
import CreateComponent from './components/instructor pages/AddCourse.jsx';
import UpdateComponent from './components/instructor pages/EditCourseDetails.jsx';
import AllCoursesIns from './components/instructor pages/AllCoursesIns.jsx';
import PaymentGateway from "./PaymentGateway.jsx";
import AdminPage from './components/AdminPage.jsx';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/Inslogin" element={<InsLoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/userdetails" element={<UserDetailsPage />} />
        <Route path="/Insdetails" element={<InsDetailsPage />} />
        <Route path="/allcourses" element={<AllCourses />} />
        <Route path="/course/add" element={<CreateComponent />} />
        <Route path="/editcourse/:courseCode" element={<UpdateComponent />} />
        <Route path="/allcoursesIns" element={<AllCoursesIns />} />
        <Route path="/payment" element={<PaymentGateway />} />
        <Route path="/admin" element={<AdminPage />} />

        {/* Default route for the Home page */}
        <Route path="/*" element={
          <>
            <Home />
            <About />
            <Work />
            <Contact />
            <Footer />
          </>
        } />
      </Routes>
    </div>
  );
}

export default App;
