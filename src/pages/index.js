import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout/Layout";

const HomePage = ({ data }) => {
  return (
    <Layout>
      <section>
        <h1>Welcome to TheAfrican</h1>
        <p>Discover stories about Business, Society, Culture, Arts, Tech, and more!</p>
      </section>
    </Layout>
  );
};

export default HomePage;
