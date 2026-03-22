import React, { useContext } from "react";
import StyleContext from "../../contexts/StyleContext";
import { Fade } from "react-reveal";
import "./ProgramManagement.scss";

export default function ProgramManagement() {
  const { isDark } = useContext(StyleContext);

  const programs = [
    {
      title: "Career Fairs",
      desc: "Encourage internal teams to represent the firm at university career fairs, and build connections with students to build a robust early career talent pipeline."
    },
    {
      title: "Externship Program",
      desc: "Manage the end to end externship program process. This includes allocating headcount, collaborating with the marketing team, and facilitating the candidate review process."
    },
    {
      title: "Internship Program",
      desc: "Design an immersive, hands-on 10-week internship program by partnering with the planning committee to curate weekly learning sessions focused on industry knowledge and team building. The program satisfaction rate is maintained at 94% every year."
    },
    {
      title: "Year One Program",
      desc: "Oversee the recruitment process (interview scheduling, offer extensions, and onboarding) for 5+ disciplines, ensuring diverse candidates are equally reviewed. 9 out of 10 interns reapply to the full time opportunity after graduation.."
    }
  ];

  return (
    <div className="main" id="program-management">
      <div className="program-management-container">
        <Fade bottom duration={1000} distance="40px">
          <div className="program-management-heading-div">
            <h1 className={isDark ? "dark-mode-title" : "heading-title"}>
              Program Management
            </h1>
            <p className={isDark ? "dark-mode-text" : "subTitle"}>
              From organizing career fairs and engineering internship/externship programs to managing full time early career pipelines, my work supports students and recent grads in exploring career paths within the industry.
            </p>
          </div>
        </Fade>
        
        <div className="prog-mgmt-cards-div">
          {programs.map((prog, i) => (
            <Fade bottom duration={1000} distance="40px" key={i}>
              <div className={isDark ? "prog-mgmt-card-dark" : "prog-mgmt-card"}>
                <h3 className={isDark ? "dark-mode-title" : "prog-mgmt-card-title"}>{prog.title}</h3>
                <p className={isDark ? "dark-mode-text" : "prog-mgmt-card-text"}>{prog.desc}</p>
              </div>
            </Fade>
          ))}
        </div>
      </div>
    </div>
  );
}
