import React from "react";
import BlogLayout from "../components/blog/BlogLayout";
import BlogList from "../components/blog/BlogList";
import Footer from "../components/footer";

const BlogPage = () => (
  <>
    <BlogLayout>
      <BlogList />
      <Footer />
    </BlogLayout>
  </>
);

export default BlogPage;
