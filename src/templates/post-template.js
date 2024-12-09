import React from "react"
import { graphql, Link, navigate } from "gatsby" // Import navigate for redirection
import { FaShareAlt } from 'react-icons/fa';  // Import the share icon
import { FaBookmark } from 'react-icons/fa';  // Import the bookmark icon
import Layout from "../components/layout/Layout"

// Helper function to calculate relative time
const getTimeAgo = dateString => {
  const postDate = new Date(dateString)
  const currentDate = new Date()
  const timeDiff = Math.floor((currentDate - postDate) / (1000 * 60 * 60)) // Difference in hours

  if (timeDiff < 1) {
    return "Less than an hour ago"
  } else if (timeDiff === 1) {
    return "1 hour ago"
  } else if (timeDiff < 24) {
    return `${timeDiff} hours ago`
  } else {
    const daysDiff = Math.floor(timeDiff / 24)
    if (daysDiff === 1) {
      return "1 day ago"
    }
    return `${daysDiff} days ago`
  }
}

const PostTemplate = ({ data }) => {
  const { title, content, date, author, categories } = data.wpPost

  const handleSaveClick = () => {
    // Redirect to login page
    navigate("/login")
  }

  return (
    <Layout>
      <article className="post-page">
      <style>
  {`
  /* Base styles for the post */
  .post-page {
    max-width: 800px;
    margin: 0 auto;
    padding: 1.5rem;
    font-family: Arial, sans-serif;
    line-height: 1.6;
    color: #333;
  }

  /* Header styles */
  header {
    text-align: left;
    display: flex;
    flex-direction: column;
    position: relative;
  }

  header h1 {
    font-size: 2rem;
    color: black;
    margin-bottom: 0.5rem;
  }

  header p {
    font-size: 1rem;
    color: #555;
    margin-bottom: 0rem;
  }

  .header-top {
    display: flex;
    justify-content: space-between;
      align-items: center;
       margin-top: 0.5rem;
  }

  /* Share and Save icon styles */
  .action-links {
    display: flex;
    justify-content: flex-end; /* Align icons to the right */
    gap: 1rem; /* Add spacing between icons */
    margin-top: 0.5rem; /* Add spacing from the author name */
     margin-bottom: 0.5rem;
  }

  .action-link {
    display: flex;
    align-items: center;
    color: black; /* Set color to black */
    text-decoration: none;
    font-weight: bold;
    font-size: 0.9rem; /* Adjust text size */
  }

  .action-icon {
    cursor: pointer;
    font-size: 1.2rem; /* Adjust icon size */
    margin-left: 0.3rem; /* Add some space between the text and the icon */
    color: black; /* Set color to black */
  }

  /* Author name styling */
  .author-name {
    font-weight: bold;
    color: #333;
    font-size: 1.2rem; /* Increase the font size of author name */
  }

  /* Category links styling */
  .category-links {
    font-size: 0.9rem;
    color: #555;
    margin-top: 0.5rem;
  }

  .category-links a {
    text-decoration: none;
    color: #555;
    transition: color 0.3s ease;
  }

  .category-links a:hover {
    color: #004999;
    text-decoration: underline;
  }

  .category-links span {
    color: #555;
  }

  .category-links span a {
    margin-right: 0.5rem;
  }

  /* Responsive design for tablets */
  @media (max-width: 1024px) {
    .post-page {
      padding: 1rem;
    }

    header h1 {
      font-size: 1.75rem;
    }

    .action-link {
      font-size: 0.85rem; /* Reduce action link text size */
    }

    .action-icon {
      font-size: 1rem; /* Reduce icon size */
    }

    section {
      font-size: 1rem;
    }
  }

  /* Responsive design for mobile */
  @media (max-width: 768px) {
    .post-page {
      padding: 0.75rem;
    }

    header h1 {
      font-size: 1.5rem; /* Reduce title size */
    }

    header p {
      font-size: 0.9rem;
    }

    .action-link {
      font-size: 0.75rem; /* Further reduce action link text size */
    }

    .action-icon {
      font-size: 0.9rem; /* Further reduce icon size */
    }

    section {
      font-size: 0.95rem;
    }
  }
  `}
</style>

<header>
  <div className="header-top">
    <div>
      <h1>{title}</h1>
      <p>{getTimeAgo(date)}</p>
      <p className="author-name">{author?.node?.name || "Unknown"}</p>
    </div>
  </div>

  {/* Categories */}
  <div className="category-section">
    <div className="category-links">
      {categories?.nodes?.length > 0 ? (
        <div>
          {categories.nodes.map((category, index) => (
            <span key={category.id}>
              <Link
                to={`/category/${category.slug}`}
                className="category-link"
              >
                {category.name}
              </Link>
              {index < categories.nodes.length - 1 && " | "}
            </span>
          ))}
        </div>
      ) : (
        <span>None</span>
      )}
    </div>
    <hr className="separator" />
    {/* Share and Save icons */}
    <div className="action-links">
      <Link to="#" className="action-link">
        Share <FaShareAlt className="action-icon" />
      </Link>
      <Link to="#" className="action-link">
        Save <FaBookmark className="action-icon" />
      </Link>
    </div>
  </div>
</header>


        <section dangerouslySetInnerHTML={{ __html: content }} />
        <hr className="post-separator" />
      </article>
    </Layout>
  )
}

export const query = graphql`
  query GetPostData($slug: String!) {
    wpPost(slug: { eq: $slug }) {
      id
      title
      content
      date(formatString: "MMMM DD, YYYY")
      author {
        node {
          name
        }
      }
      categories {
        nodes {
          id
          name
          slug
        }
      }
    }
  }
`

export default PostTemplate
