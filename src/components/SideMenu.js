import React, { useState } from "react";
import { Link } from "gatsby";
import { MdSearch } from 'react-icons/md'; // Import search icon
import useCategories from "../hooks/useCategories";
import useActiveCategory from "../hooks/useActiveCategory";

const SideMenu = ({ isMenuOpen, toggleMenu }) => {
  // Fetch categories and subcategories using custom hooks
  const { categories, getSubcategories } = useCategories();
  const {
    activeCategory,
    activeSubcategory,
    setActiveCategory,
    setActiveSubcategory,
  } = useActiveCategory();

  // State to track which category has its subcategories open
  const [openCategory, setOpenCategory] = useState(null);

  // State for search input
  const [searchTerm, setSearchTerm] = useState("");

  // Filtered categories based on search term
  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Toggle the subcategory dropdown for the clicked category
  const handleCategoryToggle = (categorySlug, event) => {
    event.preventDefault(); // Prevent navigation when clicking the category name
    setOpenCategory((prevState) =>
      prevState === categorySlug ? null : categorySlug
    );
  };

  // Handle navigation to a category or subcategory
  const handleCategoryClick = (categorySlug) => {
    setActiveCategory(categorySlug);
    setOpenCategory(categorySlug);
    setActiveSubcategory(null); // Reset subcategory when navigating to a new category
  };

  const handleSubcategoryClick = (subcategorySlug) => {
    setActiveSubcategory(subcategorySlug);
  };

  return (
    <div
      className={`side-menu ${isMenuOpen ? "open" : ""}`}
      style={{
        transform: isMenuOpen ? "translateX(0)" : "translateX(-100%)",
        transition: "transform 0.3s ease",
        width: "250px",
        position: "fixed",
        top: "60px",
        bottom: "0",
        left: "0",
        backgroundColor: "#fff",
        boxShadow: "2px 0 5px rgba(0,0,0,0.5)",
        zIndex: "1000",
        paddingTop: "20px",
      }}
    >
      {/* Search Input */}
      <div
        className="search-container"
        style={{
          display: "flex",
          alignItems: "center",
          padding: "10px",
          borderBottom: "1px solid #ddd",
        }}
      >
        
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search categories..."
          style={{
            border: "1px solid #ddd",
            borderRadius: "4px",
            padding: "8px",
            width: "100%",
            fontSize: "14px",
          }}
        />
        <MdSearch size={20} color="#333" style={{ marginLeft: "10px" }} />
      </div>

      {filteredCategories.map((category) => (
        <div key={category.id}>
          {/* Parent category */}
          <div
            className="category-item"
            onClick={(event) => handleCategoryToggle(category.slug, event)}
            style={{
              padding: "10px",
              cursor: "pointer",
              backgroundColor:
                activeCategory === category.slug ? "#ddd" : "transparent",
              textAlign: "left",
            }}
          >
            {category.name}
          </div>

          {/* Display subcategories if the current category is open */}
          {openCategory === category.slug && (
            <div className="subcategory-list" style={{ paddingLeft: "20px" }}>
              {/* Fetch subcategories for the open category */}
              {getSubcategories(category.slug).map((subcategory) => (
                <div
                  key={subcategory.id}
                  className="subcategory-item"
                  onClick={() => handleSubcategoryClick(subcategory.slug)}
                  style={{
                    padding: "5px 10px",
                    cursor: "pointer",
                    backgroundColor:
                      activeSubcategory === subcategory.slug
                        ? "#ddd"
                        : "transparent",
                    textAlign: "left",
                  }}
                >
                  <Link to={`/${category.slug}/${subcategory.slug}`}>
                    {subcategory.name}
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default SideMenu;
