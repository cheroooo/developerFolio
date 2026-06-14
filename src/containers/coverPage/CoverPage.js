import React from "react";
import "./CoverPage.scss";
import painting from "../../assets/images/themeBackground.jpg";

// Cover page using the artwork in src/assets/images/coverArt.jpg.
// The image is a progressive JPEG, so it streams in from coarse to sharp.
export default function CoverPage() {
  return (
    <div className="cover-page">
      <img src={painting} alt="" aria-hidden="true" className="cover-bg" />
      <div className="cover-text">
        <h1 className="cover-name">Lixin Zhu</h1>
        <p className="cover-tagline">Welcome to My Digital Corner</p>
      </div>
    </div>
  );
}
