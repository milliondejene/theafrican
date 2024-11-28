import React from "react";
import { graphql, Link } from "gatsby";
import Layout from "../components/layout/Layout";

const PostTemplate = ({ data }) => {
  const { title, content, date, author, categories } = data.wpPost;

  return (
    <Layout>
      <article className="post-page">
        <style>
          {`
            .post-page {
              max-width: 800px;
              margin: 0 auto;
              padding: 1.5rem;
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
            }

            header h1 {
              font-size: 2.5rem;
              color: #4CAF50; /* Green for title */
              margin-bottom: 1rem;
              text-align: center;
            }

            header p {
              font-size: 1rem;
              color: #555; /* Gray for meta text */
              text-align: center;
              margin-bottom: 1rem;
            }

            header div {
              text-align: center;
              margin-bottom: 1.5rem;
            }

            header ul {
              list-style: none;
              padding: 0;
              display: inline-flex;
              gap: 0.75rem;
            }

            header li {
              display: inline-block;
            }

            header a {
              text-decoration: none;
              color: #0066cc; /* Blue for category links */
              font-weight: bold;
              transition: color 0.3s ease;
            }

            header a:hover {
              color: #004999; /* Darker blue on hover */
              text-decoration: underline;
            }

            section {
              font-size: 1.125rem; /* Larger text for content */
              color: #444; /* Darker gray for content */
              margin-bottom: 2rem;
            }

            footer p {
              text-align: center;
              font-size: 1rem;
            }

            footer a {
              text-decoration: none;
              color: #4CAF50; /* Green for back link */
              font-weight: bold;
              transition: color 0.3s ease;
            }

            footer a:hover {
              color: #3a8d40; /* Darker green on hover */
              text-decoration: underline;
            }
          `}
        </style>

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
          <p>
            Back to <Link to="/">Homepage</Link>
          </p>
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
