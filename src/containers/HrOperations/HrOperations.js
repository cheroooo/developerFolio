import React, { useContext } from "react";
import StyleContext from "../../contexts/StyleContext";
import { Fade } from "react-reveal";
import "./HrOperations.scss";

export default function HrOperations() {
  const { isDark } = useContext(StyleContext);

  const operations = [
    {
      title: "Recruitment",
      desc: "Act as a liasion between candidates and hiring teams to connect the right minds with the right needs."
    },
    {
      title: "Onboarding",
      desc: "Help new hires settle into their roles by providing a clear plan, resources, and genuine support."
    },
    {
      title: "Performance Review",
      desc: "Faciliate reflections of individuals' accomplishments and skills, helping them succeed and grow within the organization in the long term."
    },
    {
      title: "Employee Engagement",
      desc: "Encourage individuals to take ownership of their professional growth and recognition within the organization."
    },
    {
      title: "Data Analysis",
      desc: "Find patterns in information, analyze and visualize data to create compelling narratives."
    },
    {
      title: "Offboarding",
      desc: "Discuss workplace experiences with departing employees to understand the reasons for attrition."
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
