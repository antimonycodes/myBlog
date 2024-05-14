import { useEffect, useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { getPost } from "../services";
import { Link } from "react-router-dom";

const Trending = () => {
  const [response, setResponse] = useState([]);

  const truncateTitle = (title, maxLength) => {
    if (title.length > maxLength) {
      return title.substring(0, maxLength) + "...";
    } else {
      return title;
    }
  };

  const fetchPosts = async () => {
    try {
      const graphqlAPI = import.meta.env.VITE_GRAPHCMS_ENDPOINT;
      const response = await getPost(graphqlAPI);
      setResponse(response);
      console.log("Posts", response);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <>
      <div className=" pt-8 bg-black xl:px-32 px-4 sm:px-8 md:px-12 lg:px-16 text-white">
        <div className="flex items-center justify-between cursor-pointer">
          <h1 className="text-5xl">Trending Posts</h1>
          <div className="flex items-center gap-2">
            <p>See more posts</p>
            <span className="mt-1 hover:scale-150">
              <FaArrowRightLong />
            </span>
          </div>
        </div>
        <div className=" pt-8 grid sm:grid-cols-2  md:grid-cols-3  lg:grid-cols-4 w-full gap-4">
          {response.map((post, index) => (
            <div key={index} className=" w-fit">
              <div className=" h-48 ">
                <img
                  src={post.node.featuredImage.url}
                  alt={post.node.title}
                  className=" w-full h-full object-center"
                />
              </div>
              {/*  */}
              <div className=" mt-3 flex gap-2">
                {post.node.categories?.map((category) => {
                  return (
                    <>
                      <span
                        className=" flex text-white w-fit border justify-center border-purple-600 px-4  rounded-2xl"
                        key={category.slug}
                      >
                        {category.name}
                      </span>
                    </>
                  );
                })}
              </div>
              {/*  */}
              <div>
                <Link to={`/Post/${post.node.slug}`}>
                  <h1 className=" pt-3 ">
                    {truncateTitle(post.node.title, 65)}
                  </h1>
                </Link>
              </div>
              {/*  */}
              <div className=" pt-3 flex items-center gap-4">
                <img
                  src={post.node.author.photo.url}
                  alt=""
                  className=" w-14 h-14 rounded-full"
                />
                <h1>{post.node.author.name}</h1>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Trending;
