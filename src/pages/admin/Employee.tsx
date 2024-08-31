import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, Space, Typography, Upload } from "antd";
import "antd/dist/reset.css"; // Import Ant Design styles
import type { RcFile, UploadFile } from "antd/es/upload/interface";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useCreateEmployeeMutation } from "../../redux/features/admin/Employee/employee.api";

const { Title } = Typography;

const EmployeeForm = () => {
  const { control, handleSubmit } = useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [createEmployee] = useCreateEmployeeMutation();

  const onSubmit = async (data: any) => {
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));

    if (fileList.length > 0) {
      formData.append("file", fileList[0] as RcFile);
    }

    try {
      const res = await createEmployee(formData).unwrap();
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
  };

  const handleFileChange = (info: { file: UploadFile }) => {
    setFileList([info.file]);
    setUploadedFileName(info.file.name);
  };

  return (
    <div style={{ maxWidth: "600px", margin: "auto", padding: "20px" }}>
      <Title level={3}>Employee Form</Title>
      <Form onFinish={handleSubmit(onSubmit)} layout="vertical">
        <Form.Item label="Name" name="name">
          <Controller
            name="name"
            control={control}
            defaultValue=""
            render={({ field }) => <Input {...field} placeholder="John Doe" />}
          />
        </Form.Item>

        <Form.Item label="Designation" name="designation">
          <Controller
            name="designation"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Input {...field} placeholder="Software Engineer" />
            )}
          />
        </Form.Item>

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

        <Form.Item label="Phone" name="phone">
          <Controller
            name="phone"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Input {...field} placeholder="+1234567890" />
            )}
          />
        </Form.Item>

        <Form.Item label="Facebook URL" name="facebookURL">
          <Controller
            name="facebookURL"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Input
                {...field}
                placeholder="https://www.facebook.com/johndoe"
              />
            )}
          />
        </Form.Item>

        <Form.Item label="LinkedIn URL" name="linkedinURL">
          <Controller
            name="linkedinURL"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Input
                {...field}
                placeholder="https://www.linkedin.com/in/johndoe"
              />
            )}
          />
        </Form.Item>

        <Form.Item label="Instagram URL" name="instrURL">
          <Controller
            name="instrURL"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Input
                {...field}
                placeholder="https://www.instagram.com/johndoe"
              />
            )}
          />
        </Form.Item>

        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EmployeeForm;
