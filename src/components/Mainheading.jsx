import React, { useEffect, useState } from "react";

const Mainheading = () => {
  const [breakingNews, setBreakingNews] = useState("");

  const API_KEY = "970d29bf2d964043826f5dce03dde49f";

  useEffect(() => {
    const fetchBreakingNews = async () => {
      try {
        const res = await fetch(
          `https://newsapi.org/v2/top-headlines?country=us&pageSize=1&apiKey=${API_KEY}`
        );
        const data = await res.json();
        if (data.articles && data.articles.length > 0) {
          setBreakingNews(data.articles[0].title);
        } else {
          setBreakingNews("No breaking news available at the moment.");
        }
      } catch (error) {
        setBreakingNews("Failed to load breaking news.");
        console.error("Error fetching breaking news:", error);
      }
    };

    fetchBreakingNews();
  }, []);

  return (
    <div className="mt-[60px] bg-red-600 text-white font-bold py-2 overflow-hidden relative">
      <div className="flex w-max animate-[marquee_15s_linear_infinite]">
        <span className="px-4 whitespace-nowrap">
          <strong>Breaking News:</strong> {breakingNews}
        </span>
      </div>

      <style>
        {`
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
      `}
      </style>
    </div>
  );
};

export default Mainheading;
