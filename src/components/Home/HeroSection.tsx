import { useEffect, useState } from "react";
import Typewriter from "typewriter-effect";

const images = ["h1.jpg", "h2.jpg", "h3.jpeg"];

const HeroSection = () => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="relative h-screen bg-cover bg-center  transition-all duration-1000"
      style={{ backgroundImage: `url(${images[currentImage]})` }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 flex flex-col items-start justify-center h-full px-6 lg:px-20 text-white w-full lg:w-1/2">
        <h1 className="text-3xl lg:text-6xl font-bold mb-4">
          <Typewriter
            options={{
              strings: [
                'Book Your Favorite <span style="color: #EA580B;">Sports</span> Facility Today',
              ],
              autoStart: true,
              loop: true,
              wrapperClassName: "typewriter-wrapper",
            }}
          />
        </h1>
        <p className="text-base lg:text-2xl mb-6">
          Discover top-notch sports facilities in your area and reserve them at
          your convenience. Whether it's tennis, football, or cricket, we have
          you covered.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <button className="bg-[#EA580B] hover:bg-yellow-600 text-white font-bold py-3 px-6 rounded-full">
            Book Now
          </button>
          <button className="bg-transparent border-2 border-[#EA580B] hover:bg-[#EA580B] text-white font-bold py-3 px-6 rounded-full">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
