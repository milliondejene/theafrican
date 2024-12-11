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
    /* Base styles for the post */
    .post-page {
      max-width: 800px;
      margin: 0 auto;
      font-family: Arial, sans-serif;
      line-height: 2;
      color: #333;
    }

    /* Apply padding only to text content */
    .post-page p,
    .post-page h1,
    .post-page h2,
    .post-page h3,
    .post-page h4,
    .post-page h5,
    .post-page h6 {
      padding: 0rem 1rem 0rem 1rem;
    }

    /* Reset padding for images and videos */
    .post-page img,
    .post-page iframe,
    .post-page video {
      padding: 0;
      margin: 0;
      max-width: 100%;
      width: 100%; /* Ensures videos occupy full width */
      height: auto;
      display: block;
    }

    /* Featured image styling */
    .featured-image {
      width: 100%; /* Full width for smaller screens */
      height: auto;
    }

    @media (min-width: 768px) {
      /* For tablet and desktop */
      .featured-image {
        width: calc(100% + 200px); /* Extend beyond container width */
        margin-left: -100px; /* Adjust left margin */
        margin-right: -100px; /* Adjust right margin */
      }
    }

    /* WordPress-specific block handling */
    .post-page figure,
    .post-page .wp-block-image {
      margin: 0;
      padding: 0;
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
      margin-bottom: 0;
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
      justify-content: flex-end;
      gap: 1rem;
      margin-top: 0.5rem;
      margin-bottom: 1.5rem;
    }

    .action-link {
      display: flex;
      align-items: center;
      color: black;
      text-decoration: none;
      font-weight: bold;
      font-size: 0.9rem;
    }

    .action-icon {
      cursor: pointer;
      font-size: 1.2rem;
      margin-left: 0.3rem;
      color: black;
    }

    /* Author name styling */
    .author-name {
      font-weight: bold;
      color: #333;
      font-size: 1.2rem;
      margin-bottom: -20px;
      z-index: 1;
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
