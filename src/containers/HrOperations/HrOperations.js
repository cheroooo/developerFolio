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
              This is the HR Operations subsidiary page. It provides details on human resources strategy and administration.
            </p>
          </div>
        </Fade>
      </div>
    </div>
  );
}
