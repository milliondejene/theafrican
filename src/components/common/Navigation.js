import React, { useState, useEffect } from "react";
import { Link } from "gatsby";

const Navigation = ({
  categories,
  activeCategory,
  handleCategoryClick,
  activeSubcategories,
  handleSubcategoryClick,
}) => {
  const [isMobile, setIsMobile] = useState(false);

  // Update screen size on component mount
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initialize state on load

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav>
      <div className="scrollable-container">
        <ul className="nav-list">
          {categories.map((category) => (
            <li key={category.id} className="nav-item">
              <button
                onClick={() => handleCategoryClick(category.slug)}
                className={`category-button ${activeCategory === category.slug ? "active" : ""}`}
              >
                {category.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <hr className="separator" />
      {activeCategory && (
        <div className="submenu-container">
          <div className="subcategories">
            {activeSubcategories.map((subcategory) => (
              <Link
                to={`/${activeCategory}/${subcategory.slug}/`}
                key={subcategory.id}
                className={`subcategory-link ${activeCategory === subcategory.slug ? "active" : ""}`}
                onClick={() => handleSubcategoryClick(subcategory.slug)}
              >
                {subcategory.name}
              </Link>
            ))}
          </div>
        </div>
      )}
      {/* Apply inline style to hide separator-mob on mobile */}
      <hr
        className="separator-mob"
        style={{ display: isMobile ? "none" : "block" }}
      />
    </nav>
  );
};

export default Navigation;
