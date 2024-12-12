import React from "react";
import { graphql, Link } from "gatsby";
import Layout from "../components/layout/Layout";
import { getTimeAgo } from "../utils/timeAgo";

const CategoryTemplate = ({ data }) => {
  const { name, posts } = data.wpCategory;

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return `${text.substring(0, maxLength)}...`;
    }
    return text;
  };

  return (
    <Layout>
      <div className="category-page">
      <style>
  {`
    /* -------------------- General Styles -------------------- */
    .category-page {
      font-family: Arial, sans-serif;
      color: #333;
      padding: 1rem;
    }

    /* Header styles */
    header h1 {
      font-size: 2rem;
      margin-bottom: 1rem;
      color: black;
      text-align: left;
    }

    /* Horizontal line separator */
    hr.separator {
      margin-bottom: 0; /* Removes the bottom margin */
    }

    /* -------------------- Layout Styles -------------------- */
    /* Main container for grid layout */
    .grid-container {
      display: grid;
      grid-template-columns: 3fr 1fr; /* Main content and sidebar */
      gap: 2rem;
      margin-top: 2rem;
    }

    /* Grid layout for posts */
    .posts-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); /* Auto-adjust columns */
      gap: 1.5rem;
    }

    /* Individual grid item styles (posts) */
    .grid-item {
      text-decoration: none;
      background-color: #fff;
      text-align: left;
      font-size: 0.9rem;
      min-width: 250px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      border-radius: 2px;
      overflow: hidden;
    }

    /* Image inside grid items */
    .grid-item img {
      max-width: 100%;
      height: 180px;
      object-fit: cover;
    }

    /* Title styles for grid items */
    .grid-item h3 {
      font-size: 1.1rem;
      margin-bottom: 0.5rem;
      color: black;
    }

    /* Excerpt or content paragraph styles for grid items */
    .grid-item p {
      font-size: 0.85rem;
      color: #555;
      margin-bottom: 0.5rem;
    }

    /* Post meta information (author, date) styles */
    .post-meta {
      font-size: 0.85rem;
      color: #999;
    }

    /* -------------------- Vertical List Styles -------------------- */
    /* Vertical list layout (for categories, tags, etc.) */
    .vertical-list {
      display: flex;
      flex-direction: column;
      text-align: left;
    }

    /* Title for vertical list */
    .vertical-list h2 {
      margin-bottom: 1rem;
      font-size: 1.5rem;
    }

    /* Unordered list inside vertical list */
    .vertical-list ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    /* List items inside vertical list */
    .vertical-list li {
      margin-bottom: 0.75rem;
    }

    /* Links inside list items */
    .vertical-list li a {
      text-decoration: none;
      color: black;
      font-size: 1rem;
    }

    /* Hover effect for list links */
    .vertical-list li a:hover {
      color: #004999;
    }

    /* -------------------- Responsive Styles -------------------- */
    /* Medium screens (max-width: 1024px) */
    @media (max-width: 1024px) {
      .grid-container {
        grid-template-columns: 1fr; /* Stack grid items on smaller screens */
      }
    }

    /* Small screens (max-width: 768px) */
    @media (max-width: 768px) {
      /* Header styles for mobile */
      header h1 {
        font-size: 1.5rem;
        text-align: left;
      }
    }
  `}
</style>


        <header>
          <h1>{name}</h1>
          <hr className="separator" style={{ borderTop: 'solid black'}} />
        </header>

        <div className="grid-container">
          <div className="posts-grid">
            {posts?.nodes?.length > 0 ? (
              posts.nodes.map((post) => (
                <Link
                  to={`/post/${post.slug}`}
                  className="grid-item"
                  key={post.id}
                  prefetch="true" // Gatsby's prefetching
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
                    {post.categories?.nodes?.map((cat) => cat.name).join(", ")}
                  </div>
                  <hr className="separator" />
                </Link>
              ))
            ) : (
              <p>No posts available in this category.</p>
            )}
          </div>

          <div className="vertical-list">
            <h2>Posts List</h2>
            <ul>
              {posts?.nodes?.length > 0 ? (
                posts.nodes.map((post) => (
                  <li key={post.id}>
                    <Link to={`/post/${post.slug}`} prefetch="true">
                      {post.title}
                    </Link>
                    <div className="post-meta">
                      {post.categories?.nodes
                        ?.map((cat) => cat.name)
                        .join(", ")}{" "}
                      | {getTimeAgo(post.date)}
                    </div>
                  </li>
                ))
              ) : (
                <p>No posts available in this category.</p>
              )}
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export const query = graphql`
  query GetCategoryData($slug: String!) {
    wpCategory(slug: { eq: $slug }) {
      id
      name
      slug
      posts {
        nodes {
          id
          title
          slug
          excerpt
          date
          categories {
            nodes {
              name
            }
          }
          featuredImage {
            node {
              sourceUrl
            }
          }
        }
      }
    }
  }
`;

export default CategoryTemplate;
