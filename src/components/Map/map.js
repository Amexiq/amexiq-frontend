import React, { useRef, useEffect, useState } from "react";
import { FaMapMarkerAlt, FaPhoneAlt, FaArrowRight } from "react-icons/fa";
import "./map.css";

import FadeWrapper from "../FadeOnScroll/FadeOnScroll";
import { sanityClient, urlFor } from "../../sanity/client";
import { branchesQuery } from "../../sanity/queries";

const BranchesSection = () => {
  const scrollRef = useRef(null);
  const [branches, setBranches] = useState([]);

  useEffect(() => {
    sanityClient
      .fetch(branchesQuery)
      .then((data) => setBranches(data))
      .catch((err) => console.error("Failed to fetch branches:", err));
  }, []);

  useEffect(() => {
    const slider = scrollRef.current;
    let isDown = false;
    let startX;
    let scrollLeft;

    const mouseDown = (e) => {
      isDown = true;
      slider.classList.add("active");
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    };

    const mouseLeave = () => {
      isDown = false;
      slider.classList.remove("active");
    };

    const mouseUp = () => {
      isDown = false;
      slider.classList.remove("active");
    };

    const mouseMove = (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 1.2; // drag speed multiplier
      slider.scrollLeft = scrollLeft - walk;
    };

    slider.addEventListener("mousedown", mouseDown);
    slider.addEventListener("mouseleave", mouseLeave);
    slider.addEventListener("mouseup", mouseUp);
    slider.addEventListener("mousemove", mouseMove);

    return () => {
      slider.removeEventListener("mousedown", mouseDown);
      slider.removeEventListener("mouseleave", mouseLeave);
      slider.removeEventListener("mouseup", mouseUp);
      slider.removeEventListener("mousemove", mouseMove);
    };
  }, []);

  return (
    <section className="branches-new">
                  <FadeWrapper baseDelay={0} gap={150}>

      <div className="branches-title">
        <h2>Our Locations</h2>
        <p>
          Discover our cafés across UAE — stylish spaces designed for{" "}
          <strong>comfort, taste, and unforgettable moments</strong>.
        </p>
      </div>

      <div className="branches-cards" ref={scrollRef}>
        {branches.map((branch) => (
          <div className="branch-card-new" key={branch._id}>
            <img
              src={branch.image ? urlFor(branch.image).width(500).url() : undefined}
              alt={branch.name}
              className="branch-bg"
            />
            <div className="branch-overlay"></div>

            <div className="branch-content">
              <h3>{branch.name}</h3>
              <p>
                <FaMapMarkerAlt /> {branch.address}
              </p>
              <p>
                <FaPhoneAlt /> {branch.phone}
              </p>
              <div className="branch-actions">
                <a href={`tel:${branch.phone || ""}`} className="branch-btn">
                  Call Now
                </a>
                <a
                  href={branch.mapLink || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="branch-btn outline"
                >
                  Get Directions <FaArrowRight />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
      </FadeWrapper>
    </section>
  );
};

export default BranchesSection;
