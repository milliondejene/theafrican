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
          .category-page {
            padding: 2rem;
            font-family: Arial, sans-serif;
            color: #333;
          }

          /* Header style */
          header h1 {
            font-size: 2rem;
            margin-bottom: 1rem;
            color: black;
            text-align: left;
          }

          header div {
            text-align: left;
          }

          header ul {
            list-style: none;
            padding: 0;
            display: inline-flex;
            gap: 0.75rem;
            flex-wrap: wrap;
          }

          header li {
            display: inline-block;
          }

          header a {
            text-decoration: none;
            color: #0066cc;
            transition: color 0.3s ease;
          }

          header a:hover {
            color: #004999;
            text-decoration: underline;
          }

          /* Grid layout for posts */
          .grid-container {
            display: grid;
            grid-template-columns: 3fr 1fr;
            gap: 2rem;
            margin-top: 2rem;
          }

          .posts-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 1.5rem;
          }

          /* Grid items */
          .grid-item {
            text-decoration: none;
            background-color: #fff;
            text-align: left;
            font-size: 0.9rem;
            min-width: 250px;
            max-width: 300px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            border-radius: 4px;
            overflow: hidden; /* Ensure the link doesn't break the layout */
          }

          .grid-item img {
            max-width: 100%;
            border-radius: 1px;
            margin-bottom: 0.5rem;
            height: 180px;
            object-fit: cover;
          }

          .grid-item h3 {
            font-size: 1.1rem;
            margin-bottom: 0.5rem;
            color: black;
            text-align: left;
          }

          .grid-item p {
            font-size: 0.85rem;
            color: #555;
            margin-bottom: 0.5rem;
            text-align: left;
          }

          .post-meta {
            font-size: 0.85rem;
            color: #999;
            text-align: left;
          }

          /* List of posts */
          .vertical-list {
            border-radius: 8px;
            grid-column: span 1;
            display: flex;
            flex-direction: column;
            text-align: left;
          }

          .vertical-list h2 {
            margin-bottom: 1rem;
            font-size: 1.5rem;
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
            color: #999;
          }

          /* Prevent link styles from affecting content */
          .grid-item a {
            color: inherit;
            text-decoration: none;
            display: block;
            height: 100%; /* Ensure the link takes up the full area */
          }

          .grid-item a:hover {
            text-decoration: none; /* Ensure no underline on hover */
            color: inherit;
          }

          /* Responsive design for tablets */
          @media (max-width: 1024px) {
            .grid-container {
              grid-template-columns: 1fr;
            }

            .vertical-list {
              margin-top: 2rem;
            }
          }

          /* Responsive design for mobile */
          @media (max-width: 768px) {
            .category-page {
              padding: 1rem;
            }

            header h1 {
              font-size: 1.5rem;
              text-align: center;
            }

            header ul {
              justify-content: center;
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
              margin-top: 2px;
            }
          }
          `}
        </style>

        <header>
          <h1>{name}</h1>
          <div className="separator"></div>
        </header>

        <div className="grid-container">
          <div className="posts-grid">
            {posts?.nodes?.length > 0 ? (
              posts.nodes.map((post) => (
                <Link to={`/post/${post.slug}`} className="grid-item" key={post.id}>
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
                    <Link to={`/post/${post.slug}`}>{post.title}</Link>
                    <div className="post-meta">
                      {post.categories?.nodes?.map((cat) => cat.name).join(", ")} | {getTimeAgo(post.date)}
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
