import React from "react";

const Newscard = ({ title, description, image, url }) => {
  const truncate = (text, maxLength) => {
    if (!text) return "";
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col">
      <img src={image} alt="news" className="w-full h-48 object-cover" />
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="text-lg font-semibold mb-2">{truncate(title, 80)}</h3>
        <p className="text-gray-700 mb-3 flex-grow">
          {truncate(description || "No description available.", 150)}
        </p>
        <div className="text-right">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl bg-yellow-500 text-black px-3 py-1 rounded hover:bg-yellow-400 transition duration-300 inline-block"
          >
            Read More
          </a>
        </div>
      </div>
    </div>
  );
};

export default Newscard;
