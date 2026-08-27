import React, { useRef, useEffect, useState } from "react";
import "./FadeOnScroll.css";

export default function StaggerFadeWrapper({
  children,
  baseDelay = 0, // starting delay
  gap = 120, // gap between each child’s delay (ms)
  threshold = 0.2,
}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            obs.unobserve(entry.target); // trigger once
          }
        });
      },
      { threshold }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <div ref={ref} className="stagger-container">
      {React.Children.map(children, (child, i) => (
        <div
          className={`fade-section ${visible ? "visible" : ""}`}
          style={{ transitionDelay: `${baseDelay + i * gap}ms` }}
        >
          {child}
        </div>
      ))}
    </div>
  );
}
