import Activities from "../components/Home/Activities";
import Benefit from "../components/Home/Benefit";
import Blog from "../components/Home/Blog";
import Facilities from "../components/Home/Facilities";
import Footer from "../components/Home/Footer";
import HeroSection from "../components/Home/HeroSection";
import Navbar from "../components/Home/Navbar";
import SearchFacility from "../components/Home/SearchFacility";

const Home = () => {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <SearchFacility />

      <Activities />
      <Facilities />
      <Benefit />
      <Blog />
      <Footer />
    </div>
  );
};

export default Home;
