import { Input } from "antd";
import { Controller } from "react-hook-form";

type TInputProps = {
  name: string;
  label?: string;
  placeholder?: string;
  type: string;
};

const SHInput = ({ type, name, label, placeholder }: TInputProps) => {
  return (
    <>
      {label && <label htmlFor={name}>{label}</label>}
      <Controller
        name={name}
        render={({ field }) => (
          <Input
            className="p-3"
            {...field}
            type={type}
            id={name}
            placeholder={placeholder}
          />
        )}
      />
    </>
  );
};

export default SHInput;
