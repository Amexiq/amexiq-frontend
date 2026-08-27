
import React from "react";
import "./Home.css";
import Amexiq1 from "../../assets/images/amexiq-5.png";
import Main from "../Main-Content/main";
import DailyTrack from "../Daily-Track/dailytrack";
import Map from "../Map/map";
import Menu from "../Menu/menu";
import CoffeeFactory from "../Coffee/cofee";
import { Link } from "react-router-dom";
import FadeWrapper from "../FadeOnScroll/FadeOnScroll";


const Hero = () => {
  const beans = Array.from({ length: 8 }, (_, i) => i);

  return (
    <>
      <section className="hero">
        {beans.map((_, index) => (
          <div
            key={index}
            className="bean"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              width: `${15 + Math.random() * 20}px`,
              height: `${15 + Math.random() * 20}px`,
            }}
          />
        ))}

        <div className="hero-container">
          {/* LEFT: TEXT */}
          <div className="hero-text">
            <FadeWrapper baseDelay={0} gap={150}>
              <h1>Welcome to AmexiQ Café</h1>
              <p className="tagline">Coffee • Snacks • Desserts</p>
              <p className="desc">
                Experience the aroma of freshly brewed coffee, oven-baked
                snacks, and sweet delights in a cozy and modern café atmosphere.
              </p>
              <div className="hero-buttons">
                <Link to="/menu" className="btn-primary">
                  ☕ Explore Menu
                </Link>
                <Link to="/about" className="btn-secondary">
                  ✨ Experience Café
                </Link>
              </div>
              <div className="hero-features">
                <span>☕ Freshly Brewed</span>
                <span>🥐 Oven-Baked</span>
                <span>🍫 Sweet Treats</span>
              </div>
            </FadeWrapper>
          </div>

          {/* RIGHT: SINGLE IMAGE */}
          <div className="hero-slider">
            <div
              className="slide active"
              style={{ backgroundImage: `url(${Amexiq1})` }}
            />
          </div>
        </div>

      </section>

      <CoffeeFactory />


      <Main />
      <DailyTrack />

      <Map />
      <Menu />
    </>
  );
};

export default Hero;
