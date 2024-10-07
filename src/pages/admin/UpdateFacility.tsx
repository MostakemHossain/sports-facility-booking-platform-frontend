/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import {
  useGetAllFacilityQuery,
  useGetFacilityByIdQuery,
  useUpdateFacilityMutation,
} from "../../redux/features/admin/facility/facilityApi";
import { setFacilities } from "../../redux/features/admin/facility/facilitySlice";
import { useAppDispatch } from "../../redux/hooks";

interface UpdateFacilityProps {
  id: string | null;
  onClose: () => void;
}

const updateFacilitySchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  location: z.string().optional(),
  pricePerHour: z.string().optional(),
  photo: z.string().optional(),
});

const UpdateFacility: React.FC<UpdateFacilityProps> = ({ id, onClose }) => {
  const { data: facilityData } = useGetAllFacilityQuery({});
  if (!id) return null;
  const dispatch = useAppDispatch();

  const { data } = useGetFacilityByIdQuery(id);
  const [updateFacility] = useUpdateFacilityMutation();
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      description: "",
      location: "",
      pricePerHour: "",
      photo: "",
    },
    resolver: zodResolver(updateFacilitySchema),
  });

  useEffect(() => {
    if (data) {
      setValue("name", data.data?.name || "");
      setValue("description", data.data?.description || "");
      setValue("location", data.data?.location || "");
      setValue("pricePerHour", data.data?.pricePerHour?.toString() || "");
      setValue("photo", data.data?.photo || "");
    }
  }, [data, setValue]);

  const onSubmit = async (formData: any) => {
    try {
      formData.pricePerHour = Number(formData.pricePerHour);
      const res = await updateFacility({ id, data: formData }).unwrap();
      console.log(res);
      if (res.success) {
        toast.success(res.message, {
          className: "custom-toast",
        });
        dispatch(setFacilities(facilityData));
        onClose();
      }
    } catch (error: any) {
      toast.error(error.data.message, {
        className: "custom-toast",
      });
    }
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h2 className="text-3xl font-semibold mb-4">Update Facility</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium">
            Facility Name
          </label>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <input
                id="name"
                type="text"
                placeholder="Enter facility name"
                {...field}
                className="border rounded-md p-2 w-full"
              />
            )}
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium">
            Description
          </label>
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <input
                id="description"
                type="text"
                placeholder="Enter facility description"
                {...field}
                className="border rounded-md p-2 w-full"
              />
            )}
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="pricePerHour" className="block text-sm font-medium">
            Price Per Hour
          </label>
          <Controller
            name="pricePerHour"
            control={control}
            render={({ field }) => (
              <input
                id="pricePerHour"
                type="number"
                placeholder="Enter price per hour"
                {...field}
                className="border rounded-md p-2 w-full"
              />
            )}
          />
          {errors.pricePerHour && (
            <p className="text-red-500 text-sm">
              {errors.pricePerHour.message}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="location" className="block text-sm font-medium">
            Location
          </label>
          <Controller
            name="location"
            control={control}
            render={({ field }) => (
              <input
                id="location"
                type="text"
                placeholder="Enter facility location"
                {...field}
                className="border rounded-md p-2 w-full"
              />
            )}
          />
          {errors.location && (
            <p className="text-red-500 text-sm">{errors.location.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="photo" className="block text-sm font-medium">
            Photo URL
          </label>
          <Controller
            name="photo"
            control={control}
            render={({ field }) => (
              <input
                id="photo"
                type="text"
                placeholder="Enter photo URL"
                {...field}
                className="border rounded-md p-2 w-full"
              />
            )}
          />
          {errors.photo && (
            <p className="text-red-500 text-sm">{errors.photo.message}</p>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateFacility;
