import React, { useContext } from "react";
import StyleContext from "../../contexts/StyleContext";
import { Fade } from "react-reveal";
import "./HrOperations.scss";

export default function HrOperations() {
  const { isDark } = useContext(StyleContext);

  const operations = [
    {
      title: "Recruitment",
      desc: "The experience for The recruitment process is a preview of what it’s like to work at the company. Personalizing the interaction set a positive impression for the candidate."
    },
    {
      title: "Onboarding",
      desc: "A clear plan, resources, and genuine support help new colleagues settle into their roles."
    },
    {
      title: "Performance Review",
      desc: "A reflection of an individual's accomplishments and skills, helping them succeed and grow within the organization in the long term."
    },
    {
      title: "Employee Engagement",
      desc: "Encourage individuals to take ownership of their professional growth and recognition within the organization."
    },
    {
      title: "Data Analysis",
      desc: "Find patterns in information, analyze and visualize data to create compelling narrative."
    },
    {
      title: "Offboarding",
      desc: "Understand employee departures and ensure a smooth transition."
    }
  ];

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
              Below is the scope of work I oversee on a day to day basis:
            </p>
          </div>
        </Fade>
        <div className="hr-ops-cards-div">
          {operations.map((op, i) => (
            <Fade bottom duration={1000} distance="40px" key={i}>
              <div className={isDark ? "hr-ops-card-dark" : "hr-ops-card"}>
                <h3 className={isDark ? "dark-mode-title" : "hr-ops-card-title"}>{op.title}</h3>
                <p className={isDark ? "dark-mode-text" : "hr-ops-card-text"}>{op.desc}</p>
              </div>
            </Fade>
          ))}
        </div>
      </div>
    </div>
  );
}
