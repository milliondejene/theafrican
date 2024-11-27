import React, { useState } from "react";
import Submenu from "./SubMenu"; // Import Submenu component

const Menu = ({ label, url, subcategories }) => {
  const [isActive, setIsActive] = useState(false);

  const handleMouseEnter = () => {
    setIsActive(true);
  };

  const handleMouseLeave = () => {
    setIsActive(false);
  };

  return (
    <li
      className="menu-item"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <a href={url}>{label}</a>
      {/* If there are subcategories, render the Submenu component */}
      {subcategories.length > 0 && (
        <Submenu isActive={isActive} subcategories={subcategories} />
      )}
    </li>
  );
};

export default Menu;
