import { EditOutlined, UploadOutlined, UserOutlined } from "@ant-design/icons";
import {
  Avatar,
  Button,
  Card,
  Descriptions,
  Input,
  Modal,
  Skeleton,
  Typography,
  Upload,
} from "antd";
import {
  RcFile,
  UploadChangeParam,
  UploadFile,
} from "antd/es/upload/interface";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  useProfileQuery,
  useUpdateMyProfileMutation,
} from "../redux/features/user/userApi";

const { Title } = Typography;

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  role: "admin" | "user" | "super-admin";
  address: string;
  photo: string;
}

interface FormValues {
  name: string;
  phone: string;
  address: string;
}

const MyProfile = () => {
  const { data, isLoading } = useProfileQuery("");
  const [updateMyProfile] = useUpdateMyProfileMutation();

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);

  const { control, handleSubmit, reset } = useForm<FormValues>();

  if (isLoading) {
    return <Skeleton />;
  }

  const userProfile: UserProfile = data?.data || {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1234567890",
    role: "user",
    address: "123 Main St, Anytown, USA",
    photo: "https://via.placeholder.com/150",
  };

  const showModal = () => {
    setIsModalVisible(true);
    reset({
      name: userProfile.name,
      phone: userProfile.phone,
      address: userProfile.address,
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const formData = new FormData();

    formData.append("data", JSON.stringify(data));

    if (fileList.length > 0) {
      formData.append("file", fileList[0].originFileObj as RcFile);
    }

    try {
      const res = await updateMyProfile(formData).unwrap();
      if (res?.success) {
        toast.success(res?.message, {
          className: "custom-toast",
        });
      }
    } catch (error: any) {
      toast.error(error.data.message, {
        className: "custom-toast",
      });
    }

    setIsModalVisible(false);
  };

  const handleFileChange = ({
    fileList,
  }: UploadChangeParam<UploadFile<any>>) => {
    setFileList(fileList);

    if (fileList.length > 0) {
      setUploadedFileName(fileList[0].name);
    } else {
      setUploadedFileName(null);
    }
  };

  return (
    <>
      <Card
        style={{
          maxWidth: 600,
          margin: "auto",
          padding: "24px",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          position: "relative",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "24px" }}>
          <Avatar
            size={100}
            src={userProfile.photo}
            icon={<UserOutlined />}
            style={{ marginBottom: "16px" }}
          />
          <Title level={2}>{userProfile.name}</Title>
          <Typography.Text type="secondary">
            {userProfile.role.toUpperCase()}
          </Typography.Text>
        </div>

        <Button
          type="primary"
          icon={<EditOutlined />}
          style={{ position: "absolute", top: 20, right: 20 }}
          onClick={showModal}
        >
          Edit
        </Button>

        <Descriptions title="User Information" column={1} bordered>
          <Descriptions.Item label="Name">{userProfile.name}</Descriptions.Item>
          <Descriptions.Item label="Email">
            {userProfile.email}
          </Descriptions.Item>
          <Descriptions.Item label="Phone">
            {userProfile.phone}
          </Descriptions.Item>
          <Descriptions.Item label="Role">{userProfile.role}</Descriptions.Item>
          <Descriptions.Item label="Address">
            {userProfile.address}
          </Descriptions.Item>
        </Descriptions>
      </Card>

      <Modal
        title="Edit Profile"
        visible={isModalVisible}
        onOk={handleSubmit(onSubmit)}
        onCancel={handleCancel}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="name"
            control={control}
            defaultValue={userProfile.name}
            render={({ field }) => (
              <div style={{ marginBottom: "16px" }}>
                <label>Name</label>
                <Input {...field} placeholder="Enter your name" />
              </div>
            )}
          />

          <Controller
            name="phone"
            control={control}
            defaultValue={userProfile.phone}
            render={({ field }) => (
              <div style={{ marginBottom: "16px" }}>
                <label>Phone</label>
                <Input {...field} placeholder="Enter your phone number" />
              </div>
            )}
          />

          <Controller
            name="address"
            control={control}
            defaultValue={userProfile.address}
            render={({ field }) => (
              <div style={{ marginBottom: "16px" }}>
                <label>Address</label>
                <Input {...field} placeholder="Enter your address" />
              </div>
            )}
          />

          <div style={{ marginBottom: "16px" }}>
            <label>Upload Photo</label>
            <Upload
              fileList={fileList}
              beforeUpload={() => false}
              onChange={handleFileChange}
              showUploadList={false}
            >
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
            {uploadedFileName && (
              <div style={{ marginTop: "8px" }}>{uploadedFileName}</div>
            )}
          </div>
        </form>
      </Modal>
    </>
  );
};

export default MyProfile;
