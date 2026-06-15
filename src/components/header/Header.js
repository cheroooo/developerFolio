import React, {useContext, useRef, useCallback} from "react";
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

// Soft, on-theme petal tints (apricot / blossom / sage)
const PETAL_COLORS = [
  "#f6b89a",
  "#f2a285",
  "#f4c2a1",
  "#e9a7b0",
  "#f5d0b3",
  "#bcd0a6"
];

function Header() {
  const {isDark} = useContext(StyleContext);
  const viewExperience = workExperiences.display;
  const viewOpenSource = openSource.display;
  const viewSkills = skillsSection.display;
  const viewAchievement = achievementSection.display;
  const viewBlog = blogSection.display;
  const viewTalks = talkSection.display;
  const viewResume = resumeSection.display;

  const petalLayerRef = useRef(null);

  // Spawn a brief flurry of petals drifting from the hovered menu item.
  // Each petal animates itself and removes on finish (well under 2s).
  const spawnPetals = useCallback(event => {
    const layer = petalLayerRef.current;
    if (!layer) {
      return;
    }
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const linkRect = event.currentTarget.getBoundingClientRect();
    const layerRect = layer.getBoundingClientRect();
    const originX = linkRect.left - layerRect.left + linkRect.width / 2;
    const originY = linkRect.bottom - layerRect.top - 4;

    const count = 10;
    for (let i = 0; i < count; i++) {
      const petal = document.createElement("span");
      petal.className = "header-petal";
      const size = 6 + Math.random() * 6;
      petal.style.width = `${size}px`;
      petal.style.height = `${size * 1.3}px`;
      petal.style.background = `linear-gradient(135deg, ${
        PETAL_COLORS[i % PETAL_COLORS.length]
      }, rgba(255, 255, 255, 0.6))`;
      petal.style.left = `${originX}px`;
      petal.style.top = `${originY}px`;
      layer.appendChild(petal);

      const dx = (Math.random() - 0.5) * linkRect.width * 1.7;
      const dy = 26 + Math.random() * 64; // gentle drift downward
      const rot = (Math.random() - 0.5) * 320;
      const duration = 1300 + Math.random() * 600; // finishes within ~2s
      const delay = Math.random() * 220;

      const animation = petal.animate(
        [
          {transform: "translate(0, 0) rotate(0deg) scale(0.6)", opacity: 0},
          {opacity: 0.95, offset: 0.18},
          {
            transform: `translate(${dx}px, ${dy}px) rotate(${rot}deg) scale(1)`,
            opacity: 0
          }
        ],
        {
          duration,
          delay,
          easing: "cubic-bezier(0.25, 0.6, 0.3, 1)",
          fill: "forwards"
        }
      );
      animation.onfinish = () => petal.remove();
      animation.oncancel = () => petal.remove();
    }
  }, []);

  return (
    <Headroom>
      <header className={isDark ? "dark-menu header" : "header"}>
        <div className="header-petal-layer" aria-hidden="true" ref={petalLayerRef} />
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
              <a href="/#skills" onMouseEnter={spawnPetals}>
                Work Scope
              </a>
            </li>
          )}
          {viewExperience && (
            <li>
              <a href="/#experience" onMouseEnter={spawnPetals}>
                Experience
              </a>
            </li>
          )}
          <li>
            <a href="/#education" onMouseEnter={spawnPetals}>
              Education
            </a>
          </li>
          {viewOpenSource && (
            <li>
              <a href="/#opensource" onMouseEnter={spawnPetals}>
                Open Source
              </a>
            </li>
          )}
          {viewAchievement && (
            <li>
              <a href="/#achievements" onMouseEnter={spawnPetals}>
                Achievements
              </a>
            </li>
          )}
          {viewBlog && (
            <li>
              <a href="/#blogs" onMouseEnter={spawnPetals}>
                Blogs
              </a>
            </li>
          )}
          {viewTalks && (
            <li>
              <a href="/#talks" onMouseEnter={spawnPetals}>
                Talks
              </a>
            </li>
          )}
          {viewResume && (
            <li>
              <a href="/#resume" onMouseEnter={spawnPetals}>
                Resume
              </a>
            </li>
          )}
        </ul>
      </header>
    </Headroom>
  );
}
export default Header;
