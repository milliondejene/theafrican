import React, { useState } from "react"
import { navigate, Link } from "gatsby"
import { useLocation } from "@reach/router"
import useCategories from "../../hooks/useCategories" // Custom hook for fetching categories and filtering subcategories
import useScroll from "../../hooks/useScroll" // Custom hook for scroll logic
import useActiveCategory from "../../hooks/useActiveCategory" // Custom hook for active category and subcategory
import SideMenu from "../SideMenu" // Import the SideMenu component
import Navigation from "./Navigation" // Import the Navigation component
import "./Header.css"
import { MdSearch } from "react-icons/md"

const Header = () => {
  const location = useLocation();
  const { categories, getSubcategories } = useCategories();
  const { isScrolled } = useScroll();
  const { activeCategory, activeSubcategory, setActiveCategory, setActiveSubcategory } = useActiveCategory(location);

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
      <div 
        className="logo-container" 
        style={{
          zIndex: isMenuOpen ? "9999" : "10",  // Ensure logo is always on top
          backgroundColor: isMenuOpen ? "#fff" : "transparent", // White background for active menu
        }}
      >
        {/* Menu Icon - toggles between hamburger and close icon */}
        <button onClick={toggleMenu} className="menu-icon">
          {isMenuOpen ? "×" : "☰"} {/* Change icon when the menu is open */}
        </button>
        <Link 
          to="/" 
          className="brand-link" 
          style={{
            textDecoration: 'none', // Removes the underline
            fontSize: '1.2rem', // Adjust the font size for the brand
            fontWeight: 'bold', // Make the brand name bold
            color: '#333', // Set the brand color to dark grey
            letterSpacing: '1px', // Optional: Adjust letter spacing for a clean look
            transition: 'color 0.3s ease', // Smooth transition for hover color change
          }}
        >
          TheAfrican
        </Link>

        {/* Right button - toggles between 'o.' and search icon */}
        <button className="search-icon">
          <MdSearch size={30} color="#333" />
        </button>
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

export default Header
