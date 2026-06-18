import React, {useContext} from "react";
import {Link} from "react-router-dom";
import {Fade} from "react-reveal";
import emoji from "react-easy-emoji";
import "./Greeting.scss";
import landingPerson from "../../assets/lottie/landingPerson";
import DisplayLottie from "../../components/displayLottie/DisplayLottie";
import SocialMedia from "../../components/socialMedia/SocialMedia";
import Button from "../../components/button/Button";
import {illustration, greeting} from "../../portfolio";
import StyleContext from "../../contexts/StyleContext";

export default function Greeting() {
  const {isDark} = useContext(StyleContext);
  if (!greeting.displayGreeting) {
    return null;
  }
  return (
    <Fade bottom duration={1000} distance="40px">
      <div className="greet-main" id="greeting">
        <div className="greeting-main">
          <div className="greeting-text-div">
            <div>
              <h1
                className={isDark ? "dark-mode greeting-text" : "greeting-text"}
              >
                <span className="wave-emoji">{emoji("👋")}</span>{" "}
                {greeting.title} <SocialMedia />
              </h1>
              <p
                className={
                  isDark
                    ? "dark-mode greeting-text-p"
                    : "greeting-text-p subTitle"
                }
              >
                I am an HR professional specializing in operations, early career development, automation, and metrics reporting. After 5 years in the HR field, I've come to believe that talent is a business's greatest asset, and I enjoy helping both people and companies succeed by aligning their expectations. There's still so much for me to explore, so I keep one mantra in mind: learn, unlearn, and relearn. Feel free to explore this page to learn more about my work experience, and you can find a few surprises on the <Link to="/about" className="greeting-about-link">About Me</Link> page!
              </p>
            </div>
          </div>
          <div className="greeting-image-div">
            <div className="headshot-wrapper">
              <img
                src={require("../../assets/images/headshot.jpg")}
                alt="Lixin Zhu Headshot"
                className="headshot-img"
              />
            </div>
          </div>
        </div>
      </div>
    </Fade>
  );
}
