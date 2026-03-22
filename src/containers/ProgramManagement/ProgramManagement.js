import React, { useContext } from "react";
import StyleContext from "../../contexts/StyleContext";
import { Fade } from "react-reveal";

export default function ProgramManagement() {
  const { isDark } = useContext(StyleContext);
  return (
    <div className="main" id="program-management">
      <div className="program-management-container">
        <Fade bottom duration={1000} distance="40px">
          <div className="program-management-heading-div">
            <h1 className={isDark ? "dark-mode-title" : "heading-title"}>
              Program Management
            </h1>
            <p className={isDark ? "dark-mode-text" : "subTitle"}>
              From organizing career fairs and engineering internship/externship programs to managing fulltime early career pipelines, my work supports students and recent grads in exploring career paths within the industry.
            </p>
          </div>
        </Fade>
      </div>
    </div>
  );
}
