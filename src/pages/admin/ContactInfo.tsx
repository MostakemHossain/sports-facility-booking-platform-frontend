import { Button, Modal, Table, message } from "antd";
import { useState } from "react";
import { useGetAllContactQuery } from "../../redux/features/contact/contact.api";

const ContactInfo = () => {
  const { data } = useGetAllContactQuery("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);

//   // Function to handle the delete button click
//   const handleDelete = (contact) => {
//     setSelectedContact(contact);
//     setIsModalVisible(true);
//   };

//   // Function to confirm deletion
//   const confirmDelete = () => {
//     message.success(`Contact ${selectedContact?.name} deleted successfully`);
//     setIsModalVisible(false);
//     // TODO: Implement the actual deletion logic (e.g., API call)
//   };

  // Table columns definition
  const columns = [
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
    //   render: (text, record) => (
    //     // <Button type="primary" danger onClick={() => handleDelete(record)}>
    //     //   Delete
    //     // </Button>
    //   ),
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
        // onOk={confirmDelete}
        onCancel={() => setIsModalVisible(false)}
      >
        <p>
          Are you sure you want to delete the contact{" "}
          {/* <strong>{selectedContact?.name}</strong>? */}
        </p>
      </Modal>
    </>
  );
};

export default ContactInfo;
