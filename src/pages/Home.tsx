import Activities from "../components/Home/Activities";
import Footer from "../components/Home/Footer";
import HeroSection from "../components/Home/HeroSection";
import Navbar from "../components/Home/Navbar";

const Home = () => {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <Activities />
      <Footer />
    </div>
  );
};

export default Home;
