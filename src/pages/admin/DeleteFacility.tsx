/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal } from "antd";
import React from "react";
import { toast } from "sonner";
import { useDeleteFacilityMutation } from "../../redux/features/admin/facility/facilityApi";

interface DeleteFacilityProps {
  visible: boolean;
  onClose: () => void;
  facilityName: string;
  id: string;
}

const DeleteFacility: React.FC<DeleteFacilityProps> = ({
  visible,
  onClose,
  facilityName,
  id,
}) => {
  const [deleteFacility] = useDeleteFacilityMutation();

  const handleDelete = async () => {
    try {
      const res = await deleteFacility(id).unwrap();
      if (res?.success) {
        toast.success(res?.message, {
          className: "custom-toast",
        });
        onClose();
      }
    } catch (error: any) {
      toast.error(error.data.message, {
        className: "custom-toast",
      });
    }
  };

  return (
    <Modal
      title="Confirm Delete"
      visible={visible}
      onCancel={onClose}
      onOk={handleDelete}
      okText="Yes"
      centered
      cancelText="No"
      cancelButtonProps={{ danger: true }}
    >
      <p>
        Are you sure you want to delete{" "}
        <span className="font-bold">{facilityName}</span>?
      </p>
    </Modal>
  );
};

export default DeleteFacility;
