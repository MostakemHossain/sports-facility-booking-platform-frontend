/* eslint-disable no-extra-boolean-cast */
import { Flex, Input, Skeleton, Spin } from "antd";
import AOS from "aos";
import "aos/dist/aos.css";
import React, { useEffect, useState } from "react";
import { useGetAllFacilityQuery } from "../../redux/features/admin/facility/facilityApi";
import { useDebounced } from "../../redux/hooks";
import FacilityCard from "./FacilityCard";
import Footer from "./Footer";
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const query: Record<string, any> = {};
  const [searchTerm, setsearchTerm] = useState("");
  const debouncedTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });
  if (!!debouncedTerm) {
    query["searchTerm"] = searchTerm;
  }

  const { data, isLoading } = useGetAllFacilityQuery({ ...query });

  useEffect(() => {
    AOS.init({ duration: 1000, once: false });
  }, []);
  if (isLoading) {
    return <Skeleton />;
  }
  return (
    <div>
      <div className="max-w-7xl mx-auto">
        <Navbar />
        <div className="p-6">
          <h1
            className="text-5xl font-bold text-orange-600 mb-4"
            data-aos="fade-down"
          >
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
              onChange={(e) => setsearchTerm(e.target.value)}
              placeholder="Search By name,location, price etc."
              className="p-2 border border-gray-300 mb-5 rounded w-full sm:w-1/3 focus:outline-none focus:border-blue-400 transition duration-200"
            />
          </div>
          {isLoading ? (
            <div className="flex justify-center items-center">
              <div>
                <Flex align="center" gap="middle">
                  <Spin size="large" />
                </Flex>
              </div>
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
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Facility;
