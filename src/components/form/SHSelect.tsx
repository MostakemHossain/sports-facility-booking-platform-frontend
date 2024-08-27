import { Form, Select } from "antd";
import { Controller } from "react-hook-form";

type TSelectProps = {
  name: string;
  label: string;
  options: {
    value: string;
    label: string;
    disabled?: boolean;
  }[];
};

const SHSelect = ({ label, name, options }: TSelectProps) => {
  return (
    <Controller
      name={name}
      render={({ field,fieldState:{error} }) => (
        <Form.Item label={label}>
          <Select
            style={{ width: 120 }}
            {...field}
            options={options}
            size="large"
          />
              {error && <span className="text-red-500">{error?.message}</span>}
        </Form.Item>
      )}
    />
  );
};

export default SHSelect;
