import React, { useEffect, useState } from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import "./menu.css";
import Burger from "../../assets/images/thumb-1.png";
import Noodles from "../../assets/images/thumb-5.png";
import Pizza from "../../assets/images/thumb-2.png";
import Biryani from "../../assets/images/thumb-7.png";
import Roll from "../../assets/images/thumb-8.png";
import Sandwich from "../../assets/images/thumb-6-1.png";
import { Star } from "@mui/icons-material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import FadeWrapper from "../FadeOnScroll/FadeOnScroll";

export default function Menu() {
  const menuItems = [
    {
      id: 1,
      categories: "main dishes",
      name: "Burger",
      price: "",
      description:
        "Sink your teeth into our delicious beef burger, grilled to perfection and stacked with crisp lettuce, juicy tomatoes, onions, and melted cheese. Served on a toasted sesame bun with our signature special sauce.",
      image: Burger,
      reviews: "4.8k",
      rating: 5,
    },
    {
      id: 2,
      name: "Noodles",
      price: "",
      categories: "main dishes",
      description:
        "Enjoy our savory stir-fried noodles tossed with colorful vegetables and a rich garlic-soy sauce. Lightly seasoned and cooked with just the right balance of spice and flavor.",
      image: Noodles,
      reviews: "3.6k",
      rating: 4,
    },
    {
      id: 3,
      name: "Pizza",
      price: "",
      categories: "main dishes",
      description:
        "Our stone-baked pizza features a thin, crispy crust topped with rich tomato sauce, fresh mozzarella, and fragrant basil leaves.",
      image: Pizza,
      reviews: "4.2k",
      rating: 4,
    },
    {
      id: 4,
      name: "Biryani",
      price: "",
      categories: "drinks",
      description:
        "A royal dish crafted with fragrant basmati rice, marinated chicken, caramelized onions, and a perfect blend of spices.",
      image: Biryani,
      reviews: "5.1k",
      rating: 5,
    },
    {
      id: 5,
      name: "Roll",
      price: "",
      categories: "dessert",
      description:
        "Try our flavorful roll packed with grilled chicken, tangy sauces, fresh lettuce, and crispy onions. All wrapped inside a warm, soft flatbread.",
      image: Roll,
      reviews: "3.9k",
      rating: 4,
    },
    {
      id: 6,
      name: "Sandwich",
      price: "",
      categories: "drinks",
      description:
        "Our grilled sandwich is made with fresh garden vegetables, cheese slices, and house-made spreads layered between toasted bread.",
      image: Sandwich,
      reviews: "6.2k",
      rating: 5,
    },
  ];

  const path = useLocation();
  const [activeCategory, setActiveCategory] = useState("All Dishes");
  const [finaldata, setFinalData] = useState([]);
  const categories = [
    "All Dishes",
    "Dessert",
    "Drinks",
    "Main Dishes",
    "Starters",
  ];

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
        (item) => item.categories.toLowerCase() === activeCategory.toLowerCase()
      );
      setFinalData(filteredData);
    }
  }, [activeCategory]);

  const isMenuPage = path.pathname === "/menu";

  return (
    <>
      {isMenuPage && (
        <section className="menu-banner">
          <div className="menu-content">
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
                  key={item.id}
                >
                  <div className="menu-item-image" tabIndex="0">
                    <img src={item.image} alt={item.name} />
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
                      {item.description.length > 60
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
