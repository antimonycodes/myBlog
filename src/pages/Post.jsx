import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Post = () => {
  const { slug } = useParams(); // Extracting the slug parameter from the URL
  const [post, setPost] = useState(null);

  // You need to fetch the post data using the slug
  useEffect(() => {
    // Fetch the post data using the slug
    // Replace the following lines with your actual data fetching logic
    const fetchPostData = async () => {
      try {
        const graphqlAPI = import.meta.env.VITE_GRAPHCMS_ENDPOINT;

        const response = await fetch(`YOUR_API_ENDPOINT/${slug}`); // Replace YOUR_API_ENDPOINT with your actual API endpoint
        const postData = await response.json();
        setPost(postData);
      } catch (error) {
        console.error("Error fetching post data:", error);
      }
    };

    fetchPostData();
  }, [slug]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
      <p>Author: {post.author}</p>
    </div>
  );
};

export default Post;
