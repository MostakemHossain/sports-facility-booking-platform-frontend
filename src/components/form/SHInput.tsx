import { Form, Input } from "antd";
import { Controller } from "react-hook-form";

type TInputProps = {
  name: string;
  label?: string;
  placeholder?: string;
  type: string;
  value?: string;
};

const SHInput = ({ type, name, label, placeholder, value }: TInputProps) => {
  return (
    <>
      <Controller
        name={name}
        render={({ field, fieldState: { error } }) => (
          <Form.Item label={label}>
            <Input
              {...field}
              type={type}
              id={name}
              placeholder={placeholder}
              value={value}
              size="large"
            />
            {error && <span className="text-red-500">{error?.message}</span>}
          </Form.Item>
        )}
      />
    </>
  );
};

export default SHInput;
