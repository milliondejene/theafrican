import React, { useState } from "react";
import { Link, useStaticQuery, graphql } from "gatsby"; // for navigation and data fetching

const Header = () => {
  // Fetch categories data using useStaticQuery from GraphQL
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

  // Filter out the top-level categories (where parentId is null)
  const categories = data.allWpCategory.edges
    .map(edge => edge.node)
    .filter(category => category.parentId === null);

  // State to track the active category
  const [activeCategory, setActiveCategory] = useState(null);

  // Toggle active category on click
  const handleCategoryClick = (categorySlug) => {
    setActiveCategory(activeCategory === categorySlug ? null : categorySlug);
  };

  // Styles
  const styles = {
    header: {
      backgroundColor: "#fff",
      padding: "1rem",
    },
    headerMenu: {
      listStyle: "none",
      padding: 0,
      display: "flex",
    },
    menuItem: {
      marginRight: "1rem",
      position: "relative",
    },
    menuButton: {
      background: "none",
      border: "none",
      cursor: "pointer",
      fontSize: "1rem",
    },
    menuButtonActive: {
      fontWeight: "bold",
      color: "#007acc",
    },
    submenuDropdown: {
      marginTop: "0.5rem",
    },
  };

  return (
    <header style={styles.header}>
      <nav>
        <ul style={styles.headerMenu}>
          {categories.map((category) => (
            <li key={category.id} style={styles.menuItem}>
              {/* Button for top-level category */}
              <button
                style={{
                  ...styles.menuButton,
                  ...(activeCategory === category.slug ? styles.menuButtonActive : {}),
                }}
                onClick={() => handleCategoryClick(category.slug)}
              >
                {category.name}
              </button>

              {/* Subcategories dropdown */}
              {activeCategory === category.slug && (
                <div style={styles.submenuDropdown}>
                  <ul>
                    {data.allWpCategory.edges
                      .map(edge => edge.node)
                      .filter(subCategory => subCategory.parentId === category.id)
                      .map(subCategory => (
                        <li key={subCategory.id}>
                          <Link to={`/category/${category.slug}/${subCategory.slug}`}>
                            {subCategory.name}
                          </Link>
                        </li>
                      ))}
                  </ul>
                </div>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
