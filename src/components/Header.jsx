import { useEffect, useState } from "react";
import { getPost } from "../services";

const Header = () => {
  const [response, setResponse] = useState([]);

  const headerPost = async () => {
    try {
      const graphqlAPI = import.meta.env.VITE_GRAPHCMS_ENDPOINT;
      const response = await getPost(graphqlAPI);
      setResponse(response);
      console.log(response);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    headerPost();
  }, []);

  // Check if response exists and has length > 0
  if (!response || response.length === 0) {
    return null; // Render nothing if response is empty
  }

  // Extract the first post from the response
  const post = response[0].node;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    let formattedDate = date.toLocaleDateString("en-US", options);
    formattedDate = formattedDate.replace(/,/g, ""); // Remove commas
    return formattedDate;
  };

  return (
    <div className="bg-black dark:bg-white h-screen py-8">
      <img
        src={post.featuredImage.url}
        alt=""
        className="w-[80%] h-full mx-auto rounded-xl relative"
      />
      <div className="absolute w-96 flex flex-col gap-3 bg-white bottom-0 left-40 px-4 py-4 rounded-lg">
        {/* date */}
        <div className="bg-black w-fit  text-white font-semi-bold px-3 py-1 rounded-2xl">
          {/* <h1>Tue Mar 05 2024</h1> */}
          <h1>{formatDate(post.createdAt)}</h1>
        </div>
        <div className=" text-black  w-fit border justify-center border-black px-4  rounded-2xl">
          {post.categories.map((category) => (
            <li className=" px" key={category.slug}>
              {category.name}
            </li>
          ))}
        </div>
        <div className=" font-bold text-xl hover:underline hover:decoration-yellow-400 transition-colors duration-300 cursor-pointer">
          <h1>{post.excerpt}</h1>
        </div>
        <div className=" flex items-center ">
          <img
            src={post.author.photo.url}
            alt=""
            className=" w-12 h-12 rounded-full"
          />
          <p>{post.author.name}</p>
        </div>
      </div>
    </div>
  );
};

export default Header;
