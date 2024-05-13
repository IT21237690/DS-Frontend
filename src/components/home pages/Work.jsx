import React from "react";
import PickMeals from "../../assets/new4.png";
import ChooseMeals from "../../assets/selection.png";
import DeliveryMeals from "../../assets/new3.png";

const Work = () => {
  const workInfoData = [
    {
      image: PickMeals,
      title: "Register",
      text: "Hassle Free Registrations",
    },
    {
      image: ChooseMeals,
      title: "Choose",
      text: "100+ Lessions to choose from!",
    },
    {
      image: DeliveryMeals,
      title: "Learn",
      text: "Learn Anytime! Anywhere!",
    },
  ];
  return (
    <div className="work-section-wrapper">
      <div className="work-section-top">
        <p className="primary-subheading">Work</p>
        <h1 className="primary-heading">How It Works</h1>
        <p className="primary-text">
          Register! Choose! Learn!
        </p>
      </div>
      <div className="work-section-bottom">
        {workInfoData.map((data) => (
          <div className="work-section-info" key={data.title}>
            <div className="info-boxes-img-container">
              <img src={data.image} alt="" />
            </div>
            <h2>{data.title}</h2>
            <p>{data.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Work;
