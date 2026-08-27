import React, { useState } from "react";
import "./footer.css";
import Pin from "../../assets/images/location.png";
import Phone from "../../assets/images/phone-call.png";
import Mail from "../../assets/images/at.png";
import Headerlogo from "../../assets/images/header-logo.png";
import WhatsAppIcon from "../../assets/images/whatsapp.png";
import FacebookIcon from "../../assets/images/facebook.png";
import InstagramIcon from "../../assets/images/instagram.png";
import Amexiq1 from "../../assets/images/amexiq-1.png";
import Amexiq2 from "../../assets/images/amexiq-2.png";
import Amexiq3 from "../../assets/images/amexiq-3.png";
import Amexiq4 from "../../assets/images/amexiq-4.png";

import Amexiq5 from "../../assets/images/amexiq-4.png";

import { Link } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FadeWrapper from "../FadeOnScroll/FadeOnScroll";

export default function Footer() {
  const Insta = [Amexiq1, Amexiq2, Amexiq3, Amexiq4];

  const [startIndex, setStartIndex] = useState(0);
  const visibleCount = 4;

  const handleNext = () => {
    setStartIndex((prevIndex) => (prevIndex + 1) % Insta.length);
  };

  const handlePrev = () => {
    setStartIndex((prevIndex) => (prevIndex - 1 + Insta.length) % Insta.length);
  };

  const visibleImages = Array.from(
    { length: visibleCount },
    (_, i) => Insta[(startIndex + i) % Insta.length]
  );

  return (
    <div className="footer-container">
      <FadeWrapper baseDelay={0} gap={150}>
        <div className="footer-content">
          <div className="footer-head">
            <div className="footer-main">
              {" "}
              <img src={Headerlogo} alt="" />
              <div className="footer-social-button">
                <button>
                  <img src={WhatsAppIcon} alt="WhatsApp" />
                </button>
                <button>
                  <img src={FacebookIcon} alt="Facebook" />
                </button>
                <button>
                  <img src={InstagramIcon} alt="Instagram" />
                </button>
              </div>
            </div>
            <div className="footer-underline"></div>
          </div>

          <div className="footer-items">
            {/* Contact Section */}
            <div className="footer-contact">
              <h2>Don't Be Shy, Say Hi!</h2>
              <ul>
                <li>
                  <img src={Pin} alt="Location" />
                  <span>P.O.Box 376846, Dubai, UAE</span>
                </li>
                <li>
                  <img src={Phone} alt="Phone" />
                  <span>+971 55 734 7125</span>
                </li>
                <li>
                  <img src={Mail} alt="Email" />
                  <span>info@amexiqae.com</span>
                </li>
              </ul>
              <Link to="contact">Read More</Link>
            </div>

            {/* Opening Hours Section */}
            <div className="footer-Hour">
              <h2>Opening Hours</h2>
              <ul>
                {[
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                  "Sunday",
                ].map((day) => (
                  <li key={day}>
                    <div className="working-item">
                      <div className="working-day">{day}</div>
                      <div className="working-hour">8.00 - 20.00</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Instagram Gallery Section */}
            <div className="footer-insta">
              <h2>We are on Insta</h2>

              <div className="insta-img">
                {visibleImages.map((img, index) => (
                  <img key={index} src={img} alt={`Insta ${index + 1}`} />
                ))}
              </div>
              <div className="More-button">
                <Link to="gallery">See More</Link>
                <div className="next-prev">
                  <button onClick={handlePrev}>
                    <ArrowBackIcon />
                  </button>
                  <button onClick={handleNext}>
                    <ArrowForwardIcon />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="footer-underline"></div>
          <div class="footer-bottom">
            © 2025 BrilientTech. All Rights Reserved.
          </div>
        </div>
      </FadeWrapper>
    </div>
  );
}
