import React, { useContext } from "react";
import StyleContext from "../../contexts/StyleContext";
import { Fade } from "react-reveal";

export default function HrOperations() {
  const { isDark } = useContext(StyleContext);
  return (
    <div className="main" id="hr-operations">
      <div className="hr-operations-container">
        <Fade bottom duration={1000} distance="40px">
          <div className="hr-operations-heading-div">
            <h1 className={isDark ? "dark-mode-title" : "heading-title"}>
              HR Operations
            </h1>
            <p className={isDark ? "dark-mode-text" : "subTitle"}>
              Supporting cross functional leaders and teams, curating a high touch workplace experience, and optimizing daily workflows to drive continuous improvement. 
                <br />
                <br />
                <br />
                <br />


                Recruitment - The experience for The recruitment process is a preview of what it’s like to work at the company. Personalizing the interaction set a positive impression for the candidate.
                <br />
                |
                Onboarding - A clear plan, resources, and genuine support help new colleagues settle into their roles.
                <br />
                |
                Performance Review - A reflection of an individual's accomplishments and skills, helping them succeed and grow within the organization in the long term. 
                <br />
                |
                Employee Engagement - Encourage individuals to take ownership of their professional growth and recognition within the organization.
                <br />
                |
                Data Analysis - Find patterns in information, analyze and visualize data to create compelling narrative.
                <br />
                |
                Offboarding - Understand employee departures and ensure a smooth transition.
          
  




                
            </p>
          </div>
        </Fade>
      </div>
    </div>
  );
}
