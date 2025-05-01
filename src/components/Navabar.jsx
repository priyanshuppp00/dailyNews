import React, { useContext, useState } from "react";
import { Search } from "lucide-react";
import { StoreContext } from "../store/item-store";

const Navbar = () => {
  const { category, setCategory, searchQuery, setSearchQuery } =
    useContext(StoreContext);

  const [isOpen, setIsOpen] = useState(false);
  const toggleNav = () => setIsOpen(!isOpen);

  const categories = [
    "Home",

    "Business",
    "Sports",
    "Entertainment",
    "Technology",
    "About",
  ];

  const handleSearchInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (value.trim() !== "") {
      setCategory(""); // Switch to search mode
    } else {
      setCategory("home"); // Switch back to home if search cleared
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // No additional action needed on submit since search is reactive
  };

  return (
    <nav className="bg-gray-900 text-white fixed top-0 w-full z-50 shadow">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <a className="text-2xl font-bold" href="#">
          Daily<span className="text-yellow-400">news</span>
        </a>
        <button className="md:hidden" onClick={toggleNav}>
          {isOpen ? "✖" : "☰"}
        </button>
        <div className="hidden md:flex md:items-center md:gap-6">
          <ul className="flex gap-4">
            {categories.map((cat) => (
              <li key={cat}>
                <a
                  href="#"
                  onClick={() => {
                    setCategory(cat.toLowerCase());
                    setSearchQuery("");
                  }}
                  className={`hover:text-yellow-400 ${
                    cat.toLowerCase() === category
                      ? "font-bold text-yellow-400"
                      : ""
                  }`}
                >
                  {cat}
                </a>
              </li>
            ))}
          </ul>
          <form className="flex ml-6" onSubmit={handleSearch}>
            <input
              type="text"
              id="newsQuery"
              placeholder="Search news"
              className="px-3 py-1.5 rounded-l bg-gray-800 text-white placeholder-gray-400 outline-none"
              value={searchQuery}
              onChange={handleSearchInputChange}
            />
            <button
              type="submit"
              id="searchBtn"
              className="flex items-center gap-2 bg-yellow-400 text-black px-4 py-1.5 rounded-r font-semibold hover:bg-yellow-300 transition"
            >
              <Search size={18} /> Search
            </button>
          </form>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-3 bg-gray-800 text-white">
          {categories.map((cat) => (
            <a
              key={cat}
              href="#"
              onClick={() => {
                setCategory(cat.toLowerCase());
                setSearchQuery("");
              }}
              className={`block ${
                cat.toLowerCase() === category
                  ? "font-bold text-yellow-400"
                  : ""
              }`}
            >
              {cat}
            </a>
          ))}
          <form className="flex" onSubmit={handleSearch}>
            <input
              type="text"
              id="newsQueryMobile"
              placeholder="Search news"
              className="px-3 py-1.5 rounded-l bg-gray-700 text-white placeholder-gray-400 outline-none flex-grow"
              value={searchQuery}
              onChange={handleSearchInputChange}
            />
            <button
              type="submit"
              id="searchBtnMobile"
              className="flex items-center gap-2 bg-yellow-400 text-black px-4 py-1.5 rounded-r font-semibold hover:bg-yellow-300 transition"
            >
              <Search size={18} /> Search
            </button>
          </form>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
