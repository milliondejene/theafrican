import React from "react";
import { graphql, Link } from "gatsby";
import Layout from "../components/layout/Layout";
const PostTemplate = ({ data }) => {
  const { title, content, date, author, categories } = data.wpPost;

  return (
    <Layout>
    <article>
      <header>
        <h1>{title}</h1>
        <p>
          Published on {date} by {author?.node?.name || "Unknown"}
        </p>
        <div>
          Categories:
          {categories?.nodes?.length > 0 ? (
            <ul>
              {categories.nodes.map((category) => (
                <li key={category.id}>
                  <Link to={`/category/${category.slug}`}>
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <span> None </span>
          )}
        </div>
      </header>

      <section dangerouslySetInnerHTML={{ __html: content }} />

      <footer>
        <p>Back to <Link to="/">Homepage</Link></p>
      </footer>
    </article>
    </Layout>
  );
};

export const query = graphql`
  query GetPostData($slug: String!) {
    wpPost(slug: { eq: $slug }) {
      id
      title
      content
      date(formatString: "MMMM DD, YYYY")
      author {
        node {
          name
        }
      }
      categories {
        nodes {
          id
          name
          slug
        }
      }
    }
  }
`;

export default PostTemplate;
