import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "antd";
import { FieldValues } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";
import SHForm from "../../components/form/SHForm";
import SHInput from "../../components/form/SHInput";
import { useCreateFacilityMutation } from "../../redux/features/admin/facility/facilityApi";

const facilitySchema = z.object({
  name: z.string({
    required_error: "Facility Name is required",
  }),
  description: z.string({
    required_error: "Description is required",
  }),
  location: z.string({
    required_error: "Location is required",
  }),
  pricePerHour: z.string({
    required_error: "Price per hour is required",
  }),
  photo: z.string({
    required_error: "Photo url is required",
  }),
});

const CreateFacility = () => {
  const [createFacility] = useCreateFacilityMutation();
  const navigate = useNavigate();

  const onSubmit = async (data: FieldValues) => {
    try {
      data.pricePerHour = Number(data.pricePerHour);
      const res = await createFacility(data).unwrap();
      if (res?.success) {
        toast.success(res?.message, {
          className: "custom-toast",
        });
        navigate("/admin/facilities");
      }
    } catch (error: any) {
      toast.error(error.data.message, {
        className: "custom-toast",
      });
    }
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h2 className="text-3xl font-semibold mb-4">Create New Facility</h2>
      <SHForm onSubmit={onSubmit} resolver={zodResolver(facilitySchema)}>
        <SHInput
          type="text"
          name="name"
          label="Facility Name"
          placeholder="Enter facility name"
        />
        <SHInput
          type="text"
          name="description"
          label="Description"
          placeholder="Enter facility description"
        />
        <SHInput
          type="number"
          name="pricePerHour"
          label="Price Per Hour"
          placeholder="Enter price per hour"
        />
        <SHInput
          type="text"
          name="location"
          label="Location"
          placeholder="Enter facility location"
        />
        <SHInput
          type="text"
          name="photo"
          label="Photo URL"
          placeholder="Enter photo URL"
        />
        <Form.Item>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
          >
            Create Facility
          </button>
        </Form.Item>
      </SHForm>
    </div>
  );
};

export default CreateFacility;
