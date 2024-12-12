import React from "react"
import { graphql, Link, navigate } from "gatsby"
import { FaShareAlt, FaBookmark } from "react-icons/fa"
import Layout from "../components/layout/Layout"
import { getTimeAgo } from "../utils/timeAgo"

const PostTemplate = ({ data }) => {
  const { title, content, date, author, categories } = data.wpPost

  const handleSaveClick = () => {
    navigate("/login")
  }

  return (
    <Layout>
      <article className="post-page">
      <style>
  {`
    /* -------------------- Base Styles for the Post -------------------- */
    .post-page {
      max-width: 800px;
      margin: 0 auto;
      font-family: Arial, sans-serif;
      line-height: 2;
      color: #333;
    }

    /* Apply padding only to text content (headings and paragraphs) */
    .post-page p,
    .post-page h1,
    .post-page h2,
    .post-page h3,
    .post-page h4,
    .post-page h5,
    .post-page h6 {
      padding: 0rem 1rem 0rem 1rem; /* Add horizontal padding */
    }

    /* -------------------- Media Elements (Images, Videos, iFrames) -------------------- */
    /* Reset padding and margin for images, iframes, and videos */
    .post-page img,
    .post-page iframe,
    .post-page video {
      padding: 0;
      margin: 0;
      max-width: 100%;  /* Ensure elements are responsive */
      width: 100%;      /* Videos occupy full width */
      height: auto;
      display: block;
    }

    /* -------------------- Featured Image -------------------- */
    /* Featured image styling for mobile and small screens */
    .featured-image {
      width: 100%;  /* Full width for smaller screens */
      height: auto;
    }

    /* For tablet and desktop screens */
    @media (min-width: 768px) {
      .featured-image {
        width: calc(100% + 200px); /* Extend image beyond container width */
        margin-left: -100px;       /* Adjust left margin */
        margin-right: -100px;      /* Adjust right margin */
      }
    }

    /* -------------------- WordPress Block Handling -------------------- */
    /* Specific handling for WordPress blocks, removing margin/padding */
    .post-page figure,
    .post-page .wp-block-image {
      margin: 0;
      padding: 0;
    }

    /* -------------------- Header Section -------------------- */
    header {
      text-align: left;
      display: flex;
      flex-direction: column;
      position: relative;
    }

    /* Header title styling */
    header h1 {
      font-size: 2rem;
      color: black;
      margin-bottom: 0.5rem;
    }

    /* Header paragraph styling */
    header p {
      font-size: 1rem;
      color: #555;
      margin-bottom: 0;
    }

    /* Header top section for spacing and alignment */
    .header-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 0.5rem;
    }

    /* -------------------- Action Links Section (Share, Save) -------------------- */
    /* Styling for action links like share/save icons */
    .action-links {
      display: flex;
      justify-content: flex-end;
      gap: 1rem;
      margin-top: 0.5rem;
      margin-bottom: 1.5rem;
    }

    /* Individual action link (e.g., share/save button) */
    .action-link {
      display: flex;
      align-items: center;
      color: black;
      text-decoration: none;
      font-weight: bold;
      font-size: 0.9rem;
    }

    /* Action icon (e.g., share icon) styling */
    .action-icon {
      cursor: pointer;
      font-size: 1.2rem;
      margin-left: 0.3rem;
      color: black;
    }

    /* -------------------- Author Information -------------------- */
    /* Styling for the author's name */
    .author-name {
      font-weight: bold;
      color: #333;
      font-size: 1.2rem;
      margin-bottom: -20px;
      z-index: 1;
    }

    /* -------------------- Category Links -------------------- */
    /* Category links styling */
    .category-links {
      font-size: 0.9rem;
      color: #555;
      margin-top: 0.5rem;
    }

    /* Category link (text) styling */
    .category-links a {
      text-decoration: none;
      color: #555;
      transition: color 0.3s ease; /* Smooth color transition */
    }

    /* Hover effect for category links */
    .category-links a:hover {
      color: #004999;
      text-decoration: underline;
    }

    /* Category span styling */
    .category-links span {
      color: #555;
    }

    /* Space between category links */
    .category-links span a {
      margin-right: 0.5rem;
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
          <p className="category-section">
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
          </p>
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
