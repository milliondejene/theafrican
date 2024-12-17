import React from "react";
import { graphql, useStaticQuery, Link } from "gatsby";
import { getTimeAgo } from "../utils/timeAgo";

const PostPreview = () => {
  // GraphQL query to fetch 3 latest posts
  const data = useStaticQuery(graphql`
    query {
      allWpPost(sort: { fields: date, order: DESC }, limit: 3) {
        nodes {
          id
          title
          slug
          excerpt
          date
          featuredImage {
            node {
              sourceUrl
            }
          }
        }
      }
    }
  `);

  const posts = data.allWpPost.nodes;

  // Helper function to truncate the excerpt text
  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return `${text.substring(0, maxLength)}...`;
    }
    return text;
  };

  return (
    <>
      <style>
        {`
          .post-preview-layout {
            display: grid;
            grid-template-columns: 1fr 2fr 1fr;
            gap: 20px;
            max-width: 1200px;
            margin: 0 auto;
            align-items: flex-start;
          }
          
          .post-preview-content,
          .post-featured-image,
          .post-preview-second {
            border-top: 2px solid #ddd;
            border-bottom: 2px solid #ddd;
          }

          .post-preview-content {
            padding: 20px;
            background: #f9f9f9;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
          }

          .post-preview-content h2 {
            margin-bottom: 10px;
            font-size: 1.5rem;
            color: #333;
          }

          .post-preview-content p {
            font-size: 1rem;
            line-height: 1.5;
            color: #555;
          }

          .post-preview-content .post-preview-meta {
            margin-top: 10px;
            font-size: 0.9rem;
            color: #777;
          }

          .post-featured-image {
            width: 100%;
            height: 300px;
            overflow: hidden;
          }

          .post-featured-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }

          .post-preview-second {
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            padding: 20px;
          }

          .post-preview-second h3 {
            margin-bottom: 10px;
            font-size: 1.3rem;
            color: #333;
          }

          .post-preview-second p {
            font-size: 0.9rem;
            line-height: 1.4;
            color: #555;
          }

          .post-preview-second .post-preview-meta {
            margin-top: 10px;
            font-size: 0.9rem;
            color: #777;
          }

          /* Mobile Styles */
          @media screen and (max-width: 768px) {
            .post-preview-layout {
              display: block;
              gap: 20px;
            }

            .post-preview-content,
            .post-featured-image,
            .post-preview-second {
              border: none;
              margin-bottom: 20px;
            }

            .post-preview-content,
            .post-preview-second {
              padding: 15px;
            }

            .post-featured-image {
              height: 200px;
            }

            .post-preview-image img {
              height: 100%;
              object-fit: cover;
            }
          }
        `}
      </style>

      <div className="post-preview-layout">
        {/* Section 1: Latest Post Title and Excerpt */}
        {posts[0] && (
          <div className="post-preview-content">
            <Link to={`/post/${posts[0].slug}`} style={{ textDecoration: "none", color: "inherit" }}>
              <h2>{posts[0].title}</h2>
              <p
                dangerouslySetInnerHTML={{
                  __html: truncateText(posts[0].excerpt, 120),
                }}
              />
              <div className="post-preview-meta">{getTimeAgo(posts[0].date)}</div>
            </Link>
          </div>
        )}

        {/* Section 2: Featured Image of Latest Post */}
        {posts[0]?.featuredImage?.node?.sourceUrl && (
          <div className="post-featured-image">
            <img
              src={posts[0].featuredImage.node.sourceUrl}
              alt={posts[0].title}
            />
          </div>
        )}

        {/* Section 3: Second Latest Post Image, Title, and Excerpt */}
        {posts[1] && (
          <div className="post-preview-second">
            {posts[1].featuredImage?.node?.sourceUrl && (
              <div className="post-preview-image">
                <img
                  src={posts[1].featuredImage.node.sourceUrl}
                  alt={posts[1].title}
                />
              </div>
            )}
            <Link to={`/post/${posts[1].slug}`} style={{ textDecoration: "none", color: "inherit" }}>
              <h3>{posts[1].title}</h3>
              <p
                dangerouslySetInnerHTML={{
                  __html: truncateText(posts[1].excerpt, 100),
                }}
              />
              <div className="post-preview-meta">{getTimeAgo(posts[1].date)}</div>
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default PostPreview;
