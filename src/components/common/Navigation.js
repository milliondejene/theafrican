import React, { useState, useEffect } from "react";
import { Link } from "gatsby";
import useScroll from "../../hooks/useScroll"; // Custom hook for scroll logic

const Navigation = ({
  categories,
  activeCategory,
  handleCategoryClick,
  activeSubcategories,
  handleSubcategoryClick,
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isCategorySelected, setIsCategorySelected] = useState(false); // Track if category is selected
  const { isScrolled } = useScroll(); // Detect if the user has scrolled

  // Update screen size on component mount
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initialize state on load

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Update isCategorySelected when the activeCategory changes
  useEffect(() => {
    setIsCategorySelected(!!activeCategory); // Set true if category is selected
  }, [activeCategory]);

  return (
    <nav>
      <div className="scrollable-container">
        <ul
          className="nav-list"
          style={{
            overflowX: "auto",
            whiteSpace: "nowrap",
            display: "flex",
            justifyContent: isMobile ? "flex-start" : "center",
            gap: "1rem",
          }}
        >
          {categories.map((category) => (
            <li key={category.id} className="nav-item">
              <button
                onClick={() => {
                  handleCategoryClick(category.slug);
                  setIsCategorySelected(true); // Mark category as selected
                }}
                className={`category-button ${
                  activeCategory === category.slug ? "active" : ""
                }`}
              >
                {category.name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Separator is hidden until a category is selected */}
      {isCategorySelected && !isScrolled && ( // Only show when category is selected and not scrolled
        <hr className="separator" />
      )}

      {activeCategory && !isScrolled && ( // Hide subcategories when scrolling
        <div className="submenu-container">
          <div className="subcategories">
            {activeSubcategories.map((subcategory) => (
              <Link
                to={`/${activeCategory}/${subcategory.slug}/`}
                key={subcategory.id}
                className={`subcategory-link ${
                  activeCategory === subcategory.slug ? "active" : ""
                }`}
                onClick={() => handleSubcategoryClick(subcategory.slug)}
              >
                {subcategory.name}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Mobile-specific separator, hidden on mobile */}
      <hr
        className="separator-mob"
        style={{
          display: isMobile || isScrolled ? "none" : "block", // Hide separator on mobile or scroll
        }}
      />
    </nav>
  );
};

export default Navigation;
