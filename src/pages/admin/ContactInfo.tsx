import { Button, Modal, Skeleton, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useState } from "react";
import { toast } from "sonner";
import {
  useDeleteContactMutation,
  useGetAllContactQuery,
} from "../../redux/features/contact/contact.api";

interface Contact {
  _id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
}

const ContactInfo = () => {
  const { data, isLoading } = useGetAllContactQuery("");
  const [deleteContact] = useDeleteContactMutation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  const handleDelete = (contact: Contact) => {
    setSelectedContact(contact);
    setIsModalVisible(true);
  };

  const confirmDelete = async () => {
    if (selectedContact) {
      try {
        const res = await deleteContact(selectedContact._id).unwrap();

        if (res?.success) {
          toast.success(res?.message, {
            className: "custom-toast",
          });
        }

        setIsModalVisible(false);
      } catch (error: any) {
        toast.error(error.data.message, {
          className: "custom-toast",
        });
      }
    }
  };
  if (isLoading) {
    return (
      <div>
        <Skeleton />
      </div>
    );
  }

  const columns: ColumnsType<Contact> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Message",
      dataIndex: "message",
      key: "message",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button type="primary" danger onClick={() => handleDelete(record)}>
          Delete
        </Button>
      ),
    },
  ];

  return (
    <>
      <Table
        dataSource={data?.data || []}
        columns={columns}
        rowKey="_id"
        pagination={{ pageSize: 5 }}
      />
      <Modal
        title="Confirm Deletion"
        visible={isModalVisible}
        centered
        onOk={confirmDelete}
        onCancel={() => setIsModalVisible(false)}
      >
        <p>
          Are you sure you want to delete the contact{" "}
          <strong>{selectedContact?.name}</strong>?
        </p>
      </Modal>
    </>
  );
};

export default ContactInfo;
