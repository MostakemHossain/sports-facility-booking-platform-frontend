import { Skeleton } from "antd";
import { FaDollarSign, FaMapMarkerAlt } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { useGetFacilityByIdQuery } from "../../redux/features/admin/facility/facilityApi";
import { useCurrentUser } from "../../redux/features/auth/authSlice";
import { useAppSelector } from "../../redux/hooks";
import Footer from "./Footer";
import Navbar from "./Navbar";

const FacilityDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { data, isLoading } = useGetFacilityByIdQuery(params.id);
  const user = useAppSelector(useCurrentUser);
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
      </div>
    );
  }

  const handleBookNow = () => {
    if (!user) {
      navigate("/login");
    } else {
      navigate(`/facility/booking/${params.id}`);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="bg-white shadow-2xl rounded-lg overflow-hidden">
          <div className="relative">
            <img
              src={data?.data?.photo}
              alt={data?.data?.name}
              className="w-full h-72 sm:h-96 lg:h-[500px] object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
                {data?.data?.name}
              </h2>
            </div>
          </div>
          <div className="p-6 sm:p-8 lg:p-10">
            <p className="text-gray-700 text-lg sm:text-xl lg:text-4xl mb-6">
              {data?.data?.description}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8 mb-8">
              <div>
                <span className="block text-sm font-semibold text-gray-500">
                  <FaMapMarkerAlt className="inline mr-2" />
                  Location
                </span>
                <span className="block text-lg sm:text-xl lg:text-2xl font-medium text-gray-900">
                  {data?.data?.location}
                </span>
              </div>
              <div>
                <span className="block text-sm font-semibold text-gray-500">
                  <FaDollarSign className="inline mr-2" />
                  Price per hour
                </span>
                <span className="block text-lg sm:text-xl lg:text-2xl font-medium text-[#EA580B]">
                  ${data?.data?.pricePerHour}
                </span>
              </div>
            </div>
            <button
              onClick={handleBookNow}
              className="w-full py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-lg sm:text-xl lg:text-2xl font-semibold rounded-lg hover:from-blue-600 hover:to-purple-700 transition-transform transform hover:scale-105"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FacilityDetails;
