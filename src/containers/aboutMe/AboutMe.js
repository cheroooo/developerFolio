import React from "react";
import {Link} from "react-router-dom";
import FallingPetals from "../../components/fallingPetals/FallingPetals";
import "./AboutMe.scss";

export default function AboutMe() {
  return (
    <>
    <FallingPetals count={60} duration={5000} startOnScreen={true} />
    <div className="about-page">
      <div className="about-main">
        <h1 className="about-heading">About Me</h1>
      </div>
      <div className="about-back-container">
        <Link to="/" className="back-btn">← Home Page</Link>
      </div>
    </div>
    </>
  );
}
