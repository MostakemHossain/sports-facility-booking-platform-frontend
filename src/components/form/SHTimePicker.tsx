import { Form, TimePicker } from "antd";
import { Controller } from "react-hook-form";

type TTimeProps = {
  name: string;
  label?: string;
  onChange?: (date: any) => void;
};

const SHTimePicker = ({ name, label, onChange }: TTimeProps) => {
  return (
    <>
      <Controller
        name={name}
        render={({ field, fieldState: { error } }) => (
          <Form.Item label={label}>
            <TimePicker
              {...field}
              id={name}
              onChange={(date) => {
                field.onChange(date);
                if (onChange) onChange(date);
              }}
              size="large"
              style={{
                width: "100%",
              }}
            />
            {error && <span className="text-red-500">{error?.message}</span>}
          </Form.Item>
        )}
      />
    </>
  );
};

export default SHTimePicker;
