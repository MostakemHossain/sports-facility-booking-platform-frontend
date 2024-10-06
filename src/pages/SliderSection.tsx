/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

const SliderSection = () => {
  const NextArrow = ({ onClick }: any) => {
    return (
      <div
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white rounded-full p-2 cursor-pointer z-10"
        onClick={onClick}
      >
        <FaChevronRight size={24} />
      </div>
    );
  };

  const PrevArrow = ({ onClick }: any) => {
    return (
      <div
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white rounded-full p-2 cursor-pointer z-10"
        onClick={onClick}
      >
        <FaChevronLeft size={24} />
      </div>
    );
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  const faqs = [
    {
      question: "What is the Sports Facility Booking Platform?",
      answer:
        "It is a platform where users can book sports facilities, join sports academies, and access various sports-related services.",
    },
    {
      question: "How do I book a sports facility?",
      answer:
        "You can easily book a facility by selecting the desired date, time, and location on our platform.",
    },
    {
      question: "Are there any membership offers available?",
      answer:
        "Yes, we offer several membership plans with exclusive benefits and discounts on bookings.",
    },
    {
      question: "What types of sports facilities are available?",
      answer:
        "We provide access to individual sports courts, kids sports academies, and more, all managed by experts.",
    },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-7xl mx-auto mt-16 mb-10">
      <div className="flex flex-col gap-5 lg:flex-row items-center justify-between rounded-lg ">
        <div className="relative w-full lg:w-1/2 mb-8 mt-10 lg:mb-0">
          <Slider {...sliderSettings}>
            {[
              "https://www.wfla.com/wp-content/uploads/sites/71/2024/02/GettyImages-1199820666.jpg?w=2124&h=1411&crop=1",
              "https://img.freepik.com/free-photo/kid-running-field-full-shot_23-2149457235.jpg?size=626&ext=jpg&ga=GA1.1.1635718394.1705856502&semt=ais_hybrid",
              "https://mayorsofeurope.eu/wp-content/uploads/2022/04/european-cities-with-best-sports-facilities-1080x675.jpg",
              "https://chsbleuprint.com/wp-content/uploads/2023/02/European-Sports.jpeg",
            ].map((image, index) => (
              <div key={index} className="rounded-lg overflow-hidden">
                <img
                  src={image}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            ))}
          </Slider>
        </div>

        <div className="w-full lg:w-1/2 space-y-6">
          <h2 className="text-4xl font-bold mb-4 text-gray-800">
            Frequently Asked Questions
          </h2>
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="p-4 border rounded-lg bg-white shadow-sm"
            >
              <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => toggleFAQ(index)}
              >
                <h3 className="text-lg font-bold text-gray-700">
                  {faq.question}
                </h3>
                <button className="text-gray-500 hover:text-gray-700 focus:outline-none">
                  {openIndex === index ? "−" : "+"}
                </button>
              </div>
              {openIndex === index && (
                <p className="text-gray-600 mt-2">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SliderSection;
