import React, { useRef, useEffect } from "react";
import { FaMapMarkerAlt, FaPhoneAlt, FaArrowRight } from "react-icons/fa";
import "./map.css";

import A1 from "../../assets/images/amexiq-1.png";
import A2 from "../../assets/images/amexiq-2.png";
import A3 from "../../assets/images/amexiq-3.png";
import A4 from "../../assets/images/amexiq-4.png";
import FadeWrapper from "../FadeOnScroll/FadeOnScroll";

const branches = [
  {
    name: "Dubai Branch",
    address: "123 Main St, Dubai, UAE",
    phone: "+971 123 456 789",
    image: A1,
    mapLink: "https://goo.gl/maps/Xz2ZVphZt6o",
  },
  {
    name: "Sharjah Branch",
    address: "456 Central Rd, Sharjah, UAE",
    phone: "+971 987 654 321",
    image: A2,
    mapLink: "https://goo.gl/maps/Fx3NvEYF9F12",
  },
  {
    name: "Abu Dhabi Branch",
    address: "789 Corniche Rd, Abu Dhabi, UAE",
    phone: "+971 555 123 456",
    image: A3,
    mapLink: "https://goo.gl/maps/NMf5sVkG62w",
  },
  {
    name: "Ajman Branch",
    address: "321 Beach Rd, Ajman, UAE",
    phone: "+971 444 888 999",
    image: A4,
    mapLink: "https://goo.gl/maps/NMf5sVkG62w",
  },
];

const BranchesSection = () => {
  const scrollRef = useRef(null);

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
        {branches.map((branch, idx) => (
          <div className="branch-card-new" key={idx}>
            <img src={branch.image} alt={branch.name} className="branch-bg" />
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
                <a href={`tel:${branch.phone}`} className="branch-btn">
                  Call Now
                </a>
                <a
                  href={branch.mapLink}
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
