// import { useEffect, useState } from "react";
// import { FaArrowRightLong } from "react-icons/fa6";
// import { getPost } from "../services";
// import { Link } from "react-router-dom";

// const Trending = () => {
//   const [response, setResponse] = useState([]);
//   const [loading, setLoading] = useState(true); // State to track loading status

//   const truncateTitle = (title, maxLength) => {
//     if (title.length > maxLength) {
//       return title.substring(0, maxLength) + "...";
//     } else {
//       return title;
//     }
//   };

//   const fetchPosts = async () => {
//     try {
//       const graphqlAPI = import.meta.env.VITE_GRAPHCMS_ENDPOINT;
//       const response = await getPost(graphqlAPI);
//       setResponse(response);
//       setLoading(false); // Set loading to false after data is fetched
//       console.log("Posts", response);
//     } catch (error) {
//       console.log("error", error);
//     }
//   };

//   useEffect(() => {
//     fetchPosts();
//   }, []);

//   return (
//     <>
//       <div className=" pt-8 bg-black xl:px-32 px-4 sm:px-8 md:px-12 lg:px-16 text-white">
//         <div className="flex items-center justify-between cursor-pointer">
//           <h1 className="text-5xl">Trending Posts</h1>
//           <div className="flex items-center gap-2">
//             <p>See more posts</p>
//             <span className="mt-1 hover:scale-150">
//               <FaArrowRightLong />
//             </span>
//           </div>
//         </div>
//         <div className=" pt-8 grid sm:grid-cols-2  md:grid-cols-3  lg:grid-cols-4 w-full gap-4">
//           {loading // Render placeholders if loading is true
//             ? Array.from({ length: 8 }).map((_, index) => (
//                 <div key={index} className=" w-fit">
//                   <div className=" h-48 bg-gray-300 animate-pulse"></div>{" "}
//                   {/* Placeholder for image */}
//                   <div className="mt-3 flex gap-2">
//                     <span className="flex w-24 h-8 bg-gray-300 animate-pulse"></span>{" "}
//                     {/* Placeholder for category */}
//                   </div>
//                   <div className="pt-3">
//                     <span className="w-2/3 h-6 bg-gray-300 animate-pulse block"></span>{" "}
//                     {/* Placeholder for title */}
//                   </div>
//                   <div className="pt-3 flex items-center gap-4">
//                     <span className="w-12 h-12 bg-gray-300 rounded-full animate-pulse"></span>{" "}
//                     {/* Placeholder for author photo */}
//                     <span className="w-24 h-6 bg-gray-300 animate-pulse"></span>{" "}
//                     {/* Placeholder for author name */}
//                   </div>
//                 </div>
//               ))
//             : response.map((post, index) => (
//                 <div key={index} className=" w-fit">
//                   <div className=" h-48 ">
//                     <img
//                       src={post.node.featuredImage.url}
//                       alt={post.node.title}
//                       className=" w-full h-full object-cover"
//                     />
//                   </div>
//                   <div className=" mt-3 flex gap-2">
//                     {post.node.categories?.map((category) => (
//                       <span
//                         className="flex text-white w-fit border justify-center border-purple-600 px-4 rounded-2xl"
//                         key={category.slug}
//                       >
//                         {category.name}
//                       </span>
//                     ))}
//                   </div>
//                   <div>
//                     <Link to={`/Post/${post.node.slug}`}>
//                       <h1 className="pt-3">
//                         {truncateTitle(post.node.title, 65)}
//                       </h1>
//                     </Link>
//                   </div>
//                   <div className="pt-3 flex items-center gap-4">
//                     <img
//                       src={post.node.author.photo.url}
//                       alt=""
//                       className="w-14 h-14 rounded-full"
//                     />
//                     <h1>{post.node.author.name}</h1>
//                   </div>
//                 </div>
//               ))}
//         </div>
//       </div>
//     </>
//   );
// };

// export default Trending;
import { useEffect, useState } from "react";
import ContentLoader from "react-content-loader";
import { FaArrowRightLong } from "react-icons/fa6";
import { getPost } from "../services";
import { Link } from "react-router-dom";

const Trending = () => {
  const [response, setResponse] = useState([]);
  const [loading, setLoading] = useState(true);

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
      setLoading(false);
      console.log("Posts-", response);
      console.log(response);
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
          {loading
            ? Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className=" w-fit">
                  {/* Placeholder Loader */}
                  <ContentLoader
                    speed={2}
                    width={280}
                    height={300}
                    viewBox="0 0 400 300"
                    backgroundColor="#f3f3f3"
                    foregroundColor="#ecebeb"
                  >
                    <rect
                      x="0"
                      y="0"
                      rx="10"
                      ry="10"
                      width="80%"
                      height="200"
                    />
                    <rect x="0" y="220" rx="3" ry="3" width="70%" height="10" />
                    <rect x="0" y="240" rx="3" ry="3" width="50%" height="10" />
                    <rect x="0" y="260" rx="3" ry="3" width="80%" height="10" />
                  </ContentLoader>
                </div>
              ))
            : response.map((post, index) => (
                <div key={index} className=" w-fit">
                  <div className=" h-48 ">
                    <img
                      src={post.node.featuredImage.url}
                      alt={post.node.title}
                      className=" w-full h-full object-cover"
                    />
                  </div>
                  <div className=" mt-3 flex gap-2">
                    {post.node.categories?.map((category) => (
                      <span
                        className="flex text-white w-fit border justify-center border-purple-600 px-4 rounded-2xl"
                        key={category.slug}
                      >
                        {category.name}
                      </span>
                    ))}
                  </div>
                  <div>
                    <Link to={`/Post/${post.node.slug}`}>
                      <h1 className="pt-3">
                        {truncateTitle(post.node.title, 65)}
                      </h1>
                    </Link>
                  </div>
                  <div className="pt-3 flex items-center gap-4">
                    <img
                      src={post.node.author.photo.url}
                      alt=""
                      className="w-14 h-14 rounded-full"
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
