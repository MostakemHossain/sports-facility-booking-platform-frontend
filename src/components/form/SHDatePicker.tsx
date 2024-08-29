import { DatePicker, Form } from "antd";
import { Controller } from "react-hook-form";

type TDateProps = {
  name: string;
  label?: string;
  onChange?: (date: any) => void; // Add this line
};

const SHDatePicker = ({ name, label, onChange }: TDateProps) => {
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
              style={{ width: "100%" }}
              onChange={(date) => {
                field.onChange(date); // Call react-hook-form's onChange
                if (onChange) onChange(date); // Call the passed onChange prop if it exists
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
