
import React from "react";
import "./Home.css";
import Amexiq1 from "../../assets/images/hero.jpg";
import Main from "../Main-Content/main";
import DailyTrack from "../Daily-Track/dailytrack";
import Map from "../Map/map";
import Menu from "../Menu/menu";
import CoffeeFactory from "../Coffee/cofee";
import { Link } from "react-router-dom";
import FadeWrapper from "../FadeOnScroll/FadeOnScroll";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";


const Hero = () => {
  return (
    <>
      <section className="hero">
        {/* Swap Amexiq1 for the final hero photo whenever it's ready */}
        <div
          className="hero-bg"
          style={{ backgroundImage: `url(${Amexiq1})` }}
        />
        <div className="hero-overlay"></div>

        <div className="hero-inner">
          <FadeWrapper baseDelay={0} gap={150}>
            <p className="hero-eyebrow">Coffee • Snacks • Desserts</p>
            <h1 className="hero-title">Where Flavor Meets Comfort</h1>
            <p className="hero-subtitle">
              Experience the aroma of freshly brewed coffee, oven-baked
              snacks, and sweet delights in a cozy and modern café atmosphere.
            </p>
            <div className="hero-cta">
              <Link to="/menu" className="hero-btn hero-btn-filled">
                Explore Menu
              </Link>
              <Link to="/about" className="hero-btn hero-btn-outline">
                Experience Café
              </Link>
            </div>
          </FadeWrapper>
        </div>

        <div className="hero-scroll-cue">
          <KeyboardArrowDownIcon />
        </div>
      </section>
      <DailyTrack />

      {/* <CoffeeFactory /> */}


      <Main />

      <Map />
      <Menu />
    </>
  );
};

export default Hero;
