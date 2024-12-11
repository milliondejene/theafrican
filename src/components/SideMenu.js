import React, { useState } from "react";
import { Link } from "gatsby";
import { MdSearch } from "react-icons/md";
import useCategories from "../hooks/useCategories";
import useActiveCategory from "../hooks/useActiveCategory";

const SideMenu = ({ isMenuOpen, toggleMenu, searchInputRef }) => {
  const { categories, getSubcategories } = useCategories();
  const {
    activeCategory,
    activeSubcategory,
    setActiveCategory,
    setActiveSubcategory,
  } = useActiveCategory();

  const [openCategory, setOpenCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCategoryToggle = (categorySlug, event) => {
    event.preventDefault();
    setOpenCategory((prevState) =>
      prevState === categorySlug ? null : categorySlug
    );
  };

  const handleCategoryClick = (categorySlug) => {
    setActiveCategory(categorySlug);
    setOpenCategory(categorySlug);
    setActiveSubcategory(null);
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
        width: "375px",
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
          ref={searchInputRef} // Attach the ref here
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
         <button className="search-icon">
        <MdSearch size={30} color="#333" style={{ marginLeft: "10px" }} />
        </button>
      </div>

      {filteredCategories.map((category) => (
        <div key={category.id}>
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

          {openCategory === category.slug && (
            <div className="subcategory-list" style={{ paddingLeft: "20px" }}>
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
