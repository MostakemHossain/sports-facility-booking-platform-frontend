import { Skeleton } from "antd";
import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  useGetAvailableTimeSlotsQuery,
  useGetFacilityByIdQuery,
} from "../../redux/features/admin/facility/facilityApi";
import SHDatePicker from "../form/SHDatePicker";
import SHForm from "../form/SHForm";
import SHInput from "../form/SHInput";
import SHTimePicker from "../form/SHTimePicker";
import Footer from "./Footer";
import Navbar from "./Navbar";

const formatDate = (date: any) => {
  if (!date) return "";

  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const BookingPage = () => {
  const { id } = useParams();
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [showSlots, setShowSlots] = useState<boolean>(false);

  const { data: facility, isLoading: facilityLoading } =
    useGetFacilityByIdQuery(id);

  const { data: availableSlots, isLoading: slotsLoading } =
    useGetAvailableTimeSlotsQuery(
      { facility: id, date: formatDate(selectedDate) },
      { skip: !selectedDate }
    );

  const handleDateChange = (date: any) => {
    setSelectedDate(date);
    setShowSlots(false);
  };

  const onSubmit = (data: any) => {
    if (!selectedDate) {
      console.log("No date selected");
      return;
    }
    console.log("Form Submitted:", data);
  };

  const handleCheckAvailability = () => {
    if (!selectedDate) {
      console.log("No date selected");
      return;
    }
    setShowSlots(true);
  };

  if (facilityLoading || slotsLoading) {
    return (
      <p>
        <Skeleton />
      </p>
    );
  }

  const slotItems = Array.isArray(availableSlots?.data)
    ? availableSlots.data.map((slot: any, index: number) => (
        <li key={index} className="mb-2">
          {slot.startTime} - {slot.endTime}
        </li>
      ))
    : [];

  return (
    <div>
      <Navbar />
      <SHForm onSubmit={onSubmit}>
        <div className="container mx-auto max-w-5xl px-4 py-8">
          <div className="text-center mb-8">
            <h2 className="text-5xl font-bold">
              Booking <span className="text-orange-600">Page</span>
            </h2>
          </div>

          <div className="mb-4">
            <SHInput
              type="text"
              name="facilityName"
              label="Facility Name"
              placeholder="Facility Name"
              value={facility?.data?.name || ""}
            />
            <p className="text-sm text-gray-500 mt-1">Facility Details</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-4 mb-8">
            <div>
              <SHDatePicker
                name="bookingDate"
                label="Booking Date"
                onChange={handleDateChange}
              />
            </div>
            <div className="flex items-end">
              <button
                type="button"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
                onClick={handleCheckAvailability}
              >
                Check Availability
              </button>
            </div>
          </div>

          {selectedDate && (
            <div className="mb-4 text-center">
              <p className="text-lg font-medium">
                Selected Date:{" "}
                <span className="font-bold">{formatDate(selectedDate)}</span>
              </p>
            </div>
          )}

          {showSlots && (
            <div className="mb-4">
              <h4 className="text-lg font-semibold ">Available Slots</h4>
              <ul className="grid md:grid-cols-2 grid-cols-1">
                {slotItems.length > 0 ? (
                  slotItems
                ) : (
                  <li>No available slots for the selected date.</li>
                )}
              </ul>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <SHTimePicker name="startTime" label="Start Time" />
            <SHTimePicker name="endTime" label="End Time" />
          </div>

          <div>
            <button
              type="button"
              className="w-full bg-gray-700 text-white py-2 px-4 rounded hover:bg-gray-800 transition"
            >
              Proceed to Pay
            </button>
          </div>
        </div>
      </SHForm>
      <Footer />
    </div>
  );
};

export default BookingPage;
