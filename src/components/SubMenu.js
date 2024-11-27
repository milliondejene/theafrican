import React from "react";

const Submenu = ({ isActive, subcategories }) => {
  return (
    <ul className={`submenu ${isActive ? "visible" : ""}`}>
      {subcategories.map((subcategory) => (
        <li key={subcategory.url}>
          <a href={subcategory.url}>{subcategory.label}</a>
        </li>
      ))}
    </ul>
  );
};

export default Submenu;
