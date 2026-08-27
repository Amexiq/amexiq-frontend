import React, { useState, useEffect } from "react";
import "./dailytrack.css";
import FadeWrapper from "../FadeOnScroll/FadeOnScroll";

const icons = {
  orders: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M3 6h18v2H3zM3 10h18v2H3zM3 14h18v2H3z" />
    </svg>
  ),
  menu: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" />
    </svg>
  ),
  visitors: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z" />
    </svg>
  ),
  deliveries: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M3 3h18v4H3zM3 7h18v2H3zM3 11h18v2H3zM3 15h18v2H3z" />
    </svg>
  ),
};

const Counter = ({ end, label, icon }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1500;
    const increment = end / (duration / 16);

    const animate = () => {
      start += increment;
      if (start < end) {
        setCount(Math.ceil(start));
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };
    animate();
  }, [end]);

  return (
    <div className="daily-item">
      <div className="icon">{icon}</div>
      <span>{count}+</span>
      <h3>{label}</h3>
    </div>
  );
};

export default function DailyTrack() {
  return (
    <FadeWrapper baseDelay={0} gap={150}>
      <div className="daily-content">
        <div className="daily-data">
          <Counter end={150} label="Orders Every Day" icon={icons.orders} />
          <Counter end={47} label="Menu & Dishes" icon={icons.menu} />
          <Counter end={2450} label="Daily Visitors" icon={icons.visitors} />
          <Counter
            end={340}
            label="Monthly Deliveries"
            icon={icons.deliveries}
          />
        </div>
      </div>
    </FadeWrapper>
  );
}
