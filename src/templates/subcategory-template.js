import React from "react";
import { graphql, Link } from "gatsby";
import Layout from "../components/layout/Layout";

const SubcategoryTemplate = ({ data }) => {
  const { name, posts, parent } = data.wpCategory;

  return (
    <Layout>
      <div className="subcategory-template">
        <style>
          {`
            .subcategory-template {
              padding: 2rem;
              font-family: Arial, sans-serif;
              color: #333;
            }

            header {
              margin-bottom: 2rem;
              border-bottom: 2px solid #ddd;
              padding-bottom: 1rem;
            }

            header h1 {
              font-size: 2.5rem;
              margin: 0 0 1rem;
              color: #444;
            }

            header a {
              font-size: 1rem;
              color: #0066cc;
              text-decoration: none;
            }

            header a:hover {
              text-decoration: underline;
            }

            section {
              margin-top: 2rem;
            }

            section h2 {
              font-size: 2rem;
              color: #555;
              margin-bottom: 1rem;
              border-bottom: 2px solid #eee;
              padding-bottom: 0.5rem;
            }

            ul {
              list-style: none;
              padding: 0;
              margin: 0;
            }

            ul li {
              margin-bottom: 1rem;
              font-size: 1.2rem;
            }

            ul li a {
              color: #8B4513; /* Brown color for post links */
              text-decoration: none;
              transition: color 0.3s ease;
            }

            ul li a:hover {
              color: #D2691E; /* Darker brown on hover */
              text-decoration: underline;
            }

            p {
              font-size: 1rem;
              color: #666;
            }
          `}
        </style>

        <header>
          <h1>{name}</h1>
          {parent ? (
            <Link to={`/category/${parent.slug}`}>Back to {parent.name}</Link>
          ) : (
            <p>No parent category available.</p>
          )}
        </header>

        {/* Posts Section */}
        <section>
          <h2>Posts</h2>
          {posts?.nodes?.length > 0 ? (
            <ul>
              {posts.nodes.map((post) => (
                <li key={post.id}>
                  <Link to={`/post/${post.slug}`}>{post.title}</Link>
                </li>
              ))}
            </ul>
          ) : (
            <p>No posts available in this subcategory.</p>
          )}
        </section>
      </div>
    </Layout>
  );
};

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
        }
      }
    }
  }
`;

export default SubcategoryTemplate;
