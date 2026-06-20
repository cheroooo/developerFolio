import React, {useEffect, useRef} from "react";
import "./CoverPage.scss";
import painting from "../../assets/images/anthropicWave.svg";

const TAGLINE = "Welcome to My Page";

// Soft, on-theme petal tints (apricot / blossom / sage)
const PETAL_COLORS = [
  "#f6b89a",
  "#f2a285",
  "#f4c2a1",
  "#e9a7b0",
  "#f5d0b3",
  "#bcd0a6"
];

// Timeline (ms from when the petals begin to gather)
const GATHER_BASE_DELAY = 80; // before the first petal starts moving
const GATHER_SPREAD = 420; // left-to-right stagger across the word
const GATHER_JITTER = 180; // per-petal randomness on top of the stagger
const TRAVEL = 1050; // how long a single petal drifts to its letter
const TRAVEL_JITTER = 250; // some petals ride the breeze faster than others
const HOLD = 300; // beat where the word sits spelled out in petals
const REVEAL = 600; // cross-fade: petals blow away, crisp text appears

const MAX_PETALS = 150;

const easeInOutSine = t => -(Math.cos(Math.PI * t) - 1) / 2;
const easeInCubic = t => t * t * t;

// Quadratic bezier on one axis: lets a petal arc rather than fly straight.
const bezier = (p0, c, p1, e) =>
  (1 - e) * (1 - e) * p0 + 2 * (1 - e) * e * c + e * e * p1;

