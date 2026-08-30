import React, { useState, useEffect } from "react";
import "./footer.css";
import Pin from "../../assets/images/location.png";
import Phone from "../../assets/images/phone-call.png";
import Mail from "../../assets/images/at.png";
import Headerlogo from "../../assets/images/header-logo.png";
import IbCafeLogo from "../../assets/images/ib_cafe_logo.jpg";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import InstagramIcon from "@mui/icons-material/Instagram";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { Link } from "react-router-dom";
import FadeWrapper from "../FadeOnScroll/FadeOnScroll";
import { sanityClient, urlFor } from "../../sanity/client";
import { galleryImagesQuery } from "../../sanity/queries";

// Add/edit your social profiles here — each entry needs an icon and a url.
const socialLinks = [
  { name: "WhatsApp", icon: WhatsAppIcon, url: "https://wa.me/971557347125" },
  // { name: "Facebook", icon: FacebookIcon, url: "https://facebook.com/" },
  { name: "Instagram", icon: InstagramIcon, url: "https://www.instagram.com/amexiq?igsi=eDJtdnJwN254OHNi" },
];

export default function Footer() {
  const [instaImages, setInstaImages] = useState([]);

  useEffect(() => {
    sanityClient
      .fetch(galleryImagesQuery)
      .then((data) => setInstaImages(data.slice(0, 4)))
      .catch((err) => console.error("Failed to fetch gallery images:", err));
  }, []);

  return (
    <div className="footer-container">
      <FadeWrapper baseDelay={0} gap={150}>
        <div className="footer-content">
          <div className="footer-head">
            <div className="footer-main">
              <div className="footer-logos">
                <img className="footer-logo" src={Headerlogo} alt="Amexiq" />
                <img
                  className="footer-logo footer-logo-partner"
                  src={IbCafeLogo}
                  alt="IB Cafe"
                />
              </div>
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
                  <span><a href="mailto:info@amexiq.com" target="_blank" rel="noopener noreferrer">info@amexiq.com</a></span>
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

            {/* Gallery Preview Section */}
            <div className="footer-insta">
              <h2>From Our Gallery</h2>

              <div className="insta-img">
                {instaImages.map((img) => (
                  <img
                    key={img._id}
                    src={img.image ? urlFor(img.image).width(200).url() : undefined}
                    alt={img.title || "Gallery photo"}
                  />
                ))}
              </div>
              <div className="More-button">
                <Link to="gallery">See More</Link>
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
