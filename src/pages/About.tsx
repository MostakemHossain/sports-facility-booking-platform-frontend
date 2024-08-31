import Footer from "../components/Home/Footer";
import Navbar from "../components/Home/Navbar";
import Team from "../components/Home/Team";
import SliderSection from "./SliderSection";
import TrainingSection from "./TrainingSection";

const About = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <TrainingSection />
      <SliderSection />
      <Team />

      <Footer />
    </div>
  );
};

export default About;
