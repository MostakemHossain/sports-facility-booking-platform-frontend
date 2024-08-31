import React from "react";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";

interface MemberProps {
  member: {
    name: string;
    role: string;
    phone: string;
    image: string;
    facebookURL?: string;
    linkedinURL?: string;
    instrURL?: string;
  };
}

const TeamCard: React.FC<MemberProps> = ({ member }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:bg-blue-500 group">
      <div className="relative overflow-hidden">
        <img
          src={member?.image}
          alt={member?.name}
          className="w-full h-[50%] mx-auto object-cover  transform transition-transform duration-300 group-hover:rotate-3"
        />

        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center space-x-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <a
            href={member?.facebookURL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-blue-300 transition-colors duration-300"
          >
            <FaFacebookF size={24} />
          </a>
          <a
            href={member?.linkedinURL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-blue-300 transition-colors duration-300"
          >
            <FaLinkedinIn size={24} />
          </a>
          <a
            href={member?.instrURL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-blue-300 transition-colors duration-300"
          >
            <FaInstagram size={24} />
          </a>
        </div>
      </div>
      <div className="p-4 text-center group-hover:text-white transition-colors duration-300">
        <h3 className="text-xl font-semibold mb-2">{member?.name}</h3>
        <p className="text-gray-600 mb-4 group-hover:text-white">
          {member?.role}
        </p>
        <p className="text-gray-800 font-bold group-hover:text-white">
          {member?.phone}
        </p>
      </div>
    </div>
  );
};

export default TeamCard;
