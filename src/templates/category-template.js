import React from "react";
import { graphql, Link } from "gatsby";
import Layout from "../components/layout/Layout";

const CategoryTemplate = ({ data }) => {
  const { name, posts } = data.wpCategory;

  // Helper function to calculate relative time
  const getTimeAgo = (dateString) => {
    const postDate = new Date(dateString);
    const currentDate = new Date();
    const timeDiff = Math.floor((currentDate - postDate) / (1000 * 60 * 60 * 24)); // Difference in days

    if (timeDiff === 0) return "Today";
    if (timeDiff === 1) return "1 day ago";
    return `${timeDiff} days ago`;
  };

  // Helper function to truncate text
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
            .category-page {
              padding: 2rem;
              font-family: Arial, sans-serif;
              color: #333;
            }

            header h1 {
              font-size: 2rem;
              margin-bottom: 1rem;
              color: red;
            }

            .separator {
            
            
            }

            /* Updated grid layout for 3 posts and 1 post list */
            .grid-container {
              display: grid;
              grid-template-columns: 3fr 1fr; /* 3/4 for posts, 1/4 for post list */
              gap: 2rem;
              margin-top: 2rem;
            }

            /* Adjust the posts grid layout */
            .posts-grid {
              display: grid;
              grid-template-columns: repeat(3, 1fr); /* 3 posts per row */
              gap: 1.5rem;
            }

            /* Grid Item styling */
            .grid-item {
              border: 1px solid #ddd;
              padding: 1.5rem;
              border-radius: 8px;
              background-color: #fff;
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
              text-align: center;
              font-size: 0.9rem;
              min-width: 250px;
              max-width: 300px;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
            }

            .grid-item img {
              max-width: 100%;
              border-radius: 4px;
              margin-bottom: 0.5rem;
              height: 180px;
              object-fit: cover;
            }

            .grid-item h3 {
              font-size: 1.1rem; /* Fixed title size */
              margin-bottom: 0.5rem;
              color: #0066cc;
            }

            .grid-item h3 a {
              text-decoration: none;
            }

            .grid-item h3 a:hover {
              text-decoration: underline;
              color: #004999;
            }

            .grid-item p {
              font-size: 0.85rem; /* Adjusted font size for excerpts */
              color: #555;
              margin-bottom: 0.5rem;
            }

            .post-meta {
              font-size: 0.85rem;
              color: #999;
            }

            /* Adjusting the vertical list for the right side */
            .vertical-list {
              padding: 1.5rem;
              border: 1px solid #ddd;
              border-radius: 8px;
              background-color: #f9f9f9;
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
              grid-column: span 1;
              display: flex;
              flex-direction: column;
            }

            .vertical-list h2 {
              margin-bottom: 1rem;
              font-size: 1.5rem;
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
              color: #0066cc;
              font-size: 1rem;
              transition: color 0.3s ease;
            }

            .vertical-list li a:hover {
              color: #004999;
              text-decoration: underline;
            }

            .vertical-list .post-meta {
              font-size: 0.85rem;
              color: #999;
            }
          `}
        </style>

        <header>
          <h1>{name}</h1>
          <div className="separator"></div>
        </header>

        <div className="grid-container">
          {/* Left side - Grid of Posts */}
          <div className="posts-grid">
            {posts?.nodes?.length > 0 ? (
              posts.nodes.map((post) => (
                <div className="grid-item" key={post.id}>
                  {post.featuredImage?.node?.sourceUrl && (
                    <img
                      src={post.featuredImage.node.sourceUrl}
                      alt={post.title}
                    />
                  )}
                  <h3>
                    <Link to={`/post/${post.slug}`}>{post.title}</Link>
                  </h3>
                  <p>{truncateText(post.excerpt, 100)}</p>
                  <div className="post-meta">
                    {post.categories?.nodes?.map((cat) => cat.name).join(", ")} |{" "}
                    {getTimeAgo(post.date)}
                  </div>
                </div>
              ))
            ) : (
              <p>No posts available in this category.</p>
            )}
          </div>

          {/* Right side - Post List (Vertical list of posts) */}
          <div className="vertical-list">
            <h2>Posts List</h2>
            <ul>
              {posts?.nodes?.length > 0 ? (
                posts.nodes.map((post) => (
                  <li key={post.id}>
                    <Link to={`/post/${post.slug}`}>{post.title}</Link>
                    <div className="post-meta">
                      {post.categories?.nodes?.map((cat) => cat.name).join(", ")} |{" "}
                      {getTimeAgo(post.date)}
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
