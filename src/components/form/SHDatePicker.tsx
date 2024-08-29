import { DatePicker, Form } from "antd";
import { Controller } from "react-hook-form";

type TDateProps = {
  name: string;
  label?: string;
};

const SHDatePicker = ({ name, label }: TDateProps) => {
  return (
    <>
      <Controller
        name={name}
        render={({ field, fieldState: { error } }) => (
          <Form.Item label={label}>
            <DatePicker
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

export default SHDatePicker;
