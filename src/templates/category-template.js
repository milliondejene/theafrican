import React from "react";
import { graphql, Link } from "gatsby";
import Layout from "../components/layout/Layout";

const CategoryTemplate = ({ data }) => {
  const { name, wpChildren, posts, slug } = data.wpCategory;

  return (
    <Layout>
      <div className="category-page">
        <style>
          {`
            .category-page {
              max-width: 800px;
              margin: 0 auto;
              padding: 1rem;
              font-family: Arial, sans-serif;
              color: #333;
            }

            header h1 {
              font-size: 2rem;
              text-align: center;
              margin-bottom: 1.5rem;
              color: #4CAF50; /* Green for the main heading */
            }

            section {
              margin-bottom: 2rem;
            }

            section h2 {
              font-size: 1.5rem;
              margin-bottom: 1rem;
              color: #555; /* Darker gray for section titles */
            }

            ul {
              list-style: none;
              padding: 0;
              margin: 0;
            }

            li {
              margin-bottom: 0.75rem;
            }

            li a {
              text-decoration: none;
              color: #0066cc; /* Blue for links */
              font-size: 1rem;
              transition: color 0.3s ease;
            }

            li a:hover {
              color: #004999; /* Darker blue on hover */
              text-decoration: underline;
            }

            p {
              color: #777; /* Light gray for empty state text */
              font-size: 1rem;
              text-align: center;
            }

            /* Divider for sections */
            .category-page section + section {
              border-top: 1px solid #ddd;
              padding-top: 1rem;
            }
          `}
        </style>

        <header>
          <h1>{name}</h1>
        </header>

        {/* Subcategories Section */}
        <section>
          <h2>Subcategories</h2>
          {wpChildren?.nodes?.length > 0 ? (
            <ul>
              {wpChildren.nodes.map((subcategory) => (
                <li key={subcategory.id}>
                  <Link to={`/category/${slug}/${subcategory.slug}`}>
                    {subcategory.name}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p>No subcategories available.</p>
          )}
        </section>

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
            <p>No posts available in this category.</p>
          )}
        </section>
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
      wpChildren {
        nodes {
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
        }
      }
    }
  }
`;

export default CategoryTemplate;
