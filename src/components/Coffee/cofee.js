import React from "react";
import Coffee from "../../assets/images/coffee.webp";
import "./coffee.css";
import { Link } from "react-router-dom";
import FadeWrapper from "../FadeOnScroll/FadeOnScroll";

export default function CoffeeFactory() {
  return (
    <FadeWrapper baseDelay={0} gap={150}>
      <section className="coffee-section">
        {/* Background Big Text */}
        <h1 className="background-text">COFFEE FACTORY</h1>

        {/* Left Image */}
        <div className="coffee-image">
          <img src={Coffee} alt="coffee" />
        </div>

        {/* Right Content */}
        <div className="coffee-content">
          <span className="small-label">
            <span className="cup-icon">☕</span> OUR ROASTERY
          </span>

          <h2 className="title">Crafting Bold Brews with Passion and Care</h2>

          <p className="description">
            From freshly roasted beans to perfectly brewed coffee, every cup is
            crafted to delight your senses. Paired with oven-fresh pastries and
            sweet treats, your café experience is nothing short of exceptional.
          </p>

          {/* Actions (features + rating card) */}
          <div className="actions">
            <div className="feature">
              <ul className="feature-list">
                <li>
                  <span className="dot"></span> Ethically sourced, premium
                  coffee beans
                </li>
                <li>
                  <span className="dot"></span> Freshly baked pastries & snacks
                  daily
                </li>
                <li>
                  <span className="dot"></span> Cozy, modern space to relax &
                  unwind
                </li>
              </ul>
              <Link to="/about" className="book-btn">
                ✨ Visit Us Today
              </Link>
            </div>

            <div className="rating-card">
              <p className="rating">4.9+</p>
              <p className="stars">★★★★★</p>
              <p className="note">15.5K happy visitors</p>
            </div>
          </div>
        </div>
      </section>
    </FadeWrapper>
  );
}
