// src/components/common/Navigation.js
import React from "react";
import { Link } from "gatsby";

const Navigation = ({ categories, activeCategory, handleCategoryClick, activeSubcategories, handleSubcategoryClick }) => {
  return (
    <nav style={{ marginTop: "1rem" }}>
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
        <hr className="separator" />
    </nav>
  );
};

export default Navigation;
