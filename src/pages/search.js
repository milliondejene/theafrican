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

  // State to track if we are on the search page
  const [isSearchPage, setIsSearchPage] = useState(false)

  // Helper function to truncate the text
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
      setIsSearchPage(true) // Set to true when on the search page
    } else {
      setIsSearchPage(false) // Set to false if no query
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

  // Handle Enter key press
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      // Trigger the search when Enter key is pressed
      window.history.pushState({}, "", `/search?q=${searchTerm}`)
      fetchSearchResults(searchTerm)
    }
  }

  // Handle back navigation on click of 'X'
  const handleGoBack = () => {
    window.history.back() // Go back to the previous page
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
    justify-content: center; /* Align items to the start */
   
    gap: 4px; /* Remove gap to keep button next to input */
    margin-bottom: 8px;
    padding: 0 20px;
     max-width: 600px;
        margin-right: auto; /* Center the input horizontally */
    margin-left: auto; /* Center the input horizontally */
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
  .go-home-button {
    display: inline-block;
    margin-top: 15px;
    padding: 10px 20px;
    background-color: white;
    color: black;
    font-weight: bold;
    border: 1px solid #ccc;
    border-radius: 5px;
    text-decoration: none;
}
    .go-home-button:hover {
    background-color: #f4f4f4;
    border-color: #999;
}
  /* -------------------- Mobile Specific Styles -------------------- */
  /* Mobile screen (max-width: 768px) */
  @media (max-width: 768px) {
    /* Adjust layout for result rows */
    .search-result-row {
      flex-direction: column;
      align-items: flex-start;
    }
        .no-results {
        font-size: 16px;
        color: #555;
    }
    .go-home-button {
        width: 100%;
        text-align: center;
        font-size: 16px;
        padding: 12px 20px;
        border-radius: 5px;
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
         .go-home-button {
        font-size: 18px;
        padding: 12px 20px;
        border-radius: 5px;
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
        <div className="search-container">
          <input
            ref={searchInputRef} // Set the ref to focus it
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown} // Call the handleKeyDown when a key is pressed
            placeholder="Search..."
          />
          <button
            className="searchButton"
            onClick={() => {
              window.history.pushState({}, "", `/search?q=${searchTerm}`)
              fetchSearchResults(searchTerm)
            }}
          >
            {!isSearchPage ? (
              <span>Search</span>
            ) : (
              <span onClick={handleGoBack}>X</span>
            )}
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
                <a href={`/post/${node.slug}`} className="post-link">
                {/* Title, Excerpt & Featured Image */}
                <div className="title-excerpt-image">
                  <div className="text-content">
                   
                   
                      <h3>
                        {node.title}
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
                </a>
              </div>
            ))
          ) : (
            <div className="no-results">
              <h3>Nothing found yet</h3>
              <p>Please enter a keyword to search or try refining your search.</p>
              <a href="/" className="go-home-button">Go back to homepage</a>
            </div>
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
