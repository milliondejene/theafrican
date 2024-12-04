// components/Subcategories.js
import React from "react";

const Subcategories = ({ subcategories, activeSubcategory, onSubcategoryClick, activeCategory }) => (
  <div className="submenu-container">
    {subcategories.length > 0 ? (
      <div className="subcategories">
        {subcategories.map((subcategory) => (
          <button
            key={subcategory.id}
            className={`subcategory-link ${activeSubcategory === subcategory.slug ? "active" : ""}`}
            onClick={() => onSubcategoryClick(subcategory.slug)}
          >
            {subcategory.name}
          </button>
        ))}
      </div>
    ) : (
      <p>No subcategories available.</p>
    )}
  </div>
);

export default Subcategories;
