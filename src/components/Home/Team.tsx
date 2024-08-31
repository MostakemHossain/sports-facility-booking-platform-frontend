import { Skeleton } from "antd";
import React from "react";
import { useGetAllEmployeeQuery } from "../../redux/features/admin/Employee/employee.api";
import TeamCard from "./TeamCard";

interface Employee {
  _id: string;
  name: string;
  designation: string;
  image: string;
  phone: string;
  facebookURL: string;
  linkedinURL: string;
  instrURL: string;
  __v: number;
}

const Team: React.FC = () => {
  const { data, isLoading } = useGetAllEmployeeQuery("");

  if (isLoading) {
    return (
      <div>
        <Skeleton />
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-16 py-10">
      <h2 className="text-4xl font-bold text-center mb-10">Our Team</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {data.data.map((member: Employee) => (
          <TeamCard
            key={member._id}
            member={{
              name: member.name,
              role: member.designation,
              phone: member.phone,
              image: member.image,
              facebookURL: member.facebookURL,
              linkedinURL: member.linkedinURL,
              instrURL: member.instrURL,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Team;
