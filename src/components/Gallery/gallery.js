import React, { useState, useEffect } from "react";
import "./gallery.css";
import Masonry from "react-masonry-css";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";

import FadeWrapper from "../FadeOnScroll/FadeOnScroll";


export default function Gallery() {
  const categories = ["All", "Events", "Exterior", "Interior", "Menu"];

  const cafeGalleryImages = [
    // Events
    {
      title: "Poetry Slam Night",
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTb1GgCxytscQyiUv0ICdSUEZ32xgGkUa5EZA&s",
      source: "Freepik",
      category: "Events",
    },
    {
      title: "Stand-up Comedy Show",
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRc-Rs6hrOLszxSnYIeds2-PTO66DIYqp-3Kg&s",
      source: "Freepik",
      category: "Events",
    },
    {
      title: "Tasting Event",
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbovu1lvl4ew6XKwdW_HUyKxI4JdnIPSGGXg&s",
      source: "Freepik",
      category: "Events",
    },
    {
      title: "Cooking Class",
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSL1ZUVJ9PKY3WOD4UynXzYimXdDeo97Bgsmw&s",
      source: "Freepik",
      category: "Events",
    },
    {
      title: "Photography Exhibition",
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfWlKVv0i-4VTLxyVuolucW4R4t833o8VMSQ&s",
      source: "Freepik",
      category: "Events",
    },

    // Interior
    {
      title: "Modern Coffee Shop Interior",
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1Q_TO9AUVoNsUf1WB51G_bVeurmbIlAY-qw&s",
      source: "Pexels",
      category: "Interior",
    },
    {
      title: "Rustic Café with Plants",
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYrgNgm0HKE2Zjb7xq93W-kqg_w0462THipw&s",
      source: "Unsplash",
      category: "Interior",
    },
    {
      title: "Minimal Café Decor",
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjH4L07YRS_XjGanpkWZbmUqLDp93Ix_N4cYt99XkXdTtRkZJxZBKwNwBZ5Mws1U4S3so&usqp=CAU",
      source: "Unsplash",
      category: "Interior",
    },

    // Menu
    {
      title: "Chalkboard Menu Design",
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5Q0UO-RzWgz4P3nzuNII2LwkyuCR4pPlPoQ&s",
      source: "Unsplash",
      category: "Menu",
    },
    {
      title: "Modern Menu Layout",
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQu102okO5GTLl0ACxYTbkNemtJ6VAzwDJk0g&s",
      source: "Unsplash",
      category: "Menu",
    },
    {
      title: "Vintage Café Menu",
      url: "https://images.deliveryhero.io/image/talabat/MenuItems/mmw_638654672469944363",
      source: "Unsplash",
      category: "Menu",
    },
    {
      title: "Handwritten Menu Board",
      url: "https://www.seriouseats.com/thmb/YBUAG17xy1nWYGPmFcJKeoODTzk=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/cheese-sauce-for-cheese-fries-and-nachos-hero-01-e6ccf966688c43ec8025cf9a19678423.jpg",
      source: "Pexels",
      category: "Menu",
    },
    {
      title: "Minimalist Menu Design",
      url: "https://www.foodandwine.com/thmb/DI29Houjc_ccAtFKly0BbVsusHc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/crispy-comte-cheesburgers-FT-RECIPE0921-6166c6552b7148e8a8561f7765ddf20b.jpg",
      source: "Pexels",
      category: "Menu",
    },
    {
      title: "Colorful Menu Display",
      url: "https://www.nestleprofessional.in/sites/default/files/2024-10/Coconut-Ice-cream-756x471_5_11zon.jpg",
      source: "Pexels",
      category: "Menu",
    },
    {
      title: "Elegant Menu Presentation",
      url: "https://img.freepik.com/premium-psd/refreshing-fruit-smoothies-glasses-with-fresh-fruit_632498-51074.jpg",
      source: "Unsplash",
      category: "Menu",
    },
    {
      title: "Café Specials Board",
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBw5DiY_bQsKP6Pr2E1cPdkOYw0l9WJCCorQ&s",
      source: "Unsplash",
      category: "Menu",
    },
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
  for (let i = 0; i < visibleCount; i++) {
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
  }, [activeCategory]);

  return (
    <>
      <section className="galley-banner">
        <div className="galley-content">
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
