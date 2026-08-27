import React, { useState } from "react";
import "./footer.css";
import Pin from "../../assets/images/location.png";
import Phone from "../../assets/images/phone-call.png";
import Mail from "../../assets/images/at.png";
import Headerlogo from "../../assets/images/header-logo.png";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import Amexiq1 from "../../assets/images/amexiq-1.png";
import Amexiq2 from "../../assets/images/amexiq-2.png";
import Amexiq3 from "../../assets/images/amexiq-3.png";
import Amexiq4 from "../../assets/images/amexiq-4.png";

import Amexiq5 from "../../assets/images/amexiq-4.png";

import { Link } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import FadeWrapper from "../FadeOnScroll/FadeOnScroll";

// Add/edit your social profiles here — each entry needs an icon and a url.
const socialLinks = [
  { name: "WhatsApp", icon: WhatsAppIcon, url: "https://wa.me/971557347125" },
  { name: "Facebook", icon: FacebookIcon, url: "https://facebook.com/" },
  { name: "Instagram", icon: InstagramIcon, url: "https://instagram.com/" },
];

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
                {socialLinks.map(({ name, icon: Icon, url }) => (
                  <a
                    key={name}
                    href={url}
                    aria-label={name}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon />
                  </a>
                ))}
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
                  <span><a href="tel:+971557347125" target="_blank" rel="noopener noreferrer">+971 55 734 7125</a></span>
                </li>
                <li>
                  <img src={Mail} alt="Email" />
                  <span><a href="mailto:info@amexiqae.com" target="_blank" rel="noopener noreferrer">info@amexiqae.com</a></span>
                </li>
              </ul>
              {/* <Link to="contact">Read More</Link> */}
            </div>

            {/* Opening Hours Section */}
            <div className="footer-Hour">
              <h2>Opening Hours</h2>
              <p className="hours-text">
                <AccessTimeIcon />
                We're open every day, 08:00 AM – 08:00 PM
              </p>
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
                <span></span>
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
          <div className="footer-bottom">
            © {new Date().getFullYear()} Amexiq. All Rights Reserved.
          </div>
        </div>
      </FadeWrapper>
    </div>
  );
}
