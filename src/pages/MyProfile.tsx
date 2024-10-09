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
  Col,
  Descriptions,
  Input,
  Modal,
  Row,
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

const { Title, Paragraph } = Typography;
const { Option } = Select;

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  role: "admin" | "user" | "super-admin";
  address: string;
  gender: string;
  photo: string;
  bio?: string; // Optional field for additional info
}

interface FormValues {
  name: string;
  phone: string;
  address: string;
  gender: string;
  bio?: string; // Optional field for additional info
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
    return <Skeleton active />;
  }

  const userProfile: UserProfile = data?.data || {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1234567890",
    role: "user",
    address: "123 Main St, Anytown, USA",
    gender: "Male",
    photo: "https://via.placeholder.com/150",
    bio: "This is a short bio about John Doe.",
  };

  const showModal = () => {
    setIsModalVisible(true);
    reset({
      name: userProfile.name,
      phone: userProfile.phone,
      address: userProfile.address,
      gender: userProfile.gender,
      bio: userProfile.bio || "",
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

  return (
    <>
      <div className=" flex flex-col items-center justify-center bg-gray-100 p-8">
        <div className="max-w-7xl w-full bg-white rounded-lg shadow-lg p-6 flex">
          {/* Left Side: Name, Email, Image, and Social Icons */}
          <div className="flex-none w-1/3 p-4 border-r">
            <Avatar
              size={300}
              src={userProfile?.photo}
              icon={<UserOutlined />}
              className="rounded-lg border border-gray-300 shadow-md"
            />
            <Title level={3} className="mt-4">
              {userProfile.name}
            </Title>
            <Title level={5} className="text-gray-600 mb-2">
              Email: <span className="text-red-500">{userProfile.email}</span>
            </Title>
            <div className="flex space-x-2 mt-4">
              <Button
                icon={<FacebookOutlined />}
                style={{
                  backgroundColor: "#4267B2",
                  color: "white",
                }}
              />
              <Button
                icon={<TwitterOutlined />}
                style={{
                  backgroundColor: "#1DA1F2",
                  color: "white",
                }}
              />
              <Button
                icon={<LinkedinOutlined />}
                style={{
                  backgroundColor: "#0077B5",
                  color: "white",
                }}
              />
            </div>
          </div>

          <div className="flex-1 p-4">
            <Descriptions
              title="My Information"
              column={1}
              bordered
              className="mt-6"
            >
              <Descriptions.Item label="Phone">
                {userProfile.phone}
              </Descriptions.Item>
              <Descriptions.Item label="Role">
                <span
                  style={{
                    color:
                      userProfile.role === "admin"
                        ? "red"
                        : userProfile.role === "super-admin"
                          ? "orange"
                          : "green",
                  }}
                >
                  {userProfile?.role.toUpperCase()}
                </span>
              </Descriptions.Item>
              <Descriptions.Item label="Gender">
                {userProfile.gender}
              </Descriptions.Item>
              <Descriptions.Item label="Address">
                {userProfile.address}
              </Descriptions.Item>
              <Descriptions.Item label="Bio">
                <Paragraph>{userProfile.bio}</Paragraph>
              </Descriptions.Item>
            </Descriptions>

            <Button
              type="primary"
              icon={<EditOutlined />}
              className="mt-4"
              onClick={showModal}
            >
              Edit Profile
            </Button>
          </div>
        </div>
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
          <Row gutter={16}>
            <Col span={12}>
              <Controller
                name="name"
                control={control}
                defaultValue={userProfile.name}
                render={({ field }) => (
                  <div className="mb-4">
                    <label className="block">Name</label>
                    <Input {...field} placeholder="Enter your name" />
                  </div>
                )}
              />

              <Controller
                name="phone"
                control={control}
                defaultValue={userProfile.phone}
                render={({ field }) => (
                  <div className="mb-4">
                    <label className="block">Phone</label>
                    <Input {...field} placeholder="Enter your phone number" />
                  </div>
                )}
              />

              <Controller
                name="address"
                control={control}
                defaultValue={userProfile.address}
                render={({ field }) => (
                  <div className="mb-4">
                    <label className="block">Address</label>
                    <Input {...field} placeholder="Enter your address" />
                  </div>
                )}
              />

              <Controller
                name="gender"
                control={control}
                defaultValue={userProfile.gender}
                render={({ field }) => (
                  <div className="mb-4">
                    <label className="block">Gender</label>
                    <Select {...field} placeholder="Select your gender">
                      <Option value="Male">Male</Option>
                      <Option value="Female">Female</Option>
                      <Option value="Other">Other</Option>
                    </Select>
                  </div>
                )}
              />

              <Controller
                name="bio"
                control={control}
                defaultValue={userProfile.bio || ""}
                render={({ field }) => (
                  <div className="mb-4">
                    <label className="block">Bio</label>
                    <Input.TextArea
                      {...field}
                      rows={3}
                      placeholder="Write a short bio"
                    />
                  </div>
                )}
              />
            </Col>

            <Col span={12}>
              <Upload
                accept=".png, .jpg, .jpeg"
                showUploadList={false}
                beforeUpload={() => false}
                onChange={handleFileChange}
              >
                <Button
                  icon={<UploadOutlined />}
                  style={{ marginBottom: "16px" }}
                >
                  Upload Profile Picture
                </Button>
              </Upload>

              {uploadedFileName && <p>Uploaded: {uploadedFileName}</p>}
              {previewImage && (
                <img
                  src={previewImage}
                  alt="Preview"
                  style={{
                    width: "100%",
                    height: "auto",
                    marginTop: "16px",
                    borderRadius: "8px",
                  }}
                />
              )}
            </Col>
          </Row>
        </form>
      </Modal>
    </>
  );
};

export default MyProfile;
