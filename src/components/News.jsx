import React, { useContext, useEffect, useState, useCallback } from "react";
import LoadingSpinner from "./LoadingSpinner";
import Newscard from "./Newscard";
import { StoreContext } from "../store/item-store";

const API_KEY = "b62e6bbaa63044e696e3acb0bcf0ef9d";

const News = ({ country = "us" }) => {
  const { category, searchQuery } = useContext(StoreContext);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchNews = useCallback(
    async (pageNum = 1) => {
      setLoading(true);
      setError(null);
      try {
        let url = "";
        if (searchQuery && searchQuery.trim() !== "") {
          url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(
            searchQuery
          )}&page=${pageNum}&apiKey=${API_KEY}`;
        } else {
          const newsCategory = category === "home" ? "general" : category;
          url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${newsCategory}&page=${pageNum}&apiKey=${API_KEY}`;
        }
        const res = await fetch(url);
        const data = await res.json();
        if (data.status === "ok") {
          if (pageNum === 1) {
            setArticles(data.articles);
          } else {
            setArticles((prevArticles) => [...prevArticles, ...data.articles]);
          }
          setHasMore(data.articles.length > 0);
        } else {
          setError("Failed to fetch news.");
        }
      } catch (error) {
        console.error("Fetch news error:", error);
        setError("Error fetching data: " + error.message);
      } finally {
        setLoading(false);
      }
    },
    [category, country, searchQuery]
  );

  useEffect(() => {
    setPage(1);
    fetchNews(1);
  }, [category, country, searchQuery, fetchNews]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.documentElement.scrollHeight - 100 &&
        !loading &&
        hasMore
      ) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore]);

  useEffect(() => {
    if (page === 1) return;
    fetchNews(page);
  }, [page, fetchNews]);

  return (
    <div className="container mx-auto px-4 mt-20">
      <h2 className="text-2xl font-bold mb-6 text-center">
        {searchQuery && searchQuery.trim() !== ""
          ? `Search Results for "${searchQuery}"`
          : `Top Headlines - ${category.toUpperCase()}`}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article, index) => (
          <Newscard
            key={index}
            title={article.title}
            description={article.description}
            image={article.urlToImage || "https://via.placeholder.com/400x200"}
            url={article.url}
          />
        ))}
      </div>

      {loading && <LoadingSpinner />}
      {error && <p className="text-red-600 text-center">{error}</p>}
      {!loading && articles.length === 0 && (
        <p className="text-center text-gray-700">
          {searchQuery && searchQuery.trim() !== ""
            ? "No match found."
            : "No news found."}
        </p>
      )}
    </div>
  );
};

export default News;
