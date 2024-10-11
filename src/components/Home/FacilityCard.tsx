import AOS from "aos";
import "aos/dist/aos.css";
import React, { useEffect } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

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

interface FacilityCardProps {
  facility: Facility;
}

const FacilityCard: React.FC<FacilityCardProps> = ({ facility }) => {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000, once: false });
  }, []);

  const handleViewDetails = () => {
    navigate(`/facility/${facility._id}`);
  };

  return (
    <div
      data-aos="fade-up"
      className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
    >
      <img
        src={facility?.photo}
        alt={facility?.name}
        className="w-full h-72 object-cover"
      />
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-2">{facility?.name}</h2>
        <p className="text-gray-700 mb-4 truncate">{facility?.description}</p>
        <div className="flex justify-between items-center mb-4">
          <div className="text-lg font-bold text-[#EC6628]">
            ${facility?.pricePerHour}/hr
          </div>
          <div className="flex items-center text-lg font-medium text-gray-600">
            <FaMapMarkerAlt className="mr-2" />
            {facility?.location}
          </div>
        </div>
        <button
          className="w-full bg-[#EA580B] text-white py-2 rounded-md hover:bg-[#f05401] transition-colors duration-200 focus:ring-2 focus:ring-blue-400"
          onClick={handleViewDetails}
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default FacilityCard;
