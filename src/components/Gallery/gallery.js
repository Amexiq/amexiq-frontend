import React, { useState, useEffect } from "react";
import "./gallery.css";
import Masonry from "react-masonry-css";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";

import FadeWrapper from "../FadeOnScroll/FadeOnScroll";
import { sanityClient, urlFor } from "../../sanity/client";
import { galleryImagesQuery } from "../../sanity/queries";

export default function Gallery() {
  const [cafeGalleryImages, setCafeGalleryImages] = useState([]);

  useEffect(() => {
    sanityClient
      .fetch(galleryImagesQuery)
      .then((data) =>
        setCafeGalleryImages(
          data.map((item) => ({
            title: item.title,
            category: item.category,
            url: item.image ? urlFor(item.image).width(600).url() : "",
          }))
        )
      )
      .catch((err) => console.error("Failed to fetch gallery images:", err));
  }, []);

  const categories = [
    "All",
    ...Array.from(
      new Set(cafeGalleryImages.map((img) => img.category).filter(Boolean))
    ),
  ];

  const breakpoints = { default: 4, 1100: 3, 700: 2, 500: 2 };


  const [activeCategory, setActiveCategory] = useState("All");
  const [startIndex, setStartIndex] = useState(0);
  const [finaldata, setFinaldata] = useState([]);
  const [visibleCount, setVisibleCount] = useState(5);

  const calculateVisibleCount = () => {
    const width = window.innerWidth;
    if (width < 400) return 2;
    if (width < 600) return 3;
    if (width < 992) return 4;
    return 5;
  };

  useEffect(() => {
    const handleResize = () => setVisibleCount(calculateVisibleCount());
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  const handleNext = () =>
    setStartIndex((prev) => (prev + 1) % categories.length);
  const handlePrev = () =>
    setStartIndex((prev) => (prev - 1 + categories.length) % categories.length);


  // Generate circular visible categories
  const visibleCategories = [];
  const slotCount = Math.min(visibleCount, categories.length);
  for (let i = 0; i < slotCount; i++) {
    visibleCategories.push(categories[(startIndex + i) % categories.length]);
  }

  // Filter images based on active category
  useEffect(() => {
    if (activeCategory === "All") {
      setFinaldata(cafeGalleryImages);
    } else {

      setFinaldata(
        cafeGalleryImages.filter((photo) => photo.category === activeCategory)
      );

    }
  }, [activeCategory, cafeGalleryImages]);

  return (
    <>
      <section className="galley-banner">
        <div className="galley-content">
          <p className="galley-eyebrow">Moments & Memories</p>
          <h1>Our Gallery</h1>
          <div className="breadcrumb">
            <span className="home">Home</span>
            <span className="separator">›</span>
            <span className="current">Gallery</span>
          </div>
        </div>
      </section>
      <FadeWrapper baseDelay={0} gap={150}>
        <section className="gallery-second-content">
          <div className="gallery-category">
            {visibleCount < categories.length && (
              <button onClick={handlePrev}>
                <KeyboardArrowLeftIcon />
              </button>
            )}
            <ul>
              {visibleCategories.map((category) => (
                <li
                  key={category}
                  className={activeCategory === category ? "active" : ""}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </li>
              ))}
            </ul>
            {visibleCount < categories.length && (
              <button onClick={handleNext}>
                <ChevronRightIcon />
              </button>
            )}
          </div>


          <Masonry
            breakpointCols={breakpoints}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {finaldata.length === 0 && <h2>No images found</h2>}
            {finaldata.map((image, index) => (
              <img
                key={index}
                src={image.url}
                alt={image.title}
                loading="lazy"
              />
            ))}
          </Masonry>
        </section>
      </FadeWrapper>

    </>
  );
}
