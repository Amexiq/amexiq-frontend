import React, { useState, useEffect } from "react";
import "./LogoLoader.css";

export default function LogoLoader({
  letter = "AmexiQ",
  size = 220,
  outerColor = "#0a5b22",
  innerColor = "#d11b1b",
  fillColor = "#ffffff",
  fontFamily = "Lobster, cursive",
  delay = 150,
  letterGap = 10,
}) {
  const [visible, setVisible] = useState(Array(letter.length).fill(false));
  const [scale, setScale] = useState(1);

  // Letter appear animation
  useEffect(() => {
    const timers = letter.split("").map((_, index) =>
      setTimeout(() => {
        setVisible((prev) => {
          const newArr = [...prev];
          newArr[index] = true;
          return newArr;
        });
      }, index * delay)
    );
    return () => timers.forEach(clearTimeout);
  }, [letter, delay]);

  // Responsive scaling
  useEffect(() => {
    const updateScale = () => {
      const width = window.innerWidth;
      if (width < 480) setScale(0.4);
      else if (width < 768) setScale(0.6);
      else if (width < 1024) setScale(0.8);
      else setScale(1);
    };
    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  const outerStroke = Math.max(8, Math.round(size * 0.11)) * scale;
  const innerStroke = Math.max(4, Math.round(size * 0.045)) * scale;
  const padding = outerStroke * 2;
  const scaledSize = size * scale;
  const scaledGap = letterGap * scale;

  const totalWidth =
    letter.length * scaledSize + (letter.length - 1) * scaledGap + padding * 2;
  const totalHeight = scaledSize + padding * 2;

  return (
    <div className="letter-svg-wrapper">
      <svg
        viewBox={`0 0 ${totalWidth} ${totalHeight}`}
        width="100%"
        height="auto"
        xmlns="http://www.w3.org/2000/svg"
      >
        {[...letter].map((char, index) => {
          const x = padding + index * (scaledSize + scaledGap) + scaledSize / 2;
          return (
            <g
              key={index}
              className={`letter-bounce ${visible[index] ? "visible" : ""}`}
              style={{ transformOrigin: `${x}px ${totalHeight / 2}px` }}
            >
              {/* Outer stroke */}
              <text
                x={x}
                y={totalHeight / 2}
                textAnchor="middle"
                dominantBaseline="middle"
                fontFamily={fontFamily}
                fontSize={scaledSize}
                fill="none"
                stroke={outerColor}
                strokeWidth={outerStroke}
                strokeLinejoin="round"
                strokeLinecap="round"
              >
                {char}
              </text>

              {/* Inner stroke */}
              <text
                x={x}
                y={totalHeight / 2}
                textAnchor="middle"
                dominantBaseline="middle"
                fontFamily={fontFamily}
                fontSize={scaledSize}
                fill="none"
                stroke={innerColor}
                strokeWidth={innerStroke}
                strokeLinejoin="round"
                strokeLinecap="round"
              >
                {char}
              </text>

              {/* Fill */}
              <text
                x={x}
                y={totalHeight / 2}
                textAnchor="middle"
                dominantBaseline="middle"
                fontFamily={fontFamily}
                fontSize={scaledSize}
                fill={fillColor}
              >
                {char}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
