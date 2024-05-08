// import { useEffect, useState } from "react";
// import { getPost } from "../services";
import Nav from "../components/Nav";
import Header from "../components/Header";

const Home = () => {
  //   const [posts, setPosts] = useState([]);

  //   useEffect(() => {
  //     const fetchPosts = async () => {
  //       const graphqlAPI = import.meta.env.VITE_GRAPHCMS_ENDPOINT;
  //       const posts = await getPost(graphqlAPI);
  //       setPosts(posts);
  //       console.log(posts);
  //     };
  //     fetchPosts();
  //   }, []);

  return (
    <>
      <Nav />
      <Header />
    </>
  );

  // Render your component using the posts state
};

export default Home;
