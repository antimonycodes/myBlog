import { useEffect, useState } from "react";
import ContentLoader from "react-content-loader";
import { getPost } from "../services";
import { Link } from "react-router-dom";

const Header = () => {
  const [response, setResponse] = useState([]);

  const [loading, setLoading] = useState(true);

  const headerPost = async () => {
    try {
      const graphqlAPI = import.meta.env.VITE_GRAPHCMS_ENDPOINT;
      const response = await getPost(graphqlAPI);
      setResponse(response);
      setLoading(false);
      console.log(response);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    headerPost();
  }, []);

  if (loading) {
    return (
      <div className="bg-black dark:bg-white h-screen py-8">
        <ContentLoader
          speed={2}
          width={600}
          height={400}
          viewBox="0 0 600 400"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          {/* Placeholder for image */}
          <rect x="0" y="0" rx="10" ry="10" width="600" height="400" />
          {/* Placeholder for date */}
          <rect x="0" y="420" rx="5" ry="5" width="100" height="20" />
          {/* Placeholder for category */}
          <rect x="0" y="450" rx="5" ry="5" width="100" height="20" />
          {/* Placeholder for excerpt */}
          <rect x="0" y="480" rx="5" ry="5" width="400" height="30" />
          {/* Placeholder for author photo */}
          <circle cx="40" cy="530" r="20" />
          {/* Placeholder for author name */}
          <rect x="70" y="515" rx="5" ry="5" width="100" height="20" />
        </ContentLoader>
      </div>
    );
  }

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

  // console.log(post.content.raw);

  return (
    <div className="bg-black dark:bg-white h-screen py-8">
      <img
        src={post.featuredImage.url}
        alt=""
        className="w-[80%] h-full mx-auto rounded-xl relative"
      />
      <div className="absolute w-[600px] flex flex-col gap-3 bg-white bottom-0 left-40 px-4 py-4 rounded-lg">
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
        <div className=" font-bold text-3xl hover:underline hover:decoration-purple-600 transition-colors duration-300 cursor-pointer">
          <Link>
            <h1>{post.excerpt}</h1>
          </Link>
        </div>
        <div className=" flex items-center ">
          <img
            src={post.author.photo.url}
            alt=""
            className=" w-12 h-12 rounded-full"
          />
          <p>{post.author.name}</p>
          {/* {console.log(post.content.raw)} */}
        </div>
      </div>
    </div>
  );
};

export default Header;
