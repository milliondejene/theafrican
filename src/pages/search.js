import React, { useEffect, useState, useRef } from "react"
import { useLocation } from "@reach/router"
import { graphql } from "gatsby"
import Layout from "../components/layout/Layout"

const SearchPage = ({ data }) => {
  const [searchResults, setSearchResults] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const location = useLocation()

  // Ref to focus on the search input
  const searchInputRef = useRef(null)

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

    // Focus the search input after the component mounts
    if (searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [location.search]) // Focus when location.search changes

  const fetchSearchResults = async (query) => {
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
    /* General styles for the search page */
    .search-page {
      padding: 40px 20px;
    }

    /* Container for search input and button */
    .search-container {
      display: flex;
      justify-content: flex-start; /* Align items to the start */
      align-items: center; /* Vertically align input and button */
      gap: 4px; /* Remove gap to keep button next to input */
      margin-bottom: 8px;
      padding: 0 20px;
    }

    /* Search input field */
    .search-container input {
      flex: 1;
      padding: 10px;
      max-width: calc(100% - 110px);
      font-size: 18px;
      border-radius: 3px;
      border: 1px solid #ccc;
    }

    /* Search button */
    .search-container button {
      font-size: 16px;
      cursor: pointer;
      border-radius: 5px;
      border: 1px solid #ccc;
      background-color: black;
      color: white;
      flex-shrink: 0;
      padding: 8px 16px;
    }

    /* Results container */
    .search-results {
      margin-top: 20px;
    }

    /* Container for each result row */
    .search-result-row {
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      justify-content: space-between;
      margin-bottom: 30px;
      border-bottom: 1px solid #ddd;
      padding-bottom: 20px;
    }

    /* Time and category label */
    .time-category {
      color: #999;
      font-size: 14px;
      margin-bottom: 10px;
      text-align: center;
    }

    /* Category label for results */
    .category {
      font-size: 12px;
      color: #555;
    }

    /* Container for title, excerpt, and image */
    .title-excerpt-image {
      flex: 1;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-top: 10px;
    }

    /* Text content (title, excerpt) */
    .text-content {
      flex: 1;
    }

    /* Link for each post */
    .post-link {
      color: #333;
      text-decoration: none;
      font-weight: bold;
    }

    /* Excerpt text for each result */
    .excerpt {
      color: #555;
      font-size: 16px;
      margin-top: 5px;
    }

    /* Featured image container */
    .featured-image {
      flex: 0 0 150px;
      margin-left: 20px;
      border-radius: 1px;
    }

    /* Placeholder for images */
    .placeholder-image {
      width: 100%;
      height: 100%;
      background: #f4f4f4;
      border-radius: 1px;
    }

    /* No results message */
    .no-results {
      text-align: center;
      font-size: 18px;
      color: #555;
    }

    /* -------------------- Mobile Specific Styles -------------------- */
    /* Mobile screen (max-width: 768px) */
    @media (max-width: 768px) {
      /* Adjust layout for result rows */
      .search-result-row {
        flex-direction: column;
        align-items: flex-start;
      }

      /* Adjust time category on mobile */
      .time-category {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-top: 10px;
        font-size: 14px;
        gap: 5px;
      }

      /* Adjust time category separators */
      .time-category div::after {
        content: "|";
        margin: 0 5px;
      }

      .time-category div:last-child::after {
        content: "";
      }

      /* Adjust layout for title, excerpt, and image on mobile */
      .title-excerpt-image {
        flex-direction: row; /* Change to row on mobile */
        align-items: flex-start;
        width: 100%;
        margin-top: 10px;
      }

      /* Adjust text content padding on mobile */
      .text-content {
        flex: 1;
      }

      /* Adjust featured image on mobile */
      .featured-image {
        margin-top: 20px;
        margin-left: 20px; /* Add space between image and text */
      }

      /* Move time category below the excerpt */
      .time-category {
        order: 2;
      }

      /* Hide desktop category on mobile */
      .mobile-category {
        display: block;
      }

      /* Show desktop category on mobile */
      .desktop-category {
        display: none;
        color: #999;
      }

      /* Adjust button styling for mobile */
      .search-button {
        background-color: black;
        color: white;
        padding: 10px 20px;
      }

      /* Hide excerpts and paragraphs on mobile */
      .excerpt, p {
        display: none;
      }
    }

    /* -------------------- Desktop Specific Styles -------------------- */
    /* Desktop screen (min-width: 769px) */
    @media (min-width: 769px) {
      /* Adjust gap between search container items */
      .search-container {
        gap: 15px; /* Add spacing between elements */
      }

      /* Ensure input takes up full width on desktop */
      .search-container input {
        width: 100%;
      }

      /* Keep desktop button styling */
      .search-container button {
        font-size: 16px;
        cursor: pointer;
        border-radius: 5px;
        border: 1px solid #ccc;
        background-color: black;
        color: white;
        flex-shrink: 0; /* Prevent button from shrinking */
      }

      /* Maintain row layout for result rows on desktop */
      .search-result-row {
        flex-direction: row;
      }

      /* Hide mobile category on desktop */
      .mobile-category {
        display: none;
      }

      /* Show desktop category on desktop */
      .desktop-category {
        display: block;
        color: #999;
      }

      /* Keep time-category order on desktop */
      .time-category {
        order: 0;
      }
    }
  `}
</style>

        {/* Search Bar */}
        <div className="search-container">
          <input
            ref={searchInputRef} // Set the ref to focus it
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
                {/* Time Ago & Category */}
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
