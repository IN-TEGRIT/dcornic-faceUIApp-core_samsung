import { useState, useEffect } from "react";

export default function PageOpenningEffectLayer() {
  const [visibleEffect, setVisibleEffect] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setVisibleEffect(false);
    }, 300);
  }, []);

  if (visibleEffect) {
    return (
      <div
      className="animate__fadeOut animate__animated"
      style={{ position: 'absolute', zIndex: 100, top: 0, left: 0, background: "#000", width: "100%", height: "100%" }}
      />
  
    )
  }

  return <></>
}