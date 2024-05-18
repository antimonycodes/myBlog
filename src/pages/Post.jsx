import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { request, gql } from "graphql-request";
import { TbArrowWaveRightUp } from "react-icons/tb";
import { BiSolidMessage } from "react-icons/bi";

const Post = () => {
  const { slug } = useParams(); // Extracting the slug parameter from the URL
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const graphqlAPI = import.meta.env.VITE_GRAPHCMS_ENDPOINT;
        const query = gql`
          query GetPost($slug: String!) {
            post(where: { slug: $slug }) {
              author {
                bio
                name
                id
                photo {
                  url
                }
              }
              createdAt
              slug
              title
              excerpt
              featuredImage {
                url
              }
              categories {
                name
                slug
              }
              content {
                raw
              }
            }
          }
        `;

        const result = await request(graphqlAPI, query, { slug });
        setPost(result.post);
      } catch (error) {
        console.error("Error fetching post data:", error);
      }
    };

    fetchPostData();
  }, [slug]);

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

  if (!post) {
    return <div>Loading...</div>;
  }

  const getContentFragment =(index,text,obj,type)=>{
    let modifiedText = text
    if (obj){
      if(obj.bold){
        modifiedText = (<b key={index}>{text}</b>)
      }
      if(obj.italic){
        modifiedText = (<em key={index}>{text}</em>)
      }
      if(obj.underline){
        modifiedText = (<u key={index}>{text}</u>)
      }
    }

    switch(type){
      case 'heading-three';
      return <h3 key={index} className=" text-xl font-semibold mb-4">{modifiedText}</h3>
    }

  }

  return (
    <div>
      <div className=" w-full  bg-[#8E65C0] pt-16 px-4 ">
        <h1 className=" sm:px-8 font-bold text-3xl md:text-4xl lg:text-5xl text-left leading-10 sm:w-[90%]">
          {post.title}
        </h1>
        <div className=" sm:px-8 font-semibold text-gray-600 mt-4 italic text-base md:text-lg">
          <div className=" flex item-center underline">
            <p>Quick Summary</p>
            <span className=" mt-2">
              <TbArrowWaveRightUp />
            </span>
          </div>
          <span className=" text-black">{post.excerpt}</span>
        </div>
        {/*  */}
        <div className=" sm:px-12 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className=" mt-4 flex gap-4">
            <img
              src={post.author.photo.url}
              className=" rounded-full w-16 h-16"
              alt=""
            />
            <div>
              <h3 className=" text-gray-600">
                By{" "}
                <span className=" text-black font-semibold">
                  {post.author.name}
                </span>
              </h3>
              <h3 className=" italic font-normal">
                {formatDate(post.createdAt)}
              </h3>
            </div>
          </div>
          {/*  */}
          <div className=" flex items-center gap-4 cursor-pointer">
            <div className=" mt-4 text-5xl">
              <BiSolidMessage width={200} />
            </div>
            <h2 className=" font-bold text-xl">Start Discussing</h2>
          </div>
        </div>

        {/* <p>Author: {post.author.name}</p>{" "} */}
      </div>
      {/*  */}
      {/* <div>
        <img src={post.featuredImage.url} alt="" />
      </div> */}
      <div className=" w-full bg-black px-4">
        {console.log("content", post.content.raw)}
        <h1>
          {post.content.raw.map((typeObj, index) => {
            const children = typeObj.children.map(item, itemIndex) => getContentFragment(itemIndex,item.text,item )
            return getContentFragment(index,children,typeObj,typeObject.type)
          })}
        </h1>
      </div>
    </div>
  );
};

export default Post;
