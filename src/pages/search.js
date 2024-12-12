import React, { useEffect, useState } from "react";
import { useLocation } from "@reach/router";
import { graphql } from "gatsby";
import Layout from "../components/layout/Layout"; // Assuming you have a Layout component

const SearchPage = ({ data }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();

  // This useEffect will run when the query parameter in the URL changes
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get("q");

    if (query) {
      setSearchTerm(query); // Update the search term from the query params
      fetchSearchResults(query); // Fetch results based on the query
    }
  }, [location.search]);

  // Function to fetch search results from the GraphQL query
  const fetchSearchResults = async (query) => {
    const filteredResults = data.allWpPost.edges.filter(({ node }) =>
      node.title.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(filteredResults);
  };

  return (
    <Layout>
      <div className="search-page">
        {/* Styles within <style> tag */}
        <style>
          {`
            .search-page {
              padding: 40px 20px;
            }

            .search-container {
              text-align: center;
              margin-bottom: 40px;
            }

            .search-container input {
              padding: 15px;
              width: 100%;
              max-width: 600px;
              font-size: 18px;
              border-radius: 5px;
              border: 1px solid #ccc;
            }

            .search-container button {
              padding: 15px 30px;
              font-size: 18px;
              margin-left: 10px;
              cursor: pointer;
              border-radius: 5px;
              border: 1px solid #ccc;
              background-color: black;
              color: white;
            }

            .search-results {
              margin-top: 20px;
            }

            .search-result-row {
              display: flex;
              flex-direction: row;
              margin-bottom: 30px;
              align-items: flex-start;
              border-bottom: 1px solid #ddd;
              padding-bottom: 20px;
            }

            .time-category {
              flex: 0 0 120px;
              color: #999;
              font-size: 14px;
              margin-bottom: 10px;
              text-align: center;
            }

            .category {
              font-size: 12px;
              color: #555;
            }

            .title-excerpt-image {
              flex: 1;
              display: flex;
              flex-direction: row;
              justify-content: space-between;
              padding-left: 20px;
              align-items: flex-start;
            }

            .text-content {
              flex: 1;
              padding-right: 20px;
            }

            .post-link {
              color: #333;
              text-decoration: none;
            }

            .excerpt {
              color: #555;
              font-size: 16px;
              margin-top: 5px;
            }

            .featured-image {
              flex: 0 0 150px;
            }

            .placeholder-image {
              width: 100%;
              height: 100%;
              background: #f4f4f4;
              border-radius: 5px;
            }

            .no-results {
              text-align: center;
              font-size: 18px;
              color: #555;
            }

            @media (max-width: 768px) {
              .search-result-row {
                flex-direction: column;
                align-items: flex-start;
              }

              .time-category {
                margin-bottom: 10px;
              }

              .title-excerpt-image {
                flex-direction: column;
                align-items: flex-start;
              }

              .featured-image {
                margin-top: 20px;
              }
            }
          `}
        </style>

        {/* Search Bar */}
        <div className="search-container">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // Update searchTerm as user types
            placeholder="Search..."
          />
          <button
            onClick={() => {
              // Update the URL with the new search query without refreshing the page
              window.history.pushState({}, "", `/search?q=${searchTerm}`);
              fetchSearchResults(searchTerm); // Fetch results based on the updated search term
            }}
          >
            Search
          </button>
        </div>

        {/* Search Results */}
        <div className="search-results">
          {searchResults.length > 0 ? (
            searchResults.map(({ node }, index) => (
              <div className="search-result-row" key={index}>
                {/* Time Ago & Category (for mobile, will stack below each other) */}
                <div className="time-category">
                  <div>{node.date}</div>
                  <div className="category">
                    {node.categories.nodes.map((category) => category.name).join(", ")}
                  </div>
                </div>

                {/* Title, Excerpt & Featured Image */}
                <div className="title-excerpt-image">
                  {/* Title & Excerpt */}
                  <div className="text-content">
                    <h3>
                      <a href={`/post/${node.slug}`} className="post-link">
                        {node.title}
                      </a>
                    </h3>
                    <p className="excerpt">{node.excerpt}</p>
                  </div>

                  {/* Featured Image */}
                  <div className="featured-image">
                    {node.featuredImage ? (
                      <img
                        src={node.featuredImage.node.sourceUrl}
                        alt={node.title}
                        style={{
                          width: "100%",
                          height: "auto",
                          borderRadius: "5px",
                        }}
                      />
                    ) : (
                      <div className="placeholder-image" />
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="no-results">No results found.</p>
          )}
        </div>
      </div>
    </Layout>
  );
};

// Gatsby's page query to fetch posts data from WordPress
export const query = graphql`
  query {
    allWpPost {
      edges {
        node {
          title
          slug
          excerpt
          date(formatString: "MMM D, YYYY")
          featuredImage {
            node {
              sourceUrl
            }
          }
          categories {
            nodes {
              name
            }
          }
        }
      }
    }
  }
`;

export default SearchPage;
