import React, { useState } from "react";
import { Link } from "gatsby";
import { MdExpandMore, MdExpandLess } from "react-icons/md";
import useCategories from "../hooks/useCategories";
import useActiveCategory from "../hooks/useActiveCategory";

const SideMenu = ({ isMenuOpen, toggleMenu }) => {
  const { categories, getSubcategories } = useCategories();
  const {
    activeCategory,
    activeSubcategory,
    setActiveCategory,
    setActiveSubcategory,
  } = useActiveCategory();

  const [openCategory, setOpenCategory] = useState(null);

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

  // Style Object
  const styles = {
    sideMenu: {
      transform: isMenuOpen ? "translateX(0)" : "translateX(-100%)",
      transition: "transform 0.3s ease",
      width: "390px",
      position: "fixed",
      top: "68px",
      bottom: "0",
      left: "0",
      backgroundColor: "#fff",
      boxShadow: "2px 0 5px rgba(0,0,0,0.5)",
      zIndex: "1000",
      paddingTop: "20px",
    },
    categoryItem: {
      padding: "10px",
      cursor: "pointer",
      textAlign: "left",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      fontWeight: "600",
      fontSize: "16px",
      color: "#333",
    },
    activeCategory: {
      backgroundColor: "#f0f0f0",
    },
    subcategoryList: {
      paddingLeft: "20px",
    },
    subcategoryItem: {
      padding: "5px 10px",
      cursor: "pointer",
      fontWeight: "400",
      fontSize: "14px",
      color: "#555",
      borderRadius: "4px",
    },
    activeSubcategory: {
      backgroundColor: "#e9e9e9",
    },
    categoryLink: {
      textDecoration: "none",
      color: "inherit",
      fontWeight: "600",
    },
  };

  return (
    <div
      className={`side-menu ${isMenuOpen ? "open" : ""}`}
      style={styles.sideMenu}
    >
      {/* Categories List */}
      {categories.map((category) => (
        <div key={category.id}>
          {/* Category Item */}
          <div
            className="category-item"
            onClick={(event) => handleCategoryToggle(category.slug, event)}
            style={{
              ...styles.categoryItem,
              ...(activeCategory === category.slug && styles.activeCategory),
            }}
          >
            <span onClick={() => handleCategoryClick(category.slug)}>
              {category.name}
            </span>
            {/* Toggle Icon */}
            {openCategory === category.slug ? (
              <MdExpandLess size={20} />
            ) : (
              <MdExpandMore size={20} />
            )}
          </div>

          {/* Subcategories List */}
          {openCategory === category.slug && (
            <div className="subcategory-list" style={styles.subcategoryList}>
              {/* First Subcategory as Category Link */}
              <div
                className="subcategory-item"
                style={{
                  ...styles.subcategoryItem,
                  ...styles.boldSubcategory, // Apply bold style to the first subcategory (the parent category)
                  ...(activeSubcategory === category.slug &&
                    styles.activeSubcategory),
                }}
              >
                <Link
                  to={`/${category.slug}`} // Link to the category page itself
                  style={styles.categoryLink}
                  onClick={() => handleCategoryClick(category.slug)}
                >
                  {category.name}
                </Link>
              </div>

              {/* Other Subcategories */}
              {getSubcategories(category.slug).map((subcategory) => (
                <div
                  key={subcategory.id}
                  className="subcategory-item"
                  onClick={() => handleSubcategoryClick(subcategory.slug)}
                  style={{
                    ...styles.subcategoryItem,
                    ...(activeSubcategory === subcategory.slug &&
                      styles.activeSubcategory),
                  }}
                >
                  <Link
                    to={`/${category.slug}/${subcategory.slug}`} // Link to the subcategory page
                    style={{
                      textDecoration: "none",
                      color: "inherit",
                    }}
                  >
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
