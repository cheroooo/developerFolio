import React, {useState, useRef, useEffect} from "react";
import {Link} from "react-router-dom";
import FallingPetals from "../../components/fallingPetals/FallingPetals";
import "./AboutMe.scss";

function fmt(s) {
  if (!s || isNaN(s)) return "0:00";
  const m = Math.floor(s / 60);
  const ss = String(Math.floor(s % 60)).padStart(2, "0");
  return `${m}:${ss}`;
}

function VideoPlayer({src, poster}) {
  const videoRef = useRef(null);
  const [showOverlay, setShowOverlay] = useState(true);
  const [currentTime, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);

  function handleOverlayClick() {
    const v = videoRef.current;
    if (!v) return;
    v.muted = false;
    v.play();
  }

  function handleScrub(e) {
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = Number(e.target.value);
    setCurrent(v.currentTime);
  }

  return (
    <div className="am-video-wrap">
      <div className="am-video-frame">
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          playsInline
          preload="metadata"
          onPlay={() => setShowOverlay(false)}
          onPause={() => setShowOverlay(true)}
          onEnded={() => setShowOverlay(true)}
          onTimeUpdate={() => setCurrent(videoRef.current?.currentTime || 0)}
          onLoadedMetadata={() => setDuration(videoRef.current?.duration || 0)}
          className="am-video-el"
        />
        {showOverlay && (
          <div className="am-video-overlay" onClick={handleOverlayClick}>
            <div className="am-play-btn">
              <svg width="28" height="32" viewBox="0 0 28 32" fill="none">
                <polygon points="2,1 27,16 2,31" fill="#313b2c"/>
              </svg>
            </div>
          </div>
        )}
      </div>
      <div className="am-scrubber-row">
        <span className="am-time">{fmt(currentTime)}</span>
        <input
          type="range"
          min="0"
          max={duration || 1}
          step="0.1"
          value={currentTime}
          onChange={handleScrub}
          className="am-scrubber"
        />
        <span className="am-time">{fmt(duration)}</span>
      </div>
    </div>
  );
}

