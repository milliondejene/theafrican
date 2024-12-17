import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout/Layout";
import Seo from "../components/seo"

const HomePage = ({ data }) => {
  return (
    <Layout>
      <section style={{padding: "40px 20px"}}>
        <h1>Welcome to TheAfrican</h1>
        <p>Discover stories about Business, Society, Culture, Arts, Tech, and more!</p>
      </section>
    </Layout>
  );
};
export const Head = () => <Seo title="Home - theafrican.co" />
export default HomePage;
