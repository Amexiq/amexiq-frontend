import React, { useState, useEffect } from "react";
import "./dailytrack.css";
import FadeWrapper from "../FadeOnScroll/FadeOnScroll";
import { sanityClient } from "../../sanity/client";
import { homeStatsQuery } from "../../sanity/queries";

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

const Counter = ({ end, label, suffix, icon }) => {
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
      <span>
        {count}
        {suffix}
      </span>
      <h3>{label}</h3>
    </div>
  );
};

const fallbackStats = [
  { label: "Orders Every Day", value: 150, suffix: "+", icon: "orders" },
  { label: "Menu & Dishes", value: 47, suffix: "+", icon: "menu" },
  { label: "Daily Visitors", value: 2450, suffix: "+", icon: "visitors" },
  { label: "Monthly Deliveries", value: 340, suffix: "+", icon: "deliveries" },
];

export default function DailyTrack() {
  const [stats, setStats] = useState(fallbackStats);

  useEffect(() => {
    sanityClient
      .fetch(homeStatsQuery)
      .then((data) => {
        if (data?.stats?.length > 0) setStats(data.stats);
      })
      .catch((err) => console.error("Failed to fetch home stats:", err));
  }, []);

  return (
    <FadeWrapper baseDelay={0} gap={150}>
      <div className="daily-content">
        <div className="daily-data">
          {stats.map((stat, index) => (
            <Counter
              key={index}
              end={stat.value}
              label={stat.label}
              suffix={stat.suffix || "+"}
              icon={icons[stat.icon] || icons.orders}
            />
          ))}
        </div>
      </div>
    </FadeWrapper>
  );
}
