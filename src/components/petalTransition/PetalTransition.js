import React, {useEffect, useState} from "react";
import FallingPetals from "../fallingPetals/FallingPetals";
import "./PetalTransition.css";

export default function PetalTransition({onDone}) {
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFading(true), 2000);
    const doneTimer = setTimeout(() => onDone && onDone(), 3200);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(doneTimer);
    };
  }, [onDone]);

  return (
    <div className={`petal-transition-overlay${fading ? " petal-transition-overlay--fade" : ""}`}>
      <FallingPetals count={35} duration={2000} />
    </div>
  );
}
