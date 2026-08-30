
import React, { useRef, useState, useEffect } from "react";
import "./main.css";
import { Link } from "react-router-dom";
import FadeWrapper from "../FadeOnScroll/FadeOnScroll";
import { sanityClient, urlFor } from "../../sanity/client";
import { menuItemsQuery } from "../../sanity/queries";

const MAX_HOME_PRODUCTS = 5;

export default function MainContent() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    sanityClient
      .fetch(menuItemsQuery)
      .then((items) => {
        const featured = items.filter((item) => item.featured);
        const chosen =
          featured.length > 0
            ? featured
            : [...items].sort((a, b) => (b.rating || 0) - (a.rating || 0));
        setProducts(chosen.slice(0, MAX_HOME_PRODUCTS));
      })
      .catch((err) => console.error("Failed to fetch menu items:", err));
  }, []);

  const scrollRef = useRef(null);
  function renderStars(rating) {
    const totalStars = 5;
    return (
      
      <div className="stars">
        {[...Array(totalStars)].map((_, index) => {
          const starNumber = index + 1;
          return (
            <span
              key={index}
              className={starNumber <= rating ? "star filled" : "star"}
            >
              ★
            </span>
          );
        })}
      </div>
    );
  }


  return (
    <>
    <div>

     
    </div>
    <div className="main-content">

      {/* Left Section */}

      <div className="main-text">
                    <FadeWrapper baseDelay={0} gap={150}>
        
        <span className="highlight">Satisfy Your Cravings</span>
        <h2>Delicious Snacks for Every Mood</h2>
        <p>
          From buttery popcorn and cheesy nachos to sweet roasted corn, we have
          a variety of tasty treats to delight every snack lover. Perfect for a
          quick bite or sharing with friends.
        </p>
        <div className="btn-group">
          <Link to="/menu" className="btn-primary">
            Explore Snacks
          </Link>
          <Link to="/menu" className="btn-outline">
            Try Our Popcorn Mix
          </Link>
        </div>
        </FadeWrapper>
      </div>

      {/* Right Section */}
      <div className="products-wrapper">
        <div className="main-products" ref={scrollRef}>
          {products.map((product) => (
            <div className="product-card" key={product._id}>
              <img
                src={
                  product.image
                    ? urlFor(product.image).width(300).url()
                    : undefined
                }
                alt={product.name}
              />
              <h3>{product.name}</h3>

              {/* Dynamic Star Rating */}
              {renderStars(product.rating)}

              <Link to="/menu" className="cart-btn">
                View More
              </Link>
            </div>
          ))}
        </div>

      </div>
    </div>
    </>
  );
}
