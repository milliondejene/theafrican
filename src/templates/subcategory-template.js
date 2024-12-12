import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout/Layout"
import { getTimeAgo } from "../utils/timeAgo" // Import the utility function

const SubcategoryTemplate = ({ data }) => {
  const { name, posts, parent } = data.wpCategory

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return `${text.substring(0, maxLength)}...`
    }
    return text
  }

  return (
    <Layout>
      <div className="subcategory-template">
      <style>
  {`
    /* -------------------- Base Styles for Subcategory Template -------------------- */
    .subcategory-template {
      font-family: Arial, sans-serif;
      color: #333;
      padding: 1rem;
    }

    /* -------------------- Header Section -------------------- */
    /* Header main title */
    header h1 {
      font-size: 2rem;
      margin: 0 0 1rem;
      text-align: left;
    }

    /* Header span elements for parent and subcategory */
    header h1 span.parent {
      color: red;
      font-weight: bold;
    }

    header h1 span.subcategory {
      color: black;
    }

    /* Header link styling */
    header a {
      font-size: 1rem;
      color: #0066cc;
      text-decoration: none;
      display: block;
      text-align: center;
    }

    /* Inline block display for list items */
    header li {
      display: inline-block;
    }

    /* Hover effect for links */
    header a:hover {
      text-decoration: underline;
    }

    /* -------------------- Grid Layout -------------------- */
    /* Main container for grid layout */
    .grid-container {
      display: grid;
      grid-template-columns: 3fr 1fr; /* Two-column layout with flexible ratio */
      gap: 1.5rem;
      margin-top: 2rem;
    }

    /* Posts grid layout, automatically adjusts for available space */
    .posts-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); /* Flexible grid */
      gap: 1.5rem;
    }

    /* -------------------- Grid Item Styling -------------------- */
    /* Each grid item styling */
    .grid-item {
      text-decoration: none;
      color: black;
      border-radius: 1px;
      background-color: #fff;
      transition: transform 0.2s ease;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    /* Hover effect for grid items */
    .grid-item:hover {
      transform: translateY(-5px); /* Slightly lift the item */
    }

    /* Image styling within grid item */
    .grid-item img {
      width: 100%;
      height: 180px;
      object-fit: cover;
      border-radius: 2px;
      margin-bottom: 0.5rem;
    }

    /* Title styling within grid item */
    .grid-item h3 {
      font-size: 1.25rem;
      color: black;
      margin-bottom: 0.5rem;
    }

    /* Title link styling */
    .grid-item h3 a {
      text-decoration: none;
      color: black;
    }

    /* Hover effect for title links */
    .grid-item h3 a:hover {
      text-decoration: underline;
    }

    /* Post meta information styling */
    .post-meta {
      font-size: 0.85rem;
      color: #777;
      margin-top: 0.5rem;
    }

    /* -------------------- Vertical List Styling -------------------- */
    /* Vertical list layout */
    .vertical-list {
      display: flex;
      flex-direction: column;
    }

    /* Heading for vertical list */
    .vertical-list h2 {
      font-size: 1.5rem;
      margin-bottom: 1rem;
      text-align: left;
    }

    /* Remove list bullet points and padding */
    .vertical-list ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    /* Styling for individual list items */
    .vertical-list li {
      margin-bottom: 0.75rem;
    }

    /* Styling for list links */
    .vertical-list li a {
      text-decoration: none;
      color: black;
      font-size: 1rem;
      transition: color 0.3s ease;
    }

    /* Hover effect for list links */
    .vertical-list li a:hover {
      color: #004999;
      text-decoration: underline;
    }

    /* Post meta inside vertical list */
    .vertical-list .post-meta {
      font-size: 0.85rem;
      color: #555;
    }

    /* No posts message styling */
    .no-posts {
      font-size: 1rem;
      color: #666;
      margin-top: 2rem;
      text-align: center;
    }

    /* -------------------- Link Styling (Preventing Affect on Content) -------------------- */
    .grid-item a {
      color: inherit;
      text-decoration: none;
      display: block;
      height: 100%;
    }

    .grid-item a:hover {
      text-decoration: none;
      color: inherit;
    }

    /* Separator Styling */
    hr.separator {
      margin-bottom: 0; /* Removes the bottom margin */
    }

    /* -------------------- Responsive Design -------------------- */
    /* Responsive design for tablets (1024px and below) */
    @media (max-width: 1024px) {
      .grid-container {
        grid-template-columns: 1fr; /* Single column layout */
      }

      header h1 {
        font-size: 1.75rem; /* Adjust font size for smaller screens */
      }
    }

    /* Responsive design for mobile (768px and below) */
    @media (max-width: 768px) {
      /* Header adjustments */
      header h1 {
        font-size: 1.5rem;
      }

      /* Smaller font size for links in header */
      header a {
        font-size: 0.9rem;
      }

      /* Adjust grid item image size */
      .grid-item img {
        height: 150px;
      }

      /* Smaller vertical list heading */
      .vertical-list h2 {
        font-size: 1.25rem;
      }

      /* Adjust font size for list links */
      .vertical-list li a {
        font-size: 0.9rem;
      }

      /* Smaller post meta font size */
      .post-meta {
        font-size: 0.8rem;
      }
    }
  `}
</style>


        <header>
          <h1>
            {parent ? (
              <>
                <span className="parent">{parent.name}</span>:{" "}
                <span className="subcategory">{name}</span>
              </>
            ) : (
              <span className="subcategory">{name}</span>
            )}
          </h1>
          {parent && <Link to={`/${parent.slug}`}>Back to {parent.name}</Link>}
          <hr className="separator" style={{ borderTop: " solid black" }} />
        </header>

        <div className="separator"></div>

        {posts?.nodes?.length > 0 ? (
          <div className="grid-container">
            <div className="posts-grid">
              {posts.nodes.map(post => (
                <Link
                  to={`/post/${post.slug}`}
                  className="grid-item"
                  key={post.id}
                >
                  {post.featuredImage?.node?.sourceUrl && (
                    <img
                      src={post.featuredImage.node.sourceUrl}
                      alt={post.title}
                    />
                  )}
                  <h3>{post.title}</h3>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: truncateText(post.excerpt, 100),
                    }}
                  />
                  <div className="post-meta">
                    {getTimeAgo(post.date)} |{" "}
                    {post.categories?.nodes?.map(cat => cat.name).join(", ")}
                  </div>
                  <hr className="separator"/>
                </Link>
              ))}
            </div>

            <div className="vertical-list">
              <h2>Posts List</h2>
              <ul>
                {posts.nodes.map(post => (
                  <li key={post.id}>
                    <Link to={`/post/${post.slug}`}>{post.title}</Link>
                    <div className="post-meta">
                      {post.categories?.nodes[0]?.name || "Uncategorized"} •{" "}
                      {getTimeAgo(post.date)}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <div className="no-posts">
            No posts available in this subcategory.
          </div>
        )}
      </div>
    </Layout>
  )
}

export const query = graphql`
  query GetSubcategoryData($slug: String!) {
    wpCategory(slug: { eq: $slug }) {
      id
      name
      slug
      parent {
        ... on WpCategory {
          id
          name
          slug
        }
      }
      posts {
        nodes {
          id
          title
          slug
          excerpt
          date
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

export default SubcategoryTemplate
