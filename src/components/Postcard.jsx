import moment from "moment/moment";
import Link from "next/link";
import React from "react";

const Postcard = ({ post }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-0 lg:p-8 pb-3 mb-8">
      <div className="relative overflow-hidden shadow-md pb-80 mb-6">
        <img
          src={post.featuredImage.url}
          alt={post.title}
          className="object-top absolute h-80 w-full object-cover shadow-lg rounded-t-lg lg:rounded-lg"
        />
      </div>
      <h1 className="transition duration-100 text-center mb-8 cursor-pointer hover:text-blue-600 text-3xl font-semibold">
        <Link href={`/post/${post.slug}`}>{post.title}</Link>
      </h1>
      <div className="block lg:flex text-center items-center justify-center mb-8 w-full">
        <div className="flex items-center justify-center mb-4 lg:mb-0 w-full lg:w-auto">
          <img
            alt={post.author.name}
            height="30px"
            width="30px"
            className="align-middlerounded-full"
            src={
              post.author.photo?.url
                ? post.author.post.url
                : "https://as2.ftcdn.net/v2/jpg/02/29/75/83/1000_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg"
            }
          />
          <p className="inline align-middle text-gray-700 ml-2 text-lg mr-3">
            {post.author.name}
          </p>
        </div>

        <div className="font-medium text-gray-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 inline mr-2 text-yellow-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span>{moment(post.createdAt).format("MMM DD, YYYY")}</span>
        </div>
      </div>
      <p className="text-center text-lg text-gray-700 font-normal px-4 lg:px-5 mb-8">
        {post.excerpt}
      </p>
      <div className="text-center">
        <Link
          className="transition duration-200 transform hover:-translate-y-1 mx-5 hover:text-blue-500  inline-block bg-blue-100 rounded-full p-2"
          href={"/"}
        >
          Continue Reading
        </Link>
      </div>
    </div>
  );
};

export default Postcard;
