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
              From organizing career fairs and engineering internship/externship programs to managing full time early career pipelines, my work supports students and recent grads in exploring career paths within the industry.
                <br />
                Career Fairs: Encourage internal teams to represent the firm at university career fairs, forging connections with students to build a robust early career talent pipeline. 
              <br />
                Externship Program: Manage the end to end externship program process. This ranges from allocating headcounts, collaborating with the marketing team, and facilitating the candidate review process. 
              <br /> 
                Internship Program: Designe an immersive, hands-on internship program by partnering with the planning committee to curate weekly learning sessions focused on industry knowledge and team building in 10 weeks. The program satisfaction rate is maintained at 94% every year. 
              <br />
                Year One Program: OVersee emerging talent pipelineS across 5+ disciplines. My core focus is ensuring diversity by strategically distributing candidates across backgrounds, while owning the recruitment process (interview scheduling, offer extensions, and onboarding). 9 out of 10 interns reapply to the full time opportunity after graduation. 
            </p>
          </div>
        </Fade>
      </div>
    </div>
  );
}
