import React from "react";
import { graphql, Link } from "gatsby";

const SubcategoryTemplate = ({ data }) => {
  const { name, posts, parent } = data.wpCategory;

  return (
    <div>
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
