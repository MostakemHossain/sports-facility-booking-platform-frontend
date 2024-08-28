import Activities from "../components/Home/Activities";
import Benefit from "../components/Home/Benefit";
import Facilities from "../components/Home/Facilities";
import Footer from "../components/Home/Footer";
import HeroSection from "../components/Home/HeroSection";
import Navbar from "../components/Home/Navbar";

const Home = () => {
  return (
    <div>
      <Navbar />
      <HeroSection />

      <Activities />
      <Facilities />
      <Benefit />
      <Footer />
    </div>
  );
};

export default Home;
