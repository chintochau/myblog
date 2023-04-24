import React from "react";
import Image from "next/image";

const Author = ({ author }) => {
  return (
    <div className="text-center mt-20 mb-8 p-12 relative rounded-lg bg-black bg-opacity-20">
      <div
        className="absolute left-0 right-0 -top-10"
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Image
          src={
            author.photo?.url
              ? author.photo.url
              : "https://as2.ftcdn.net/v2/jpg/02/29/75/83/1000_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg"
          }
          unoptimized
          alt={author.name}
          height="80"
          width="80"
          className="align-middle rounded-full"
        />
      </div>
      <h3 className="text-white mt-4 mb-4 text-xl font-bold">{author.name}</h3>
      <p className="text-white text-ls">{author.bio}</p>
    </div>
  );
};

export default Author;
