import React, { useEffect, useState } from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import "./menu.css";
import { Star } from "@mui/icons-material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import FadeWrapper from "../FadeOnScroll/FadeOnScroll";
import { sanityClient, urlFor } from "../../sanity/client";
import { menuItemsQuery, menuCategoriesQuery } from "../../sanity/queries";

export default function Menu() {
  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState(["All Dishes"]);

  useEffect(() => {
    sanityClient
      .fetch(menuItemsQuery)
      .then((data) => setMenuItems(data))
      .catch((err) => console.error("Failed to fetch menu items:", err));

    sanityClient
      .fetch(menuCategoriesQuery)
      .then((data) =>
        setCategories(["All Dishes", ...data.map((c) => c.name)])
      )
      .catch((err) => console.error("Failed to fetch menu categories:", err));
  }, []);

  const path = useLocation();
  const [activeCategory, setActiveCategory] = useState("All Dishes");
  const [finaldata, setFinalData] = useState([]);

  const [currentIndex, setCurrentIndex] = useState(0);

  // Set active category whenever index changes
  useEffect(() => {
    setActiveCategory(categories[currentIndex]);
  }, [currentIndex]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === categories.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? categories.length - 1 : prevIndex - 1
    );
  };

  const navigate = useNavigate();

  const HandleNavigate = () => {
    navigate("/menu");
  };

  useEffect(() => {
    if (activeCategory.toLowerCase() === "all dishes") {
      setFinalData(menuItems);
    } else {
      const filteredData = menuItems.filter(
        (item) =>
          (item.categories || "").toLowerCase() === activeCategory.toLowerCase()
      );
      setFinalData(filteredData);
    }
  }, [activeCategory, menuItems]);

  const isMenuPage = path.pathname === "/menu";

  return (
    <>
      {isMenuPage && (
        <section className="menu-banner">
          <div className="menu-content">
            <p className="menu-banner-eyebrow">What We Serve</p>
            <h1>Our Menu</h1>
            <div className="breadcrumb">
              <span className="home">Home</span>
              <span className="separator">›</span>
              <span className="current">Menu</span>
            </div>
          </div>
        </section>
      )}

      <section className="menu-content">

        <FadeWrapper baseDelay={0} gap={150}>
          <div
            className="menu-main"
            style={
              isMenuPage
                ? {
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    height: "100%",
                  }
                : {}
            }
          >
            <h1>Choose Your Favorite Snacks & Treats</h1>
            <div className="menu-title">
              <p>
                Explore our delicious selection of popcorn, nachos, corn, and
                more — crafted to satisfy every craving.
              </p>

              {path.pathname !== "/menu" && (
                <button onClick={HandleNavigate}>
                  Full Menu&nbsp;
                  <ArrowForwardIcon style={{ fontSize: "18px" }} />
                </button>
              )}
            </div>

          </div>

          {path.pathname === "/menu" && (
            <div className="menu-category">
              <ul>
                {categories.map((category) => (
                  <li
                    key={category}
                    className={activeCategory === category ? "active" : ""}
                    onClick={() => setActiveCategory(category)}
                  >
                    {category}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div
            className={`menu-wrapper ${
              finaldata.length === 1 ? "single-item" : ""
            }`}
          >
            {finaldata.length === 0 ? (
              <p className="no-items-message">No Item Found in category</p>
            ) : (
              finaldata.map((item, index) => (
                <div
                  className="menu-item"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  key={item._id}
                >
                  <div className="menu-item-image" tabIndex="0">
                    <img
                      src={
                        item.image
                          ? urlFor(item.image).width(400).url()
                          : undefined
                      }
                      alt={item.name}
                    />
                    <div className="menu-model">{item.description}</div>
                  </div>

                  <div className="menu-item-details">
                    <div className="menu-item-header">
                      <h2>{item.name}</h2>
                      <div className="menu-line"></div>
                      <div className="menu-rating">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            style={{
                              color: i < item.rating ? "#f15b2a" : "#ccc",
                              fontSize: "18px",
                            }}
                          />
                        ))}
                        <span className="menu-reviews">
                          ({item.reviews} Reviews)
                        </span>
                      </div>
                    </div>

                    <p className="menu-description">
                      {(item.description || "").length > 60
                        ? item.description.substring(0, 55) + "..."
                        : item.description}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </FadeWrapper>
      </section>
    </>
  );
}
