import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Amexiq1 from "../../assets/images/amexiq-1.png";
import Package from "../../assets/images/pack.png";
import FadeWrapper from "../FadeOnScroll/FadeOnScroll";
import "./aboutus.css";
import { sanityClient, urlFor } from "../../sanity/client";
import { aboutUsQuery } from "../../sanity/queries";

const fallbackParagraphs = [
  "Launched in 2007 in the UAE, AmexiQ Café has been delighting visitors with high-quality snacks, sweet treats, and specialty beverages. Our passion is creating memorable food experiences, from buttery nachos and gourmet popcorn to sweet crepes and refreshing slushes.",
  "With outlets across Dubai and Abu Dhabi, we combine a cozy, modern café ambience with innovative flavors, premium ingredients, and friendly service. Every visit promises fun, flavor, and a little touch of magic.",
  "Our mission is simple: serve the finest food and snacks with care and creativity, making every bite enjoyable and every cup memorable. Welcome to AmexiQ Café!",
];

export default function AboutSection() {
  const [aboutData, setAboutData] = useState(null);

  useEffect(() => {
    sanityClient
      .fetch(aboutUsQuery)
      .then((data) => setAboutData(data))
      .catch((err) => console.error("Failed to fetch About Us content:", err));
  }, []);

  const heading = aboutData?.heading || "We are doing more than you expect";
  const paragraphs = aboutData?.body
    ? aboutData.body.split(/\n\s*\n/).filter(Boolean)
    : fallbackParagraphs;
  const points = aboutData?.points || [];
  const sectionImage = aboutData?.image
    ? urlFor(aboutData.image).width(700).url()
    : Amexiq1;

  return (
    <>
      <section className="about-banner">
        <div className="about-content">
          <p className="about-eyebrow">Our Story</p>
          <h1>About Us</h1>
          <div className="breadcrumb">
            <span className="home">Home</span>
            <span className="separator">›</span>
            <span className="current">About Us</span>
          </div>
        </div>
      </section>

      <section className="about-second-container">
        <div className="about-second-image">
          <div className="slide-second-wrapper">
            <img src={sectionImage} alt="Amexiq building" />
          </div>
        </div>

        <div className="about-details">
          <FadeWrapper baseDelay={0} gap={150}>
            <div className="about-dash">
              <span className="dash"></span>
              <span>About Us</span>
            </div>
            <h3>{heading}</h3>
            {paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </FadeWrapper>
        </div>
        <section className="about-points">
          {points.map((point, index) => (
            <div className="about-main-point" key={index}>
              <FadeWrapper baseDelay={0} gap={150}>
                <div className="about-second-point">
                  <div className="point-number">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <div className="point-header">
                    <h3>{point.title}</h3>
                    <p className="point-title">{point.description}</p>
                  </div>
                </div>
              </FadeWrapper>
            </div>
          ))}
        </section>
        <section className="about-package-content">
          <div className="package-details">
            <FadeWrapper baseDelay={0} gap={150}>
              <h2>Custom Packaging & Design</h2>
              <p>
                At <strong>AmexiQ</strong>, we specialize in creating unique and
                innovative packaging solutions — not just for snacks, but for a
                wide variety of products. Whether it’s custom food boxes, event
                packaging, or branded designs, our team blends creativity with
                functionality to deliver packaging that truly stands out and
                adds value to your brand.
              </p>
              <div className="package-buttons">
                <a href="tel:+971557347125" className="order-delivery">
                  📞 Call for Enquiry
                </a>
                <Link to="/contact" className="menu">
                  ✉️ Contact Us
                </Link>
              </div>
            </FadeWrapper>
          </div>
          <div className="package-image">
            <img src={Package} alt="Package-Image" />
          </div>
        </section>
      </section>
    </>
  );
}
