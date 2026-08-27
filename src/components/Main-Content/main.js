
import React, { useRef, useState } from "react";
import Popcorn from "../../assets/images/popcorn.png";
import Nachos from "../../assets/images/nachos.png";
import Mini from "../../assets/images/mini.png";
import Sweet from "../../assets/images/sweet.png";
import French from "../../assets/images/french.png";
import "./main.css";
import { Link } from "react-router-dom";
import FadeWrapper from "../FadeOnScroll/FadeOnScroll";


export default function MainContent() {
  const products = [
    {
      id: 1,
      name: "Coffee Cup",
      img: Popcorn,
      oldPrice: "₹450.00",
      newPrice: "₹350.00",
      rating: 4,
    },
    {
      id: 2,
      name: "Cold Brew",
      img: Nachos,
      oldPrice: "₹750.00",
      newPrice: "₹700.00",
      rating: 5,
    },
    {
      id: 3,
      name: "Mini Bites",
      img: Mini,
      oldPrice: "₹500.00",
      newPrice: "₹420.00",
      rating: 3,
    },
    {
      id: 4,
      name: "Sweet Delight",
      img: Sweet,
      oldPrice: "₹600.00",
      newPrice: "₹520.00",
      rating: 4,
    },
    {
      id: 5,
      name: "French Roast",
      img: French,
      oldPrice: "₹800.00",
      newPrice: "₹750.00",
      rating: 2,
    },
  ];

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
            <div className="product-card" key={product.id}>
              <img src={product.img} alt={product.name} />
              <h3>{product.name}</h3>

              {/* Dynamic Star Rating */}
              {renderStars(product.rating)}

              {/* <p className="price">
      <span className="old">{product.oldPrice}</span> {product.newPrice}
    </p> */}

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
