import React, { useState, useEffect } from "react";
import { Link, useStaticQuery, graphql, navigate } from "gatsby";
import { useLocation } from "@reach/router";

const Header = () => {
  const location = useLocation();
  const data = useStaticQuery(graphql`
    query {
      allWpCategory {
        edges {
          node {
            id
            name
            slug
            parentId
          }
        }
      }
    }
  `);

  const categories = data.allWpCategory.edges
    .map((edge) => edge.node)
    .filter(
      (category) => category.parentId === null && category.slug !== "uncategorized"
    );

  const defaultCategorySlug = "africa";
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeSubcategory, setActiveSubcategory] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSubcategoriesVisible, setIsSubcategoriesVisible] = useState(true);

  useEffect(() => {
    const currentPath = location.pathname.split("/").filter(Boolean);
    const currentCategorySlug = currentPath[0] || null;
    const currentSubcategorySlug = currentPath[1] || null;

    // Set active category based on the URL
    if (currentPath.length === 0) {
      setActiveCategory(null);
      setActiveSubcategory(null);
      setIsSubcategoriesVisible(false);
    } else if (currentPath[0] === "post" && currentPath.length >= 2) {
      const postSlug = currentPath[1];
      const postCategorySlug = getPostCategory(postSlug);
      setActiveCategory(postCategorySlug || defaultCategorySlug);
    } else if (currentCategorySlug) {
      setActiveCategory(currentCategorySlug);
      setActiveSubcategory(currentSubcategorySlug || null);
    } else {
      setActiveCategory(defaultCategorySlug);
    }
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScrolled(true);
        setIsSubcategoriesVisible(false);
      } else {
        setIsScrolled(false);
        setIsSubcategoriesVisible(true);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getPostCategory = (postSlug) => {
    const postCategories = {
      "the-making-of-a-great-book-using-coffee-for-creative-thinking": "coffee",
    };
    return postCategories[postSlug] || null;
  };

  const subcategories = data.allWpCategory.edges
    .map((edge) => edge.node)
    .filter(
      (subcategory) =>
        subcategory.parentId ===
        categories.find((cat) => cat.slug === activeCategory)?.id
    ) || [];

  const handleCategoryClick = (categorySlug) => {
    setActiveCategory(categorySlug);
    setActiveSubcategory(null);
    navigate(`/${categorySlug}`);
  };

  const handleSubcategoryClick = (subcategorySlug) => {
    setActiveSubcategory(subcategorySlug);
    navigate(`/${activeCategory}/${subcategorySlug}/`);
  };

  return (
    <header className={`header ${isScrolled ? "scrolled" : ""}`}>
      <style>
        {`
          .header {
        
            background-color: #fff;
            color: #000;
            text-align: center;
            transition: padding 0.3s ease-in-out;
          }

          .header.scrolled {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            z-index: 10;
            padding: 0.5rem 1rem;
          }

          .logo-container {
            margin-bottom: 1rem;
            font-size: 1.5rem;
            font-weight: bold;
            color: #000;
            text-align: center;
          }

          .nav-list {
            list-style: none;
            margin: 0 auto;
            padding: 0;
            display: flex;
            justify-content: center;
            gap: 1rem;
          }

          .nav-item {
            position: relative;
          }

          .category-button {
            font-weight: bold;
            background: transparent;
            border: none;
            cursor: pointer;
            font-size: 0.85rem;
            color: #000;
            text-transform: uppercase;
            padding: 0.2rem 0.5rem;
            transition: border-color 0.3s ease-in-out, color 0.3s ease-in-out;
            border-bottom: 2px solid transparent;
          }

          .category-button.active {
            border-bottom: 3px solid red;
            color: #000;
          }

          .category-button:hover {
            color: #555;
          }

          .horizontal-line {
         
            border-top: 1px solid #ddd;
            width: 100%;
          }

          .submenu-container {
            max-width: 100%;
            transition: opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;
            display: ${isSubcategoriesVisible ? "block" : "none"};
          }

          .subcategories {
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            gap: 0.5rem;
          }

          .subcategory-link {
            text-decoration: none;
            color: #000;
            font-size: 0.8rem;
            padding: 0.3rem 0.6rem;
            transition: color 0.3s ease-in-out;
          }

          .subcategory-link.active {
            color: red;
          }

          .subcategory-link:hover {
            color: red;
          }
        `}
      </style>

      <div className="logo-container">TheAfrican</div>
      <hr className="separator" />

      <nav>
        <ul className="nav-list">
          {categories.map((category) => (
            <li key={category.id} className="nav-item">
              <button
                onClick={() => handleCategoryClick(category.slug)}
                className={`category-button ${
                  activeCategory === category.slug ? "active" : ""
                }`}
              >
                {category.name}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="horizontal-line" />

      <div className="submenu-container">
        {subcategories.length > 0 ? (
          <div className="subcategories">
            {subcategories.map((subcategory) => (
              <Link
                key={subcategory.id}
                to={`/${activeCategory}/${subcategory.slug}/`}
                className={`subcategory-link ${
                  activeSubcategory === subcategory.slug ? "active" : ""
                }`}
                onClick={() => handleSubcategoryClick(subcategory.slug)}
              >
                {subcategory.name}
              </Link>
            ))}
          </div>
        ) : (
          <p>No subcategories available.</p>
        )}
      </div>
      <hr className="separator" />
    </header>
  );
};

export default Header;
