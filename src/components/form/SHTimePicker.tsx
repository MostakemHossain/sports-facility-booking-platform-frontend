import { Form, TimePicker } from "antd";
import { Controller } from "react-hook-form";

type TTimeProps = {
  name: string;
  label?: string;
};

const SHTimePicker = ({ name, label }: TTimeProps) => {
  return (
    <>
      <Controller
        name={name}
        render={({ field, fieldState: { error } }) => (
          <Form.Item label={label}>
            <TimePicker
              {...field}
              id={name}
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
