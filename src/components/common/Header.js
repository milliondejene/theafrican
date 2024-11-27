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
    <header>
      <nav>
        <ul>
          {categories.map(category => (
            <li key={category.id}>
              <button onClick={() => handleCategoryClick(category.slug)}>
                <Link to={`/category/${category.slug}/`}>{category.name}</Link>
              </button>
              {activeCategory === category.slug && (
                <ul>
                  {data.allWpCategory.edges
                    .map(edge => edge.node)
                    .filter(subcategory => subcategory.parentId === category.id)
                    .map(subcategory => (
                      <li key={subcategory.id}>
                        <Link to={`/category/${category.slug}/${subcategory.slug}/`}>
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
