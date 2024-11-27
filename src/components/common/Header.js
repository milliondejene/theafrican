import React, { useState } from "react";
import { Link, useStaticQuery, graphql } from "gatsby";

const Header = () => {
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
    .map(edge => edge.node)
    .filter(category => category.parentId === null && category.slug !== "uncategorized");

  const [activeCategory, setActiveCategory] = useState(null);

  const handleCategoryClick = (categorySlug) => {
    setActiveCategory(activeCategory === categorySlug ? null : categorySlug);
  };

  return (
    <header className="header">
      <style>
        {`
          .header {
            background-color: #f8f9fa;
            padding: 1rem;
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
            color: #6f4f28; /* Primary brown color */
            font-weight: bold;
            text-transform: uppercase;
            transition: color 0.3s ease;
          }

          .category-button:hover {
            color: #4b3a2e; /* Darker brown for hover effect */
          }

          .submenu {
            list-style: none;
            margin: 0;
            padding: 0.5rem;
            position: absolute;
            top: 100%;
            left: 0;
            background: #ffffff;
            box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
            width: 200px;
            border-radius: 4px;
          }

          .submenu-item {
            margin: 0.5rem 0;
          }

          .submenu-link {
            text-decoration: none;
            color: #6f4f28; /* Primary brown color for subcategory links */
            transition: color 0.3s ease;
          }

          .submenu-link:hover {
            color: #4b3a2e; /* Darker brown for subcategory link hover */
          }
        `}
      </style>

      <nav>
        <ul className="nav-list">
          {categories.map(category => (
            <li key={category.id} className="nav-item">
              <button
                onClick={() => handleCategoryClick(category.slug)}
                className="category-button"
              >
                <Link
                  to={`/category/${category.slug}/`}
                  className="category-link"
                >
                  {category.name}
                </Link>
              </button>
              {activeCategory === category.slug && (
                <ul className="submenu">
                  {data.allWpCategory.edges
                    .map(edge => edge.node)
                    .filter(subcategory => subcategory.parentId === category.id)
                    .map(subcategory => (
                      <li key={subcategory.id} className="submenu-item">
                        <Link
                          to={`/category/${category.slug}/${subcategory.slug}/`}
                          className="submenu-link"
                        >
                          {subcategory.name}
                        </Link>
                      </li>
                    ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
