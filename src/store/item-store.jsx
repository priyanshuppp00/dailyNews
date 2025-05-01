import { createContext, useState } from "react";

// Create the StoreContext with default values
export const StoreContext = createContext({
  toggleTheme: () => {},
  isDarkMode: true,
  heading: "",
  category: "home",
  setCategory: () => {},
  searchQuery: "",
  setSearchQuery: () => {},
});

const StoreProvider = ({ children }) => {
  const heading = "DailyNews";

  const [isDarkMode, setIsDarkMode] = useState(false);
  const [category, setCategory] = useState("home");
  const [searchQuery, setSearchQuery] = useState("");

  const toggleTheme = () => {
    document.body.style.backgroundColor = isDarkMode
      ? "rgb(243, 244, 246)"
      : "rgb(31, 41, 55)";
    setIsDarkMode((prev) => !prev);
  };

  return (
    <StoreContext.Provider
      value={{
        toggleTheme,
        isDarkMode,
        heading,
        category,
        setCategory,
        searchQuery,
        setSearchQuery,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export default StoreProvider;
