import { useEffect, useState } from "react";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import Activities from "../components/Home/Activities";
import Benefit from "../components/Home/Benefit";
import Blog from "../components/Home/Blog";
import Facilities from "../components/Home/Facilities";
import Footer from "../components/Home/Footer";
import HeroSection from "../components/Home/HeroSection";
import Navbar from "../components/Home/Navbar";
import SearchFacility from "../components/Home/SearchFacility";

const Home = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [scrollDirection, setScrollDirection] = useState("up");
  const [isScrolling, setIsScrolling] = useState(false);

  const handleScroll = () => {
    const currentScrollPos = window.scrollY;
    if (currentScrollPos > scrollPosition) {
      setScrollDirection("down");
    } else {
      setScrollDirection("up");
    }
    setScrollPosition(currentScrollPos);
    setIsScrolling(true);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToNextSection = () => {
    const nextSection = document.getElementById("search-facility-section");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    } else {
      console.warn("Element with id 'search-facility-section' not found.");
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    const timeoutId = setTimeout(() => {
      setIsScrolling(false);
    }, 50);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeoutId);
    };
  }, [scrollPosition]);

  return (
    <div>
      <Navbar />
      <HeroSection />

      {scrollPosition > 100 && (!isScrolling || scrollDirection === "up") && (
        <button
          onClick={scrollToTop}
          style={{
            position: "fixed",
            bottom: "30px",
            right: "20px",
            backgroundColor: "#EA580B",
            color: "#fff",
            border: "none",
            borderRadius: "50%",
            padding: "10px",
            cursor: "pointer",
            zIndex: 1000,
          }}
          aria-label="Scroll to Top"
        >
          <FaArrowUp size={20} />
        </button>
      )}

      {scrollPosition > 100 && isScrolling && scrollDirection === "down" && (
        <button
          onClick={scrollToNextSection}
          style={{
            position: "fixed",
            bottom: "30px",
            right: "20px",
            backgroundColor: "#EA580B",
            color: "#fff",
            border: "none",
            borderRadius: "50%",
            padding: "10px",
            cursor: "pointer",
            zIndex: 1000,
          }}
          aria-label="Scroll Down"
        >
          <FaArrowDown size={20} />
        </button>
      )}

      <SearchFacility  />
      <Activities />
      <Facilities />
      <Benefit />
      <Blog />
      <Footer />
    </div>
  );
};

export default Home;
