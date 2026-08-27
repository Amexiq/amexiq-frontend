import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./header.css";
import Headerlogo from "../../assets/images/header-logo.png";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const navlinks = [
    { to: "/", label: "Home" },
    { to: "about", label: "About" },
    { to: "menu", label: "Menu" },
    { to: "gallery", label: "Gallery" },
    { to: "contact", label: "Contact" },
  ];

  return (
    <nav className="navbar">
      <div className={`navbar-container ${scrolled ? "scrolled" : ""}`}>
        <div className="nav-logo-menu">
          <div className="navbar-logo">
            <img src={Headerlogo} alt="Amexiq Logo" />
          </div>
          <div className="tooglebutton">
            <button onClick={toggleMenu}>
              {isOpen ? (
                <CloseRoundedIcon className="icon slide-in" />
              ) : (
                <MenuRoundedIcon className="icon slide-in" />
              )}
            </button>
          </div>
        </div>

        <ul className={`navbar-links ${isOpen ? "open" : ""}`}>
          {navlinks.map((link, index) => (
            <li key={index}>
              <NavLink
                to={link.to}
                className={({ isActive }) => (isActive ? "active" : "")}
                onClick={handleClose}
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
