import React, { useEffect, useRef, useState } from "react";
import Amexiq1 from "../../assets/images/amexiq-1.png";
import Package from "../../assets/images/pack.png";
import FadeWrapper from "../FadeOnScroll/FadeOnScroll";
import "./aboutus.css";

export default function AboutSection() {
  const Points = [
    {
      number: "01",
      heading: "Located in the Heart of the City",
      title:
        "AmexiQ Café is conveniently situated in the city center, making it easy to stop by for a coffee or snack anytime.",
    },
    {
      number: "02",
      heading: "Fresh Ingredients, Always",
      title:
        "We use only high-quality, fresh ingredients for our coffee, pastries, and snacks to ensure every bite is delicious.",
    },
    {
      number: "03",
      heading: "Artisan Coffee & Bold Flavors",
      title:
        "Our expert baristas craft each coffee with care, bringing bold and memorable flavors to every cup.",
    },
    {
      number: "04",
      heading: "Handmade Snacks & Treats",
      title:
        "From buttery popcorn and cheesy nachos to sweet delights, everything is freshly prepared for maximum flavor.",
    },
    {
      number: "05",
      heading: "Cozy & Modern Café Ambience",
      title:
        "Relax and unwind in our stylish, welcoming space, perfect for casual meetups or solo coffee breaks.",
    },
    {
      number: "06",
      heading: "Friendly & Experienced Team",
      title:
        "Our team is passionate about coffee and snacks, providing warm, professional service every time you visit.",
    },
  ];

  return (
    <>
      <section className="about-banner">
        <div className="about-content">
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
            <img src={Amexiq1} alt="Amexiq building" />
          </div>
        </div>

        <div className="about-details">
          <FadeWrapper baseDelay={0} gap={150}>
            <div className="about-dash">
              <span className="dash"></span>
              <span>About Us</span>
            </div>
            <h3>We are doing more than you expect</h3>
            <p>
              Launched in 2007 in the UAE, AmexiQ Café has been delighting
              visitors with high-quality snacks, sweet treats, and specialty
              beverages. Our passion is creating memorable food experiences,
              from buttery nachos and gourmet popcorn to sweet crepes and
              refreshing slushes.
            </p>
            <p>
              With outlets across Dubai and Abu Dhabi, we combine a cozy, modern
              café ambience with innovative flavors, premium ingredients, and
              friendly service. Every visit promises fun, flavor, and a little
              touch of magic.
            </p>
            <p>
              Our mission is simple: serve the finest food and snacks with care
              and creativity, making every bite enjoyable and every cup
              memorable. Welcome to AmexiQ Café!
            </p>
          </FadeWrapper>
        </div>
        <section className="about-points">
          {Points.map((items, index) => (
            <div className="about-main-point">
              <FadeWrapper baseDelay={0} gap={150}>
                <div className="about-second-point">
                  <div className="point-number">{items.number}</div>
                  <div className="point-header">
                    <h3>{items.heading}</h3>
                    <p className="point-title">{items.title}</p>
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
                <button className="order-delivery">📞 Call for Enquiry</button>
                <button className="menu">✉️ Contact Us</button>
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