// Cover page using the artwork in src/assets/images/coverArt.jpg.
// The image is a progressive JPEG, so it streams in from coarse to sharp.
export default function CoverPage() {
  const effectRef = useRef(null);

  useEffect(() => {
    const effect = effectRef.current;
    if (!effect) {
      return;
    }
    const field = effect.querySelector(".cover-dot-field");
    const textEl = effect.querySelector(".cover-tagline");
    if (!field || !textEl) {
      return;
    }

    const prefersReduced =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)")?.matches;

    effect.classList.add("cover-tagline-effect--revealed");
    return;

    let raf = 0;
    let stopped = false;
    let cleanupFns = [];

    // Sample the real glyph outlines of the tagline into target points, so the
    // petals settle along the actual letter strokes instead of a tidy block.
    const buildTargets = () => {
      const cs = getComputedStyle(textEl);
      const fontSize = parseFloat(cs.fontSize) || 20;
      const font = `${cs.fontStyle} ${cs.fontWeight} ${fontSize}px ${cs.fontFamily}`;

      const fieldRect = field.getBoundingClientRect();
      const textRect = textEl.getBoundingClientRect();
      // Where the text sits inside the petal field (field-relative px).
      const textLeft = textRect.left - fieldRect.left;
      const textTop = textRect.top - fieldRect.top;

      // Render at higher resolution, then map back down for crisp sampling.
      const scale = Math.min(4, Math.max(2, Math.ceil(220 / fontSize)));
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      ctx.font = font;
      const metrics = ctx.measureText(TAGLINE);
      const ascent =
        metrics.actualBoundingBoxAscent || metrics.fontBoundingBoxAscent || fontSize * 0.8;
      const descent =
        metrics.actualBoundingBoxDescent || metrics.fontBoundingBoxDescent || fontSize * 0.2;
      const textWidth = metrics.width;

      const padX = 4;
      const cssW = textWidth + padX * 2;
      const cssH = ascent + descent + padX * 2;
      canvas.width = Math.ceil(cssW * scale);
      canvas.height = Math.ceil(cssH * scale);

      ctx.scale(scale, scale);
      ctx.font = font;
      ctx.textBaseline = "alphabetic";
      ctx.fillStyle = "#000";
      ctx.fillText(TAGLINE, padX, padX + ascent);

      const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
      const step = Math.max(2, Math.round(scale * 1.6)); // grid sampling step (canvas px)
      const points = [];
      for (let y = 0; y < canvas.height; y += step) {
        for (let x = 0; x < canvas.width; x += step) {
          const alpha = data[(y * canvas.width + x) * 4 + 3];
          if (alpha > 128) {
            // Canvas px -> field-relative px. The text was drawn with its
            // top-left at (padX, padX), so subtract that and offset to where
            // the real tagline renders inside the field.
            points.push({
              x: textLeft + (x / scale - padX),
              y: textTop + (y / scale - padX)
            });
          }
        }
      }

      if (points.length === 0) {
        return null;
      }

      // Thin out evenly so we keep the word's shape but cap the petal count.
      let chosen = points;
      if (points.length > MAX_PETALS) {
        chosen = [];
        const stride = points.length / MAX_PETALS;
        for (let i = 0; i < MAX_PETALS; i++) {
          chosen.push(points[Math.floor(i * stride)]);
        }
      }

      return {points: chosen, width: fieldRect.width, fontSize};
    };

    const run = () => {
      if (stopped) {
        return;
      }
      const built = buildTargets();
      if (!built) {
        // Fallback: just show the text if sampling failed.
        effect.classList.add("cover-tagline-effect--revealed");
        return;
      }

      const {points, width, fontSize} = built;
      const petalSize = Math.max(4, fontSize * 0.34);

      const petals = points.map((target, i) => {
        const el = document.createElement("span");
        el.className = "cover-petal";
        el.style.width = `${petalSize}px`;
        el.style.height = `${petalSize * 1.3}px`;
        el.style.background = `linear-gradient(135deg, ${
          PETAL_COLORS[i % PETAL_COLORS.length]
        }, rgba(255, 255, 255, 0.6))`;
        field.appendChild(el);

        const tx = target.x - petalSize / 2;
        const ty = target.y - petalSize / 2;

        // The breeze comes from the upper-left, so petals are mostly carried in
        // from that side; a few stragglers blow in from the right for variety.
        const fromLeft = Math.random() < 0.78;
        const sx = fromLeft
          ? -width * (0.25 + Math.random() * 0.7)
          : width * (1 + Math.random() * 0.5);
        const sy = ty + (Math.random() - 0.5) * fontSize * 10 - fontSize * 2;

        // Curve the flight path with a control point pushed off the straight
        // line (downwind + a random up/down wobble) so it reads as drifting.
        const midX = (sx + tx) / 2;
        const midY = (sy + ty) / 2;
        const cx = midX + fontSize * (1.2 + Math.random() * 2.6);
        const cy = midY + (Math.random() - 0.5) * fontSize * 7;

        // Left-to-right assembly, so the word reads as it forms.
        const order = target.x / Math.max(1, width);
        const delay =
          GATHER_BASE_DELAY + order * GATHER_SPREAD + Math.random() * GATHER_JITTER;

        return {
          el,
          sx,
          sy,
          cx,
          cy,
          tx,
          ty,
          delay,
          travel: TRAVEL + Math.random() * TRAVEL_JITTER,
          rotStart: (Math.random() - 0.5) * 260,
          spin: (Math.random() - 0.5) * 320, // continuous tumble while airborne
          rotEnd: (Math.random() - 0.5) * 22,
          swayAmp: fontSize * (0.5 + Math.random() * 0.7),
          swayFreq: 1.1 + Math.random() * 1.3,
          phase: Math.random() * Math.PI * 2,
          scatterX: fontSize * (1.5 + Math.random() * 3), // blow away downwind
          scatterY: -fontSize * (0.6 + Math.random() * 1.8)
        };
      });

      cleanupFns.push(() => petals.forEach(p => p.el.remove()));

      const lastDelay = petals.reduce(
        (m, p) => Math.max(m, p.delay + p.travel),
        0
      );
      const revealAt = lastDelay + HOLD;
      const gustAmp = fontSize * 0.9;
      let revealed = false;

      const start = performance.now();
      const tick = now => {
        const t = now - start;
        const ts = t / 1000;

        // A shared, slow gust that sways the whole flurry together, the way a
        // breeze moves every petal at once. Layered sines avoid a metronome.
        const gustX =
          (Math.sin(ts * 0.7) * 0.7 + Math.sin(ts * 1.7 + 1.3) * 0.3) * gustAmp;
        const gustY =
          (Math.sin(ts * 0.5 + 2.1) * 0.6 + Math.sin(ts * 1.3) * 0.4) *
          gustAmp *
          0.5;

        for (const p of petals) {
          const local = Math.min(1, Math.max(0, (t - p.delay) / p.travel));
          const e = easeInOutSine(local);
          const settle = 1 - e; // 1 while airborne, 0 once placed

          // Arc along a curved path instead of a straight line.
          let x = bezier(p.sx, p.cx, p.tx, e);
          let y = bezier(p.sy, p.cy, p.ty, e);

          // Personal flutter (strong in flight) + shared gust that lingers
          // faintly once settled so the word still feels alive in the breeze.
          x += Math.sin(ts * p.swayFreq + p.phase) * p.swayAmp * settle;
          y +=
            Math.cos(ts * p.swayFreq * 0.8 + p.phase) * p.swayAmp * 0.55 * settle;
          x += gustX * (settle * 0.85 + 0.15);
          y += gustY * (settle * 0.85 + 0.15);

          // Tumble while airborne, easing to a near-flat resting angle.
          let rot = p.rotEnd + settle * (p.rotStart + p.spin * ts);
          let opacity = local <= 0 ? 0 : Math.min(0.92, local / 0.16);
          let scale = 0.55 + 0.45 * e;

          // Reveal: the breeze lifts the petals away while the crisp word fades in.
          if (t > revealAt) {
            const r = Math.min(1, (t - revealAt) / REVEAL);
            const re = easeInCubic(r);
            x += p.scatterX * re;
            y += p.scatterY * re;
            rot += p.spin * 0.3 * re;
            opacity *= 1 - r;
            scale *= 1 - 0.35 * re;
          }

          p.el.style.opacity = opacity;
          p.el.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${rot}deg) scale(${scale})`;
        }

        if (!revealed && t > revealAt) {
          revealed = true;
          effect.classList.add("cover-tagline-effect--revealed");
        }

        if (!stopped && t < revealAt + REVEAL + 200) {
          raf = requestAnimationFrame(tick);
        }
      };
      raf = requestAnimationFrame(tick);
    };

    // Wait for the tagline font so the sampled glyphs match the rendered text.
    const begin = () => {
      if (!stopped) {
        run();
      }
    };
    if (document.fonts && document.fonts.load) {
      const cs = getComputedStyle(textEl);
      Promise.race([
        document.fonts.load(`${cs.fontWeight} 20px ${cs.fontFamily}`),
        new Promise(res => setTimeout(res, 600))
      ]).then(begin);
    } else {
      begin();
    }

    return () => {
      stopped = true;
      cancelAnimationFrame(raf);
      cleanupFns.forEach(fn => fn());
    };
  }, []);

  return (
    <div className="cover-page">
      <img src={painting} alt="" aria-hidden="true" className="cover-bg" />
      <div className="cover-text">
        <h1 className="cover-name">Lixin Zhu</h1>
        <div
          className="cover-tagline-effect"
          aria-label="Welcome to My Page"
          ref={effectRef}
        >
          <div className="cover-dot-field" aria-hidden="true" />
          <p className="cover-tagline" aria-hidden="true">
            Welcome to My Page
          </p>
        </div>
      </div>
    </div>
  );
}
