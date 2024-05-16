import BannerBackground from "../../assets/home-banner-background.png";
import BannerImage from "../../assets/new2.png";
import Navbar from "./Navbar";
import { FiArrowRight } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';


const Home = () => {

  const navigate = useNavigate(); 


  const handleRegister = () => {
    navigate('/register'); 
  }

  return (
    <div className="home-container">
      <Navbar />
      <div className="home-banner-container">
        <div className="home-bannerImage-container">
          <img src={BannerBackground} alt="" />
        </div>
        <div className="home-text-section">
          <h1 className="primary-heading">
            Online Learning without Limits
          </h1>
          <p className="primary-text">
          Empowering learners worldwide with personalized, interactive, and accessible education!
          </p>
          <button className="secondary-button" onClick={handleRegister}>
            Register Now!<FiArrowRight />{" "}
          </button>
        </div>
        <div className="home-image-section">
          <img src={BannerImage} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Home;
