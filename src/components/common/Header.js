import React, { useState, useEffect } from "react";
import { Link, useStaticQuery, graphql, navigate } from "gatsby";
import { useLocation } from "@reach/router";

const Header = () => {
  const location = useLocation(); // To track the current URL
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
    .filter((category) => category.parentId === null && category.slug !== "uncategorized");

  // Default active category is "Africa"
  const defaultCategorySlug = "africa";

  const [activeCategory, setActiveCategory] = useState(defaultCategorySlug);

  useEffect(() => {
    // Determine the active top-level category based on the current URL or fallback to default
    const currentPath = location.pathname.split("/").filter(Boolean); // Extract path segments
    const currentCategorySlug = currentPath[1] || null;
    setActiveCategory(currentCategorySlug || defaultCategorySlug);
  }, [location]);

  // Get subcategories for the active category
  const subcategories =
    data.allWpCategory.edges
      .map((edge) => edge.node)
      .filter((subcategory) => subcategory.parentId === categories.find((cat) => cat.slug === activeCategory)?.id) || [];

  const handleCategoryClick = (categorySlug) => {
    // Set the active category and navigate to its page
    setActiveCategory(categorySlug);
    navigate(`/category/${categorySlug}/`);
  };

  return (
    <header className="header">
      <style>
        {`
          .header {
            padding: 1rem;
            background-color: #222; /* Dark background for header */
            color: #fff; /* White text */
          }

          .nav-list {
            list-style: none;
            margin: 0;
            padding: 0;
            display: flex;
            gap: 1.5rem;
          }

          .nav-item {
            position: relative;
          }

          .category-button {
            background: transparent;
            border: none;
            cursor: pointer;
            font-size: 1rem;
            color: #fff;
            text-transform: uppercase;
          }

          .category-button.active {
            font-weight: bold;
            color: #FFD700; /* Gold for active category */
          }

          .submenu-container {
            margin-top: 1rem;
            padding: 1rem;
            background-color: #333; /* Slightly lighter background for submenu */
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
          }

          .subcategories {
            display: flex;
            flex-wrap: wrap;
            gap: 1rem;
          }

          .subcategory-link {
            text-decoration: none;
            color: #8B4513; /* Brown text for submenu links */
            font-size: 0.9rem;
            padding: 0.5rem 1rem;
            background: #444; /* Background for submenu links */
            border-radius: 4px;
            transition: background 0.3s;
          }

          .subcategory-link:hover {
            background: #555;
          }
        `}
      </style>

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

      {/* Submenu Container */}
      <div className="submenu-container">
        {subcategories.length > 0 ? (
          <div className="subcategories">
            {subcategories.map((subcategory) => (
              <Link
                key={subcategory.id}
                to={`/category/${activeCategory}/${subcategory.slug}/`}
                className="subcategory-link"
              >
                {subcategory.name}
              </Link>
            ))}
          </div>
        ) : (
          <p>No subcategories available.</p>
        )}
      </div>
    </header>
  );
};

export default Header;
