import React, { useState, useRef } from "react";
import { navigate, Link } from "gatsby";
import { useLocation } from "@reach/router";
import useCategories from "../../hooks/useCategories";
import useScroll from "../../hooks/useScroll";
import useActiveCategory from "../../hooks/useActiveCategory";
import SideMenu from "../SideMenu";
import Navigation from "./Navigation";
import { MdSearch } from "react-icons/md";
import "./Header.css";

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

  // Ref to trigger focus on search input
  const searchInputRef = useRef(null);

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

  const handleSearchClick = () => {
    setIsMenuOpen(true);
    // Focus on the search input when the menu opens
    setTimeout(() => {
      if (searchInputRef.current) {
        searchInputRef.current.focus();
      }
    }, 300); // Add a slight delay to ensure the menu is fully open
  };

  const activeSubcategories = getSubcategories(activeCategory);

  return (
    <header className={`header ${isScrolled ? "scrolled" : ""}`}>
      <div className="logo-container">
        <div className="left-icons">
          <button onClick={toggleMenu} className="menu-icon">
            {isMenuOpen ? "X" : "☰"}
          </button>
          <button onClick={handleSearchClick} className="search-icon">
            <MdSearch size={25} color="#333" />
          </button>
        </div>

        <Link
          to="/"
          className={`brand-link ${isMenuOpen ? "brand-link-active" : ""}`}
        >
          TheAfrican
        </Link>

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
        searchInputRef={searchInputRef} // Pass the ref to SideMenu
      />

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
