import React from "react";
import { graphql, Link } from "gatsby";
import Layout from "../components/layout/Layout";
const CategoryTemplate = ({ data }) => {
  const { name, wpChildren, posts, slug } = data.wpCategory;

  return (
    <Layout>
    <div>
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
    </Layout>);
  
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
