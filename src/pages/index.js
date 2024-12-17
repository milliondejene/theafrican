import React, { useEffect, useState } from "react";
import { graphql } from "gatsby";
import Slider from "react-slick";
import Layout from "../components/layout/Layout";
import Seo from "../components/seo";
import PostPreview from "../components/PostPreview"; // Import PostPreview component
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HomePage = ({ data }) => {
  const [latestPosts, setLatestPosts] = useState([]);

  // Get the latest 5 posts
  useEffect(() => {
    const posts = data.allWpPost.edges.slice(0, 5);
    setLatestPosts(posts);
  }, [data]);

  // Slick carousel settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  return (
    <Layout>
      {/* Section 1: Carousel */}
      <section style={{ margin: "0", padding: "0" }}>
        <Slider {...sliderSettings}>
          {latestPosts.map(({ node }, index) => (
            <div key={index}>
              <div
                style={{
                  height: "60vh",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${node.featuredImage?.node.sourceUrl})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  color: "#fff",
                }}
              >
                <div style={{ padding: "20px", maxWidth: "800px", textAlign: "center" }}>
                  <h1 style={{ fontSize: "2rem", marginBottom: "10px" }}>{node.title}</h1>
                  <p style={{ fontSize: "1.1rem", lineHeight: "1.5", color: "lightgreen" }}>
                    Discover inspiring stories on TheAfrican.co
                  </p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </section>

      {/* Section 2: Latest Posts Grid */}
      <section style={{ padding: "40px 20px" }}>
        <h2
          style={{
            textAlign: "center",
            marginBottom: "30px",
            fontSize: "2rem",
            color: "#333",
          }}
        >
          Latest Posts
        </h2>
        <div
          className="latest-posts"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "20px",
            margin: "0 auto",
            maxWidth: "1200px",
          }}
        >
          {latestPosts.length > 0 ? (
            latestPosts.map(({ node }, index) => (
              <div
                className="post-card"
                key={index}
                style={{
                  borderRadius: "8px",
                  overflow: "hidden",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                  transition: "transform 0.3s ease-in-out",
                  cursor: "pointer",
                }}
              >
                <div className="post-image" style={{ width: "100%", height: "180px" }}>
                  {node.featuredImage ? (
                    <a href={`/post/${node.slug}`}>
                      <img
                        src={node.featuredImage.node.sourceUrl}
                        alt={node.title}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </a>
                  ) : (
                    <div
                      className="placeholder-image"
                      style={{
                        width: "100%",
                        height: "100%",
                        background: "#f4f4f4",
                      }}
                    />
                  )}
                </div>
                <div
                  className="post-title"
                  style={{
                    padding: "15px",
                    fontWeight: "bold",
                    color: "#333",
                    textAlign: "center",
                  }}
                >
                  <a
                    href={`/post/${node.slug}`}
                    style={{
                      textDecoration: "none",
                      color: "inherit",
                      fontSize: "1.1rem",
                    }}
                  >
                    {node.title}
                  </a>
                </div>
              </div>
            ))
          ) : (
            <p>No posts found.</p>
          )}
        </div>
      </section>

      {/* Section 3: PostPreview Component */}
      <section style={{ padding: "40px 20px", backgroundColor: "#f9f9f9" }}>
        <h2
          style={{
            textAlign: "center",
            marginBottom: "30px",
            fontSize: "2rem",
            color: "#333",
          }}
        >
          More Posts
        </h2>
        <PostPreview />
      </section>
    </Layout>
  );
};

export const Head = () => <Seo title="Home - TheAfrican.co" />;

export const query = graphql`
  query {
    allWpPost(sort: { fields: date, order: DESC }, limit: 5) {
      edges {
        node {
          title
          slug
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

export default HomePage;
