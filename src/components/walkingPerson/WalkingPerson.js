import React, {useEffect, useRef} from "react";
import "./WalkingPerson.css";

const PROXIMITY = 80; // px radius that stops the person

function waveY(svgX) {
  if (svgX <= 280) {
    const t = svgX / 280;
    return 310 - 60 * t + 60 * t * t;
  } else if (svgX <= 520) {
    const t = (svgX - 280) / 240;
    return 310 + 56 * t - 71 * t * t;
  } else {
    const t = (svgX - 520) / 160;
    return 295 - 60 * t + 55 * t * t;
  }
}

const CONTENT_SELECTOR = [
  ".experience-card",
  ".experience-card-dark",
  ".education-card-container",
  ".blog-card",
  ".achievement-card",
  ".talk-card",
  ".project-card",
  ".startup-project-card",
  ".skills-image",
  ".greeting-image-div",
  "img",
  ".card-image",
  ".lottie-anim-div",
  ".skill-image-div"
].join(", ");

function getOverlappingContent(personX, personBottomPx) {
  const vh = window.innerHeight;
  const personTop = vh - personBottomPx - 50;
  const elements = document.querySelectorAll(CONTENT_SELECTOR);
  for (const el of elements) {
    const rect = el.getBoundingClientRect();
    if (rect.width < 30 || rect.height < 30) continue; // skip tiny/invisible
    if (
      personX + 25 > rect.left &&
      personX - 25 < rect.right &&
      personTop + 50 > rect.top &&
      personTop < rect.bottom
    ) {
      return rect;
    }
  }
  return null;
}

export default function WalkingPerson() {
  const personRef = useRef(null);
  const mouseRef = useRef({x: -9999, y: -9999});

  useEffect(() => {
    const onMouseMove = e => {
      mouseRef.current = {x: e.clientX, y: e.clientY};
    };
    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  useEffect(() => {
    const DURATION = 12000;
    let elapsed = 0;
    let lastTs = null;
    let raf;

    function animate(ts) {
      const el = personRef.current;
      if (!el) return;

      const vw = window.innerWidth;
      const vh = window.innerHeight;

      // compute current position from elapsed time (so pausing doesn't reset)
      const progress = (elapsed % DURATION) / DURATION;
      const personX = -60 + progress * (vw + 120);

      const svgX = Math.max(0, Math.min(680, (personX / vw) * 680));
      const svgY = waveY(svgX);
      const bottomPx = ((420 - svgY) / 420) * vh;
      const personCenterY = vh - bottomPx - 25;

      // check mouse proximity
      const mouse = mouseRef.current;
      const dx = mouse.x - personX;
      const dy = mouse.y - personCenterY;
      const near = Math.sqrt(dx * dx + dy * dy) < PROXIMITY;

      const dt = lastTs ? ts - lastTs : 0;
      lastTs = ts;

      if (!near) {
        elapsed += dt;
      }

      el.style.left = personX + "px";
      el.style.bottom = bottomPx + "px";

      // pause leg/arm animation when stopped
      const animState = near ? "paused" : "running";
      el.querySelectorAll(
        ".person-body, .leg-left, .leg-right, .arm-left, .arm-right"
      ).forEach(g => {
        g.style.animationPlayState = animState;
      });

      // card clipping
      const contentRect = getOverlappingContent(personX, bottomPx);
      if (contentRect) {
        const personTop = vh - bottomPx - 50;
        const clipPx = Math.max(0, contentRect.bottom - personTop);
        el.style.clipPath = `inset(${clipPx}px 0 0 0)`;
      } else {
        el.style.clipPath = "inset(0px 0 0 0)";
      }

      raf = requestAnimationFrame(animate);
    }

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="walking-scene" aria-hidden="true">
      <div className="walking-person" ref={personRef}>
        <svg width="50" height="50" viewBox="-12 -44 24 44" xmlns="http://www.w3.org/2000/svg">
          <circle cx="0" cy="-37" r="6" fill="#C0906A" />
          <g className="person-body">
            <line x1="0" y1="-30" x2="0" y2="-10" stroke="#C0906A" strokeWidth="3" strokeLinecap="round" />
            <g className="arm-left">
              <line x1="0" y1="-25" x2="-10" y2="-15" stroke="#C0906A" strokeWidth="2.5" strokeLinecap="round" />
            </g>
            <g className="arm-right">
              <line x1="0" y1="-25" x2="10" y2="-15" stroke="#C0906A" strokeWidth="2.5" strokeLinecap="round" />
            </g>
          </g>
          <g className="leg-left">
            <line x1="0" y1="-10" x2="-8" y2="4" stroke="#C0906A" strokeWidth="2.5" strokeLinecap="round" />
          </g>
          <g className="leg-right">
            <line x1="0" y1="-10" x2="8" y2="4" stroke="#C0906A" strokeWidth="2.5" strokeLinecap="round" />
          </g>
        </svg>
      </div>
    </div>
  );
}
