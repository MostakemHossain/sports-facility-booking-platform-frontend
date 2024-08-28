import AOS from "aos";
import "aos/dist/aos.css";
import React, { useState } from "react";
import Typewriter from "typewriter-effect";

import { useGetAllFacilityQuery } from "../../redux/features/admin/facility/facilityApi";
import FacilityCard, { Facility } from "./FacilityCard";

const SearchFacility: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { data, isLoading } = useGetAllFacilityQuery("");

  React.useEffect(() => {
    AOS.init({ duration: 1000, once: false });
  }, []);

  // Filter facilities based on search term
  const filteredFacilities = data?.data.filter((facility: Facility) =>
    facility.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto mt-10 px-6 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl lg:text-6xl text-[#EA580B] font-bold mb-4">
          <Typewriter
            options={{
              strings: ["Find Your Perfect Facility"],
              autoStart: true,
              loop: true,
              wrapperClassName: "typewriter-wrapper",
            }}
          />
        </h1>
        <p className="text-lg text-gray-600 mb-6" data-aos="fade-right">
          Use the search bar below to find the facility that best fits your
          needs. Explore our top options now!
        </p>
        <div className="flex justify-center">
          <input
            type="text"
            placeholder="Search Facilities by name, location, price etc."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-3 border border-gray-300 rounded-l-md w-full sm:w-1/2 lg:w-1/3 focus:outline-none focus:border-[#EA580B] transition duration-200"
          />
          <button
            onClick={() => {}}
            className="bg-[#EA580B] text-white py-2 px-4 rounded-r-md hover:bg-blue-600 transition-colors duration-200"
          >
            Search
          </button>
        </div>
      </div>

      {/* Facility Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {isLoading
          ? [...Array(3)].map((_, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg shadow-lg"
                data-aos="fade-up"
              >
                <FacilityCard facility={undefined as any} /> {/* Placeholder */}
              </div>
            ))
          : (filteredFacilities || [])
              .slice(0, 3)
              .map((facility: Facility) => (
                <FacilityCard key={facility._id} facility={facility} />
              ))}
      </div>
    </div>
  );
};

export default SearchFacility;
