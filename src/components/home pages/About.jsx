import React from "react";
import AboutBackground from "../../assets/about-background.png";
import AboutBackgroundImage from "../../assets/new1.png";
import { BsFillPlayCircleFill } from "react-icons/bs";

const About = () => {
  return (
    <div className="about-section-container">
      <div className="about-background-image-container">
        <img src={AboutBackground} alt="" />
      </div>
      <div className="about-section-image-container">
        <img src={AboutBackgroundImage} alt="" />
      </div>
      <div className="about-section-text-container">
        <p className="primary-subheading">About</p>
        <h1 className="primary-heading">
          "Education is the most powerful weapon which you can use to change the world."
        </h1>
        <p className="primary-text">
          Wishwa Institute is dedicated to revolutionizing education through innovative online learning experiences. 
          We strive to empower learners globally by providing accessible, 
          personalized, and interactive courses that inspire growth and foster success!
        </p>
        <p className="primary-text">
          Live the experience!
        </p>
        <div className="about-buttons-container">
        <a href="https://www.youtube.com/"target="_blank" rel="noopener noreferrer"style={{ textDecoration: "none" }}>
            <button className="secondary-button">Learn More</button>
          </a>
          <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
            <button className="watch-video-button">
              <BsFillPlayCircleFill /> Watch Video
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;
