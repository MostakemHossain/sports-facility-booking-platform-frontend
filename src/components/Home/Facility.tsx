import { Input, Skeleton } from "antd";
import AOS from "aos";
import "aos/dist/aos.css";
import React, { useEffect } from "react";
import { useGetAllFacilityQuery } from "../../redux/features/admin/facility/facilityApi";
import FacilityCard from "./FacilityCard";
import Navbar from "./Navbar";

export interface Facility {
  _id: string;
  name: string;
  description: string;
  pricePerHour: number;
  location: string;
  photo: string;
  isDeleted: boolean;
  __v: number;
}

const Facility: React.FC = () => {
  const { data, isLoading } = useGetAllFacilityQuery("");

  useEffect(() => {
    AOS.init({ duration: 1000, once: false });
  }, []);
  if (isLoading) {
    return <Skeleton />;
  }
  return (
    <div className="max-w-7xl mx-auto">
      <Navbar />
      <div className="p-6">
        <h1 className="text-5xl font-bold mb-4" data-aos="fade-down">
          Our Facilities
        </h1>
        <p className="text-lg text-gray-700 mb-6 mt-5" data-aos="fade-right">
          Explore our range of top-notch facilities, perfect for sports
          enthusiasts of all levels. Discover our state-of-the-art sports
          facilities designed to cater to athletes and fitness enthusiasts of
          all levels. Whether you're training for a competition or enjoying a
          casual workout, our venues offer the perfect environment for your
          sports activities.
        </p>
        <div className="flex justify-end mb-6" data-aos="fade-left">
          <Input
            type="text"
            placeholder="Search By name,location, price etc."
            className="p-2 border border-gray-300 mb-5 rounded w-full sm:w-1/3 focus:outline-none focus:border-blue-400 transition duration-200"
          />
        </div>
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg shadow-lg"
                data-aos="fade-up"
              >
                <Skeleton active />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data?.data.map((facility: Facility) => (
              <FacilityCard key={facility._id} facility={facility} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Facility;
