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
            .subcategory-template {
              font-family: Arial, sans-serif;
              color: #333;
               padding:2rem;
            }

            header h1 {
              font-size: 2rem;
              margin: 0 0 1rem;
              text-align: first;
            }

            header h1 span.parent {
              color: red;
              font-weight: bold;
            }

            header h1 span.subcategory {
              color: black;
            }

            header a {
              font-size: 1rem;
              color: #0066cc;
              text-decoration: none;
              display: block;
              text-align: center;
           
            }
            header li {
              display: inline-block;
            }

            header a:hover {
              text-decoration: underline;
            }
            .grid-container {
              display: grid;
              grid-template-columns: 3fr 1fr;
              gap: 1.5rem;
              margin-top: 2rem;
            }

            .posts-grid {
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); /* Flexible grid */
              gap: 1.5rem;
            }

            .grid-item {
            text-decoration: none;
            color: black;.grid-item h3 
              border-radius: 1px;
              background-color: #fff;
              transition: transform 0.2s ease;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
            }

            .grid-item:hover {
              transform: translateY(-5px);
            }

            .grid-item img {
              width: 100%;
              height: 180px;
              object-fit: cover;
              border-radius: 2px;
              margin-bottom: 0.5rem;
            }

            .grid-item h3 {
              font-size: 1.25rem;
              color: black;
              margin-bottom: 0.5rem;
            }

            .grid-item h3 a {
              text-decoration: none;
               color: black;
            }

            .grid-item h3 a:hover {
              text-decoration: underline;
            }

            .post-meta {
              font-size: 0.85rem;
              color: #777;
              margin-top: 0.5rem;
            }

            .vertical-list {
              display: flex;
              flex-direction: column;
            }

            .vertical-list h2 {
              font-size: 1.5rem;
              margin-bottom: 1rem;
              text-align: left;
            }

            .vertical-list ul {
              list-style: none;
              padding: 0;
              margin: 0;
            }

            .vertical-list li {
              margin-bottom: 0.75rem;
            }

            .vertical-list li a {
              text-decoration: none;
              color: black;
              font-size: 1rem;
              transition: color 0.3s ease;
            }

            .vertical-list li a:hover {
              color: #004999;
              text-decoration: underline;
            }

            .vertical-list .post-meta {
              font-size: 0.85rem;
              color: #555;
            }

            .no-posts {
              font-size: 1rem;
              color: #666;
              margin-top: 2rem;
              text-align: center;
            }

            /* Prevent link styles from affecting content */
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
              hr.separator {
  margin-bottom: 0; /* Removes the bottom margin */
}

            /* Responsive design for tablets */
            @media (max-width: 1024px) {
              .grid-container {
                grid-template-columns: 1fr; /* Single column layout */
              }

              header h1 {
                font-size: 1.75rem;
              }
            }

            /* Responsive design for mobile */
            @media (max-width: 768px) {
              .subcategory-template {
              }

              header h1 {
                font-size: 1.5rem;
              }
hr.separator {
  margin-bottom: 0; /* Removes the bottom margin */
}
              header a {
                font-size: 0.9rem;
              }

              .grid-item img {
                height: 150px;
              }

              .vertical-list h2 {
                font-size: 1.25rem;
              }

              .vertical-list li a {
                font-size: 0.9rem;
              }

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
                  <hr className="separator" />
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