export default function AboutMe() {
  useEffect(() => {
    const b = document.body;
    const prev = {
      background: b.style.background,
      backgroundColor: b.style.backgroundColor,
      backgroundImage: b.style.backgroundImage,
      backgroundAttachment: b.style.backgroundAttachment,
    };
    b.style.background = "none";
    b.style.backgroundColor = "#f3f1e7";
    b.style.backgroundImage = "none";
    b.style.backgroundAttachment = "unset";
    document.body.classList.add("about-me-page");
    return () => {
      b.style.background = prev.background;
      b.style.backgroundColor = prev.backgroundColor;
      b.style.backgroundImage = prev.backgroundImage;
      b.style.backgroundAttachment = prev.backgroundAttachment;
      document.body.classList.remove("about-me-page");
    };
  }, []);

  return (
    <>
    <FallingPetals count={60} duration={5000} startOnScreen={true} />
    <div className="am-page">

      {/* ── Hero ── */}
      <section className="am-hero">
        <div className="am-inner">
          <p className="am-eyebrow">ABOUT ME</p>
          <h1 className="am-hero-h1">
            Outside of work, I shoot arrows and climb rocks.
          </h1>
          <p className="am-hero-body">
            Archery taught me to concentrate, and rock climbing taught me that it's okay to fall.
            I also like to travel — experiencing different cities and cultures helps me understand people from all backgrounds.
          </p>
        </div>
      </section>

      <hr className="am-section-rule" />

      {/* ── 01 Archery ── */}
      <section className="am-feature am-feature--media-left">
        <div className="am-inner am-feature-grid">
          <div className="am-feature-media">
            <VideoPlayer
              src={require("../../assets/images/archery.mp4")}
              poster={require("../../assets/images/archery-poster.png")}
            />
          </div>
          <div className="am-feature-text">
            <p className="am-eyebrow">01 — Archery</p>
            <p className="am-feature-note">Oops, I missed the target 🎯</p>
            <blockquote className="am-pullquote">
              "If you have made the right movements, open your hand and release the string.
              Even if the arrow fails to hit the target, you will learn how to improve your aim next time."
              <cite>— Paulo Coelho, The Archer</cite>
            </blockquote>
          </div>
        </div>
      </section>

      <hr className="am-section-rule" />

      {/* ── 02 Rock Climbing ── */}
      <section className="am-feature am-feature--media-right">
        <div className="am-inner am-feature-grid">
          <div className="am-feature-text">
            <p className="am-eyebrow">02 — Rock Climbing</p>
            <h2 className="am-feature-h2">I simply like touching the rocks.</h2>
            <p className="am-feature-body">
              In rock climbing, completing a climb on your first try is called a{" "}
              <em className="am-accent">flash</em>. This one was a flash. ⚡
            </p>
          </div>
          <div className="am-feature-media">
            <VideoPlayer
              src={require("../../assets/images/climbing.mp4")}
              poster={require("../../assets/images/climbing-poster.png")}
            />
          </div>
        </div>
      </section>

      <hr className="am-section-rule" />

      {/* ── 03 Travel ── */}
      <section className="am-travel">
        <div className="am-inner">
          <p className="am-eyebrow">03 — Travel</p>
          <h2 className="am-feature-h2">A secret spot in the Grand Canyon. 🏜️</h2>
          <p className="am-feature-body am-travel-body">I love to see the natural world. It took hundreds of millions of years for nature to shape this masterpiece. Every layer of rock records millions of years of wind, sand, and history, while humanity has only just begun to create its own miracles.</p>
          <div className="am-photo-grid-travel">
            <img src={require("../../assets/images/slot_about-travel.webp")}   alt="Grand Canyon" className="am-photo-card-travel" style={{objectPosition:"center bottom"}} />
            <img src={require("../../assets/images/slot_about-travel-2.webp")} alt="Grand Canyon" className="am-photo-card-travel" />
            <img src={require("../../assets/images/slot_about-travel-3.webp")} alt="Grand Canyon" className="am-photo-card-travel" />
            <img src={require("../../assets/images/slot_about-travel-4.webp")} alt="Grand Canyon" className="am-photo-card-travel" />
          </div>
        </div>
      </section>

      <hr className="am-section-rule" />

      {/* ── Fatty ── */}
      <section className="am-fatty">
        <div className="am-inner am-fatty-grid">
          <div className="am-fatty-text">
            <p className="am-eyebrow">MY DOG</p>
            <h2 className="am-feature-h2">Meet Fatty · <em>肥仔</em></h2>
            <p className="am-feature-body">
              In Cantonese, 肥仔 (meaning 'fat boy') is pronounced 'fey-jai'. He was the star
              of the neighborhood! Children learned his name and often shouted 'Big Lion' when
              they saw him. Fatty was born in Guangzhou, China, and traveled to many places with me.
            </p>
          </div>
          <div className="am-fatty-circles">
            <img src={require("../../assets/images/slot_about-fatty-1.webp")} alt="Fatty" className="am-circle am-circle--large" style={{objectPosition:"center 15%"}} />
            <div className="am-circles-row">
              <img src={require("../../assets/images/slot_about-fatty-2.webp")} alt="Fatty" className="am-circle" />
              <img src={require("../../assets/images/slot_about-fatty-3.webp")} alt="Fatty" className="am-circle" />
            </div>
          </div>
        </div>
      </section>

      <hr className="am-section-rule" />

      {/* ── Comfort Foods ── */}
      <section className="am-foods">
        <div className="am-inner">
          <p className="am-eyebrow am-eyebrow--center">A little more about me</p>
          <h2 className="am-foods-h2">Here are some of my comfort foods.</h2>
          <p className="am-foods-sub">What about yours?</p>
          <div className="am-photo-grid-foods">
            <div className="am-food-card">
              <img src={require("../../assets/images/slot_about-food-1.webp")} alt="Mediterranean food" className="am-food-img" style={{objectPosition:"center 28%"}}/>
              <p className="am-food-caption">Mediterranean food</p>
            </div>
            <div className="am-food-card">
              <img src={require("../../assets/images/slot_about-food-2.webp")} alt="Sushi" className="am-food-img" style={{objectPosition:"center 51%"}}/>
              <p className="am-food-caption">Sushi</p>
            </div>
            <div className="am-food-card">
              <img src={require("../../assets/images/slot_about-food-3.webp")} alt="Soup dumplings" className="am-food-img" style={{objectPosition:"center 51%"}}/>
              <p className="am-food-caption">Soup dumplings · XiaoLongBao</p>
            </div>
            <div className="am-food-card">
              <img src={require("../../assets/images/slot_about-food-4.webp")} alt="Coffee" className="am-food-img" style={{objectPosition:"center 70%"}}/>
              <p className="am-food-caption">Coffee</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="am-footer">
        <div className="am-inner am-footer-inner">
          <Link to="/" className="am-footer-home">← Home Page</Link>
          <span className="am-footer-name">Lixin Zhu</span>
        </div>
      </footer>

    </div>
    </>
  );
}
