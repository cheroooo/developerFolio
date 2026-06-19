import React from "react";
import {Link} from "react-router-dom";
import FallingPetals from "../../components/fallingPetals/FallingPetals";
import "./AboutMe.scss";

export default function AboutMe() {
  return (
    <>
    <FallingPetals count={60} duration={5000} startOnScreen={true} />
    <div className="about-page">
      <div className="about-main">
        <h1 className="about-heading">About Me</h1>
        <div className="about-asymmetric">
          {/* 4 — top text holder */}
          <div className="about-cell about-cell-4">
            <p className="about-cell-placeholder">Outside of work, I do archery and rock climbing.<br/>Archery taught me to concentrate, and rock climbing taught me that it's okay to fall!<br/><br/>I also like to travel. Experiencing different cities and cultures helps me understand people from all backgrounds!</p>
          </div>
          {/* 6 — text box above photos */}
          <div className="about-cell about-cell-6">
            <p className="about-cell-placeholder">I simply like touching the rocks.<br/>In rock climbing, completing a climb on your<br/>first try is called a flash. This video is one ⚡️ →</p>
          </div>
          {/* 1 — rock climbing video (Ydit2aFJec0) */}
          <div className="about-cell about-cell-1">
            <iframe
              src="https://www.youtube.com/embed/wTvJGNjlYfA"
              title="Rock climbing"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="about-cell-iframe"
            />
          </div>
          {/* 2 — photos + middle video */}
          <div className="about-cell about-cell-2">
            <div className="about-cell-img-stack">
              <img src={require("../../assets/images/WechatIMG1526.jpg")} alt="Photo 1" className="about-cell-img about-cell-img-half"/>
            </div>
            <div className="about-cell-circle-video">
              <iframe src="https://www.youtube.com/embed/jLGvcbJwLVs" title="Middle video" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen style={{width:'100%',height:'100%'}}/>
            </div>
            <img src={require("../../assets/images/WechatIMG1527.jpg")} alt="Photo 2" className="about-cell-img about-cell-img-half"/>
          </div>
          {/* 3 — 20250601 video */}
          <div className="about-cell about-cell-3">
            <iframe
              src="https://www.youtube.com/embed/0rV71X3WdHk"
              title="20250601"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="about-cell-iframe"
            />
          </div>
          {/* 8 — 20260212 photo in center area */}
          <p className="about-img-20260212-text">⛰️ Secret spot in<br/>Grand Canyon →</p>
          <img src={require("../../assets/images/grandcanyon.jpg")} alt="Travel" className="about-img-20260212" />
          {/* 9 — 20251129 below first dog picture */}
          <p className="about-food-text">Here are some of my comfort foods. What about yours?</p>
          <img src={require("../../assets/images/20251129.jpg")} alt="Photo A" className="about-img-20251129" />
          {/* 10 — sushi1 below second dog picture */}
          <img src={require("../../assets/images/sushi1.jpeg")} alt="Sushi" className="about-img-8428" />
          {/* 11 — xiaolongbao below third dog picture */}
          <img src={require("../../assets/images/xiaolongbao.jpeg")} alt="Xiaolongbao" className="about-img-xiaolongbao" />
          {/* 7 — floating text next to img1527 */}
          <p className="about-cell-7-text">In Cantonese, 肥仔 (meaning 'fat boy') is pronounced 'fey-jai'. He was the star of the neighborhood! Children learned his name and often shouted 'Big Lion' when they saw him. Fatty was born in Guangzhou, China, and traveled to many places with me.</p>
          {/* 5 — bottom text holder */}
          <div className="about-cell about-cell-5">
            <p className="about-cell-placeholder">← Oops, I missed the target 🎯<br/>"If you have made the right movements, open your hand and release the string. Even if the arrow fails to hit the target, you will learn how to improve your aim next time." — Paulo Coelho, The Archer</p>
          </div>
        </div>
        <div className="about-back-container">
          <Link to="/" className="back-btn">← Home Page</Link>
        </div>
      </div>
    </div>
    </>
  );
}
