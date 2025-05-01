import Navbar from "./components/Navabar";
import Mainheading from "./components/Mainheading";
import Footer from "./components/Footer";
import News from "./components/News";
import About from "./components/About";
import { useContext } from "react";
import StoreProvider, { StoreContext } from "./store/item-store";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <StoreProvider>
      <AppContent />
    </StoreProvider>
  );
}

function AppContent() {
  const { category, setCategory, searchQuery, setSearchQuery } =
    useContext(StoreContext);

  const newsCategory = category === "home" ? "general" : category;

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    if (newCategory !== "") {
      setSearchQuery("");
    }
  };

  return (
    <>
      <Navbar
        category={category}
        onCategoryChange={handleCategoryChange}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <Mainheading />
      {category === "about" ? (
        <About />
      ) : (
        <News country="us" category={newsCategory} searchQuery={searchQuery} />
      )}
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
