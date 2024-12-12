import React, { useEffect, useState } from "react"
import { useLocation } from "@reach/router"
import { graphql } from "gatsby"
import Layout from "../components/layout/Layout"

const SearchPage = ({ data }) => {
  const [searchResults, setSearchResults] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const location = useLocation()

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return `${text.substring(0, maxLength)}...`
    }
    return text
  }

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search)
    const query = queryParams.get("q")

    if (query) {
      setSearchTerm(query)
      fetchSearchResults(query)
    }
  }, [location.search])

  const fetchSearchResults = async query => {
    const filteredResults = data.allWpPost.edges.filter(({ node }) =>
      node.title.toLowerCase().includes(query.toLowerCase())
    )
    setSearchResults(filteredResults)
  }

  return (
    <Layout>
      <div className="search-page">
        <style>
          {`
            .search-page {
              padding: 40px 20px;
            }

            .search-container {
              display: flex;
              flex-wrap: wrap;
              justify-content: center;
              align-items: center;
              gap: 10px;
              margin-bottom: 8px;
            }

            .search-container input {
              flex: 1;
              padding: 15px;
              max-width: calc(100% - 110px);
              font-size: 18px;
              border-radius: 5px;
              border: 1px solid #ccc;
            }

            .searchButton {
              background-color: black;
              color: white;
              padding: 10px 20px;
            }

            .search-container button {
              font-size: 18px;
              padding: 20px 40px;
              margin-left: 5px;
              cursor: pointer;
              border-radius: 5px;
              border: 1px solid #ccc;
              background-color: black;
            }

            .search-results {
              margin-top: 20px;
            }

            .search-result-row {
              display: flex;
              flex-direction: row;
              align-items: flex-start;
              justify-content: space-between;
              margin-bottom: 30px;
              border-bottom: 1px solid #ddd;
              padding-bottom: 20px;
            }

            .time-category {
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
              justify-content: space-between;
              align-items: flex-start;
              padding-left: 20px;
              margin-top: 10px;
            }

            .text-content {
              flex: 1;
              padding-right: 20px;
            }

            .post-link {
              color: #333;
              text-decoration: none;
              font-weight: bold;
            }

            .excerpt {
              color: #555;
              font-size: 16px;
              margin-top: 5px;
            }

            .featured-image {
              flex: 0 0 200px;
              margin-left: 20px;
              border-radius: 1px;
            }

            .placeholder-image {
              width: 100%;
              height: 100%;
              background: #f4f4f4;
              border-radius: 1px;
            }

            .no-results {
              text-align: center;
              font-size: 18px;
              color: #555;
            }

            /* Mobile specific styles */
            @media (max-width: 768px) {
              .search-result-row {
                flex-direction: column;
                align-items: flex-start;
              }

              .time-category {
                display: flex;
                justify-content: flex-start;
                align-items: center;
                margin-top: 10px;
                font-size: 14px;
                gap: 5px;
              }

              .time-category div::after {
                content: "|";
                margin: 0 5px;
              }

              .time-category div:last-child::after {
                content: "";
              }

              .title-excerpt-image {
                flex-direction: row; /* Change to row on mobile */
                align-items: flex-start;
                width: 100%;
                margin-top: 10px;
              }

              .text-content {
                flex: 1;
                padding-right: 10px;
              }

              .featured-image {
                margin-top: 20px;
                margin-left: 20px; /* Add space between image and text */
              }

              .time-category {
                order: 2; /* Move time-category below the excerpt */
              }

              .mobile-category {
                display: block;
              }

              .desktop-category {
                display: none;
                color:#999;
              }
            }

            /* Desktop specific styles */
            @media (min-width: 769px) {
              .search-result-row {
                flex-direction: row;
              }

              .mobile-category {
                display: none;
              }

              .desktop-category {
                display: block;
                 color:#999;
              }

              .time-category {
                order: 0;
              }
            }
          `}
        </style>

        {/* Search Bar */}
        <div className="search-container">
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Search..."
          />
          <button
            className="searchButton"
            onClick={() => {
              window.history.pushState({}, "", `/search?q=${searchTerm}`)
              fetchSearchResults(searchTerm)
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
                  <div className="mobile-category">
                    {node.categories.nodes
                      .map(category => category.name)
                      .join(", ")}
                  </div>
                </div>

                {/* Title, Excerpt & Featured Image */}
                <div className="title-excerpt-image">
                  <div className="text-content">
                    <h3>
                      <a href={`/post/${node.slug}`} className="post-link">
                        {node.title}
                      </a>
                    </h3>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: truncateText(node.excerpt, 100),
                      }}
                    />
                    <div className="desktop-category">
                      {node.categories.nodes
                        .map(category => category.name)
                        .join(", ")}
                    </div>
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
  )
}

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
`

export default SearchPage
