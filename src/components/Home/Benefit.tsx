import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { FaCalendarCheck, FaDollarSign, FaHeadset } from "react-icons/fa";

const Benefit = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
    });
  }, []);

  return (
    <section className="py-20 bg-gradient-to-r from-blue-50 to-blue-100">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Text Section */}
          <div className="flex flex-col justify-center" data-aos="fade-right">
            <h2 className="text-7xl font-bold text-gray-800 mb-8">
              Get extra benefit & the best our services.
            </h2>
            <p className="text-lg text-gray-500 mb-8 leading-relaxed">
              Elevate your experience with our exclusive perks. Enjoy special
              discounts, priority booking, and round-the-clock support.
              Everything you need for an enhanced experience is just a click
              away.
            </p>
            <a
              href="#"
              className="inline-block bg-blue-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg md:w-[30%] hover:bg-blue-700 transition duration-300"
              data-aos="fade-up"
            >
              Discover More
            </a>
          </div>

          {/* Benefits Section */}
          <div className="space-y-8">
            <div
              className="bg-white shadow-lg rounded-lg p-8 flex items-start transform transition-transform duration-300 hover:scale-105 hover:shadow-xl"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <div className="bg-blue-600 text-white p-4 rounded-full">
                <FaDollarSign className="w-10 h-10" />
              </div>
              <div className="ml-6">
                <h3 className="text-2xl font-bold  text-gray-800">
                  Exclusive Discounts
                </h3>
                <p className="text-gray-600 mt-3 leading-relaxed">
                  Save up to 30% on bookings at select sports facilities. Play
                  more, pay less with our exclusive offers.
                </p>
              </div>
            </div>

            <div
              className="bg-white shadow-lg rounded-lg p-8 flex items-start transform transition-transform duration-300 hover:scale-105 hover:shadow-xl"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className="bg-blue-600 text-white p-4 rounded-full">
                <FaCalendarCheck className="w-10 h-10" />
              </div>
              <div className="ml-6">
                <h3 className="text-2xl font-bold  text-gray-800">
                  Priority Booking
                </h3>
                <p className="text-gray-600 mt-3 leading-relaxed">
                  Secure your spot during peak hours with priority booking
                  options available exclusively to our members.
                </p>
              </div>
            </div>

            <div
              className="bg-white shadow-lg rounded-lg p-8 flex items-start transform transition-transform duration-300 hover:scale-110 hover:shadow-xl"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <div className="bg-blue-600 text-white p-4 rounded-full">
                <FaHeadset className="w-10 h-10" />
              </div>
              <div className="ml-6">
                <h3 className="text-2xl font-bold text-gray-800">
                  24/7 Support
                </h3>
                <p className="text-gray-500 mt-3 leading-relaxed">
                  Our support team is available 24/7 to assist you with any
                  inquiries or booking needs, ensuring a seamless experience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefit;
