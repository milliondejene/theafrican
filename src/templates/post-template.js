import React from "react";
import { graphql, Link } from "gatsby";
import Layout from "../components/layout/Layout";

// Helper function to calculate relative time
const getTimeAgo = (dateString) => {
  const postDate = new Date(dateString);
  const currentDate = new Date();
  const timeDiff = Math.floor((currentDate - postDate) / (1000 * 60 * 60)); // Difference in hours

  if (timeDiff < 1) {
    return "Less than an hour ago";
  } else if (timeDiff === 1) {
    return "1 hour ago";
  } else if (timeDiff < 24) {
    return `${timeDiff} hours ago`;
  } else {
    const daysDiff = Math.floor(timeDiff / 24);
    if (daysDiff === 1) {
      return "1 day ago";
    }
    return `${daysDiff} days ago`;
  }
};

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
              font-size: 2rem;
              color: black;
              margin-bottom: 0.5rem;
              text-align: left;
            }

            header p {
              font-size: 1rem;
              color: #555;
              text-align: left;
              margin-bottom: 0.5rem;
            }

            header div {
              text-align: left;
            }

            header ul {
              list-style: none;
              padding: 0;
              display: inline-flex;
              gap: 0.75rem;
              flex-wrap: wrap; /* Allow categories to wrap on smaller screens */
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

            section {
              font-size: 1.125rem;
              color: #444;
              margin-bottom: 2rem;
            }

            footer p {
              text-align: center;
              font-size: 1rem;
            }

            footer a {
              text-decoration: none;
              color: #4CAF50;
              font-weight: bold;
              transition: color 0.3s ease;
            }

            footer a:hover {
              color: #3a8d40;
              text-decoration: underline;
            }

            .post-meta {
              font-size: 1rem;
              color: #888;
              margin-bottom: 1rem;
              line-height: 1.6;
            }

            .author-name {
              font-weight: bold;
              color: #333;
            }

            .category-links {
              font-size: 1rem;
              color: #0066cc;
            }

            .category-links a:hover {
              color: #004999;
              text-decoration: underline;
            }

            /* Responsive design for tablets */
            @media (max-width: 1024px) {
              .post-page {
                padding: 1rem;
              }

              header h1 {
                font-size: 1.75rem;
              }

              section {
                font-size: 1rem;
              }

              footer p {
                font-size: 0.9rem;
              }
            }

            /* Responsive design for mobile */
            @media (max-width: 768px) {
              .post-page {
                padding: 0.75rem;
              }

              header h1 {
                font-size: 1.5rem;
                text-align: center; /* Center align title on mobile */
              }

              header p {
                text-align: center; /* Center align meta info on mobile */
                font-size: 0.9rem;
              }

              header div {
                text-align: center; /* Center align categories on mobile */
              }

              header ul {
                justify-content: center; /* Center align categories in flexbox */
              }

              section {
                font-size: 0.95rem;
              }

              footer p {
                font-size: 0.85rem;
              }
            }
          `}
        </style>

        <header>
          <h1>{title}</h1>
          <p>{getTimeAgo(date)}</p>
          <p className="author-name">{author?.node?.name || "Unknown"}</p>
          <div className="category-links">
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
              <span>None</span>
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
