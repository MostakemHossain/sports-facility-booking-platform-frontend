/* eslint-disable @typescript-eslint/no-explicit-any */
import AOS from "aos";
import "aos/dist/aos.css";
import React from "react";
import { Link } from "react-router-dom";
import { useGetAllFacilityQuery } from "../../redux/features/admin/facility/facilityApi";
import FacilityCard, { Facility } from "./FacilityCard";

const Facilities: React.FC = () => {
  const { data, isLoading } = useGetAllFacilityQuery({});

  React.useEffect(() => {
    AOS.init({ duration: 2000, once: false });
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 mt-5 py-12">
      <div className="text-left mb-12">
        <h1
          className="text-5xl font-bold mb-4 text-[#EA580B]"
          data-aos="fade-down"
        >
          Our Facilities
        </h1>
        <p className="text-lg text-gray-600 md:w-[50%]" data-aos="fade-right">
          Discover our diverse range of facilities designed for all sports
          enthusiasts. Each facility is equipped to ensure a top-notch
          experience.
        </p>
      </div>

      {/* Facility Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {isLoading
          ? [...Array(6)].map((_, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg shadow-lg"
                data-aos="fade-up"
              >
                <FacilityCard facility={undefined as any} />
              </div>
            ))
          : data?.data
              .slice(0, 6)
              .map((facility: Facility) => (
                <FacilityCard key={facility._id} facility={facility} />
              ))}
      </div>

      {/* View All Facilities Button */}
      <div className="text-center mt-12">
        <Link
          to="/facilities"
          className="bg-[#EA580B] text-white py-3 px-6 rounded-md hover:bg-blue-600 transition-colors duration-300"
        >
          View All Facilities
        </Link>
      </div>
    </div>
  );
};

export default Facilities;
