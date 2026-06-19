import React, {useEffect, useState} from "react";
import "./CardWipe.scss";

export default function CardWipe({phase = "in", onCovered}) {
  const [cls, setCls] = useState("");

  useEffect(() => {
    if (phase === "in") {
      requestAnimationFrame(() => setCls("card-wipe--covering"));
      const t = setTimeout(() => {
        if (onCovered) onCovered();
      }, 1800);
      return () => clearTimeout(t);
    } else {
      setCls("card-wipe--covering");
      const t = setTimeout(() => setCls("card-wipe--leaving"), 80);
      return () => clearTimeout(t);
    }
  }, [phase]);

  return <div className={`card-wipe ${cls}`} aria-hidden="true" />;
}
