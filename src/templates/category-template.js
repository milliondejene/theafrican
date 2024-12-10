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
         
            font-family: Arial, sans-serif;
            color: #333;
          }

          header h1 {
            font-size: 2rem;
            margin-bottom: 1rem;
            color: black;
            text-align: left;
          }

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
            border-radius: 2px;
            overflow: hidden;
          }

          .grid-item img {
            max-width: 100%;
            height: 180px;
            object-fit: cover;
          }

          .grid-item h3 {
         
            font-size: 1.1rem;
            margin-bottom: 0.5rem;
            color: black;
          }

          .grid-item p {
            font-size: 0.85rem;
            color: #555;
            margin-bottom: 0.5rem;
          }

          .post-meta {
            font-size: 0.85rem;
            color: #999;
          }

          .vertical-list {
            display: flex;
            flex-direction: column;
            text-align: left;
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
            color: black;
            font-size: 1rem;
          }

          .vertical-list li a:hover {
            color: #004999;
          }
hr.separator {
  margin-bottom: 0; /* Removes the bottom margin */
}
          @media (max-width: 1024px) {
            .grid-container {
              grid-template-columns: 1fr;
            }
          }

          @media (max-width: 768px) {
            .category-page {
           
            }
            hr.separator {
  margin-bottom: 0; /* Removes the bottom margin */
}

            header h1 {
              font-size: 1.5rem;
              text-align: first;
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
