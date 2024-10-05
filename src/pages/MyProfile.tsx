/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  EditOutlined,
  FacebookOutlined,
  LinkedinOutlined,
  TwitterOutlined,
  UploadOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Button,
  Descriptions,
  Input,
  Modal,
  Select,
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
const { Option } = Select;

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  role: "admin" | "user" | "super-admin";
  address: string;
  gender: string;
  photo: string;
}

interface FormValues {
  name: string;
  phone: string;
  address: string;
  gender: string;
}

const MyProfile = () => {
  const { data, isLoading } = useProfileQuery("");
  const [updateMyProfile] = useUpdateMyProfileMutation();

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

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
    gender: "Male",
    photo: "https://via.placeholder.com/150",
  };

  const showModal = () => {
    setIsModalVisible(true);
    reset({
      name: userProfile.name,
      phone: userProfile.phone,
      address: userProfile.address,
      gender: userProfile.gender,
    });
    setFileList([]);
    setPreviewImage(userProfile.photo);
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

    setLoading(true);
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
    } finally {
      setLoading(false);
      setIsModalVisible(false);
    }
  };

  const handleFileChange = ({
    fileList,
  }: UploadChangeParam<UploadFile<any>>) => {
    setFileList(fileList);

    if (fileList.length > 0) {
      const file = fileList[0];
      setUploadedFileName(file.name);
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target?.result as string);
      };
      reader.readAsDataURL(file.originFileObj as RcFile);
    } else {
      setUploadedFileName(null);
      setPreviewImage(null);
    }
  };

  const getRoleStyle = (role: string) => {
    switch (role) {
      case "admin":
        return { color: "red", fontWeight: "bold" }; 
      case "super-admin":
        return { color: "orange", fontWeight: "bold" }; 
      case "user":
        return { color: "green", fontWeight: "bold" }; 
      default:
        return {};
    }
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          margin: "auto",
          padding: "24px",
          borderRadius: "8px",
          border: "1px solid #f0f0f0",
          position: "relative",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          backgroundColor: "#fff",
        }}
      >
        <div style={{ flex: 1, marginRight: "20px", textAlign: "center" }}>
          <Avatar
            size={300}
            src={userProfile.photo}
            icon={<UserOutlined />}
            style={{
              borderRadius: "10%",
              marginBottom: "16px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            }}
          />
          <Title level={3}>
            Email: <span className="text-red-500">{userProfile.email}</span>
          </Title>

          <div style={{ marginTop: "24px" }}>
            <Button
              icon={<FacebookOutlined />}
              style={{
                backgroundColor: "#4267B2",
                color: "white",
                margin: "4px",
              }}
            >
              Facebook
            </Button>
            <Button
              icon={<TwitterOutlined />}
              style={{
                backgroundColor: "#1DA1F2",
                color: "white",
                margin: "4px",
              }}
            >
              Twitter
            </Button>
            <Button
              icon={<LinkedinOutlined />}
              style={{
                backgroundColor: "#0077B5",
                color: "white",
                margin: "4px",
              }}
            >
              LinkedIn
            </Button>
          </div>
        </div>

        <div style={{ flex: 2 }}>
          <Descriptions title="User Information" column={1} bordered>
            <Descriptions.Item label="Name">
              <span>{userProfile.name}</span>
              <Button
                icon={<EditOutlined />}
                type="link"
                onClick={showModal}
                style={{ padding: 0, marginLeft: "8px" }}
              />
            </Descriptions.Item>
            <Descriptions.Item label="Phone">
              <span>{userProfile.phone}</span>
              <Button
                icon={<EditOutlined />}
                type="link"
                onClick={showModal}
                style={{ padding: 0, marginLeft: "8px" }}
              />
            </Descriptions.Item>
            <Descriptions.Item label="Role">
              <span style={getRoleStyle(userProfile.role)}>
                {userProfile.role.toUpperCase()}
              </span>
            </Descriptions.Item>
            <Descriptions.Item label="Gender">
              <span>{userProfile.gender}</span>
              <Button
                icon={<EditOutlined />}
                type="link"
                onClick={showModal}
                style={{ padding: 0, marginLeft: "8px" }}
              />
            </Descriptions.Item>
            <Descriptions.Item label="Address">
              <span>{userProfile.address}</span>
              <Button
                icon={<EditOutlined />}
                type="link"
                onClick={showModal}
                style={{ padding: 0, marginLeft: "8px" }}
              />
            </Descriptions.Item>
          </Descriptions>
        </div>

        <Button
          type="primary"
          icon={<EditOutlined />}
          style={{
            position: "absolute",
            top: "16px",
            right: "16px",
            borderRadius: "50%",
            width: "50px",
            height: "50px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onClick={showModal}
        />
      </div>

      <Modal
        title="Edit Profile"
        visible={isModalVisible}
        onOk={handleSubmit(onSubmit)}
        onCancel={handleCancel}
        okText={loading ? "Saving..." : "Save"}
        cancelText="Cancel"
        okButtonProps={{ loading }}
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

          <Controller
            name="gender"
            control={control}
            defaultValue={userProfile.gender}
            render={({ field }) => (
              <div style={{ marginBottom: "16px" }}>
                <label>Gender</label>
                <Select {...field} placeholder="Select your gender">
                  <Option value="Male">Male</Option>
                  <Option value="Female">Female</Option>
                  <Option value="Other">Other</Option>
                </Select>
              </div>
            )}
          />

          <Upload
            accept=".png, .jpg, .jpeg"
            showUploadList={false}
            beforeUpload={() => false}
            onChange={handleFileChange}
          >
            <Button icon={<UploadOutlined />} style={{ marginBottom: "16px" }}>
              Upload Profile Picture
            </Button>
          </Upload>

          {uploadedFileName && <p>Uploaded: {uploadedFileName}</p>}
          {previewImage && (
            <img
              src={previewImage}
              alt="Preview"
              style={{ width: "100%", height: "auto", marginTop: "16px" }}
            />
          )}
        </form>
      </Modal>
    </>
  );
};

export default MyProfile;
