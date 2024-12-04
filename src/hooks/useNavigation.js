import React, { useState } from "react";
import { useNavigation } from "../../hooks/useNavigation";
import useCategories from "../../hooks/useCategories";
import useScroll from "../../hooks/useScroll";
import SideMenu from "../SideMenu";
import Navigation from "./Navigation";

const Header = () => {
  const { categories, getSubcategories } = useCategories();
  const { isScrolled } = useScroll();
  const { activeCategory, activeSubcategory, handleCategoryClick, handleSubcategoryClick } = useNavigation();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const activeSubcategories = getSubcategories(activeCategory);

  return (
    <header className={`header ${isScrolled ? "scrolled" : ""}`}>
      <div className="logo-container">
        <button onClick={toggleMenu}>☰</button>
        TheAfrican
        <button onClick={toggleMenu}>o.</button>
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
