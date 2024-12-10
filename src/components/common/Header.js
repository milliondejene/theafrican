import React, { useState } from "react";
import { navigate, Link } from "gatsby";
import { useLocation } from "@reach/router";
import useCategories from "../../hooks/useCategories"; // Custom hook for fetching categories and filtering subcategories
import useScroll from "../../hooks/useScroll"; // Custom hook for scroll logic
import useActiveCategory from "../../hooks/useActiveCategory"; // Custom hook for active category and subcategory
import SideMenu from "../SideMenu"; // Import the SideMenu component
import Navigation from "./Navigation"; // Import the Navigation component
import "./Header.css";
import { MdSearch } from "react-icons/md";
const Header = () => {
  const location = useLocation();
  const { categories, getSubcategories } = useCategories();
  const { isScrolled } = useScroll();
  const {
    activeCategory,
    activeSubcategory,
    setActiveCategory,
    setActiveSubcategory,
  } = useActiveCategory(location);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleCategoryClick = (categorySlug) => {
    setActiveCategory(categorySlug);
    setActiveSubcategory(null);
    navigate(`/${categorySlug}`);
    setIsMenuOpen(false);
  };

  const handleSubcategoryClick = (subcategorySlug) => {
    setActiveSubcategory(subcategorySlug);
    navigate(`/${activeCategory}/${subcategorySlug}/`);
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Fetch subcategories for the active category
  const activeSubcategories = getSubcategories(activeCategory);

  return (
    <header className={`header ${isScrolled ? "scrolled" : ""}`}>
      <div className="logo-container">
        {/* Left corner: Side menu and search icons */}
        <div className="left-icons">
          <button onClick={toggleMenu} className="menu-icon">
            {isMenuOpen ? "×" : "☰"}
          </button>
          <button className="search-icon">
            <MdSearch size={25} color="#333" />
          </button>
        </div>

        {/* Center: Brand Link with conditional styling */}
        <Link
          to="/"
          className={`brand-link ${isMenuOpen ? "brand-link-active" : ""}`}
        >
          TheAfrican
        </Link>

        {/* Right corner: Sign In and Register buttons */}
        <div className="right-buttons">
          <button className="register-button">Register</button>
          <button className="signin-button">Sign In</button>
        </div>
      </div>

      <hr className="separator" />

      <Navigation
        categories={categories}
        activeCategory={activeCategory}
        handleCategoryClick={handleCategoryClick}
        activeSubcategories={activeSubcategories}
        handleSubcategoryClick={handleSubcategoryClick}
      />

      <SideMenu
        categories={categories}
        subcategories={activeSubcategories}
        activeCategory={activeCategory}
        activeSubcategory={activeSubcategory}
        handleCategoryClick={handleCategoryClick}
        handleSubcategoryClick={handleSubcategoryClick}
        isMenuOpen={isMenuOpen}
        toggleMenu={toggleMenu}
      />

      {/* Dimmed overlay for the background */}
      <div
        className={`menu-overlay ${isMenuOpen ? "open" : ""}`}
        style={{
          visibility: isMenuOpen ? "visible" : "hidden",
          opacity: isMenuOpen ? "1" : "0",
          transition: "opacity 0.3s ease",
        }}
        onClick={toggleMenu}
      ></div>
    </header>
  );
};


export default Header;
