import React, {useEffect, useRef} from "react";
import "./FallingPetals.scss";

// Soft, on-theme petal tints (apricot / blossom / sage)
const PETAL_COLORS = [
  "#f6b89a",
  "#f2a285",
  "#f4c2a1",
  "#e9a7b0",
  "#f5d0b3",
  "#bcd0a6"
];

const BRUSH_RADIUS = 110; // how close the cursor must be to disturb a petal
const BRUSH_STRENGTH = 2.6; // how hard the cursor sweeps petals away

export default function FallingPetals({count = 22, duration = 10000, startOnScreen = false}) {
  const containerRef = useRef(null);

  useEffect(() => {
    // Honor users who prefer reduced motion: no falling, no listeners.
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)")?.matches
    ) {
      return;
    }

    const container = containerRef.current;
    if (!container) {
      return;
    }

    let vw = window.innerWidth;
    let vh = window.innerHeight;

    // Cursor position; off-screen until the mouse actually moves.
    const cursor = {x: -9999, y: -9999};

    // Create one petal: a DOM node plus its physics state.
    const petals = Array.from({length: count}, (_, i) => {
      const size = 8 + Math.random() * 11; // 8–19px
      const el = document.createElement("span");
      el.className = "petal";
      el.style.width = `${size}px`;
      el.style.height = `${size}px`;
      el.style.background = `linear-gradient(135deg, ${
        PETAL_COLORS[i % PETAL_COLORS.length]
      }, rgba(255, 255, 255, 0.6))`;
      container.appendChild(el);

      return {
        el,
        size,
        x: Math.random() * vw,
        y: startOnScreen
          ? Math.random() * vh
          : -(Math.random() * vh * 1.2) - size,
        vx: (Math.random() - 0.5) * 0.6,
        vy: 0.6 + Math.random() * 0.7,
        rot: Math.random() * 360,
        vrot: (Math.random() - 0.5) * 4,
        swayAmp: 0.015 + Math.random() * 0.02,
        swayFreq: 0.6 + Math.random() * 0.9,
        phase: Math.random() * Math.PI * 2
      };
    });

    const onMove = e => {
      cursor.x = e.clientX;
      cursor.y = e.clientY;
    };
    const onResize = () => {
      vw = window.innerWidth;
      vh = window.innerHeight;
    };
    window.addEventListener("mousemove", onMove, {passive: true});
    window.addEventListener("resize", onResize);

    let raf;
    let stopped = false;
    const start = performance.now();

    const tick = now => {
      const t = (now - start) / 1000;

      for (const p of petals) {
        // gravity (eased toward a gentle terminal velocity)
        p.vy += 0.012;
        if (p.vy > 1.9) p.vy = 1.9;

        // flutter: a gentle horizontal oscillation as it descends
        p.vx += Math.sin(t * p.swayFreq + p.phase) * p.swayAmp;

        // cursor brush: push the petal away from the pointer
        const dx = p.x - cursor.x;
        const dy = p.y - cursor.y;
        const dist = Math.hypot(dx, dy);
        if (dist < BRUSH_RADIUS && dist > 0.01) {
          const force = (1 - dist / BRUSH_RADIUS) * BRUSH_STRENGTH;
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
          p.vrot += force * 0.6 * (dx < 0 ? 1 : -1); // spin from the swipe
        }

        // damping so a brushed petal eases back to a calm drift
        p.vx *= 0.94;

        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vrot;
        p.vrot *= 0.96;

        // wrap horizontally so a hard swipe doesn't lose petals off-side
        if (p.x < -20) p.x = vw + 20;
        else if (p.x > vw + 20) p.x = -20;

        // recycle to the top once it falls past the bottom
        if (p.y > vh + p.size) {
          p.x = Math.random() * vw;
          p.y = -p.size - Math.random() * 40;
          p.vx = (Math.random() - 0.5) * 0.6;
          p.vy = 0.6 + Math.random() * 0.7;
        }

        p.el.style.transform = `translate3d(${p.x}px, ${p.y}px, 0) rotate(${p.rot}deg)`;
      }

      if (!stopped) {
        raf = requestAnimationFrame(tick);
      }
    };
    raf = requestAnimationFrame(tick);

    // Gracefully end the flurry: fade out, then remove.
    const stopTimer = setTimeout(() => {
      container.classList.add("falling-petals--fade");
    }, duration);
    const cleanupTimer = setTimeout(() => {
      stopped = true;
      cancelAnimationFrame(raf);
    }, duration + 1200);

    return () => {
      stopped = true;
      cancelAnimationFrame(raf);
      clearTimeout(stopTimer);
      clearTimeout(cleanupTimer);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);
      petals.forEach(p => p.el.remove());
    };
  }, [count, duration, startOnScreen]);

  return <div className="falling-petals" aria-hidden="true" ref={containerRef} />;
}
