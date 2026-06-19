import React, {useContext, useState} from "react";
import {Link, useHistory} from "react-router-dom";
import FallingPetals from "../fallingPetals/FallingPetals";
import CardWipe from "../cardWipe/CardWipe";
import Headroom from "react-headroom";
import "./Header.scss";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import StyleContext from "../../contexts/StyleContext";
import {
  greeting,
  workExperiences,
  skillsSection,
  openSource,
  blogSection,
  talkSection,
  achievementSection,
  resumeSection
} from "../../portfolio";

function Header() {
  const {isDark} = useContext(StyleContext);
  const history = useHistory();
  const [showPetals, setShowPetals] = useState(false);
  const [showWipe, setShowWipe] = useState(false);

  function handleAboutMeClick(e) {
    e.preventDefault();
    if (showWipe || showPetals) return;
    setShowWipe(true);
    setShowPetals(true);
  }

  function handleWipeCovered() {
    history.push("/about");
    setShowWipe(false);
    setShowPetals(false);
  }
  const viewExperience = workExperiences.display;
  const viewOpenSource = openSource.display;
  const viewSkills = skillsSection.display;
  const viewAchievement = achievementSection.display;
  const viewBlog = blogSection.display;
  const viewTalks = talkSection.display;
  const viewResume = resumeSection.display;


  return (
    <>
    {showPetals && <FallingPetals count={720} duration={3000} startOnScreen={true} />}
    {showWipe && <CardWipe phase="in" onCovered={handleWipeCovered} />}
    <Headroom>
      <header className={isDark ? "dark-menu header" : "header"}>
<a href="/" className="logo">
          <span className="logo-name">{greeting.username}</span>
        </a>
        <input className="menu-btn" type="checkbox" id="menu-btn" />
        <label
          className="menu-icon"
          htmlFor="menu-btn"
          style={{color: "white"}}
        >
          <span className={isDark ? "navicon navicon-dark" : "navicon"}></span>
        </label>
        <ul className={isDark ? "dark-menu menu" : "menu"}>
          {viewSkills && (
            <li>
              <a href="/#skills">
                Work Scope
              </a>
            </li>
          )}
          {viewExperience && (
            <li>
              <a href="/#experience">
                Experience
              </a>
            </li>
          )}
          <li>
            <a href="/#education">
              Education
            </a>
          </li>
          <li>
            <a href="/about" onClick={handleAboutMeClick}>About Me</a>
          </li>
          {viewOpenSource && (
            <li>
              <a href="/#opensource">
                Open Source
              </a>
            </li>
          )}
          {viewAchievement && (
            <li>
              <a href="/#achievements">
                Achievements
              </a>
            </li>
          )}
          {viewBlog && (
            <li>
              <a href="/#blogs">
                Blogs
              </a>
            </li>
          )}
          {viewTalks && (
            <li>
              <a href="/#talks">
                Talks
              </a>
            </li>
          )}
          {viewResume && (
            <li>
              <a href="/#resume">
                Resume
              </a>
            </li>
          )}
        </ul>
      </header>
    </Headroom>
    </>
  );
}
export default Header;
