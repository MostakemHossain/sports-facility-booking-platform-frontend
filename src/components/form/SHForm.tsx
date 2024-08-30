import { Form } from "antd";
import { ReactNode } from "react";
import {
  DefaultValues,
  FieldValues,
  FormProvider,
  Resolver,
  SubmitHandler,
  useForm,
} from "react-hook-form";

type TFormConfig<T extends FieldValues> = {
  defaultValues?: DefaultValues<T>;
  resolver?: Resolver<T>;
};

type TFormProp<T extends FieldValues> = {
  children: ReactNode;
  onSubmit: SubmitHandler<T>;
} & TFormConfig<T>;

const SHForm = <T extends FieldValues>({
  onSubmit,
  children,
  defaultValues,
  resolver,
}: TFormProp<T>) => {
  const formConfig = { defaultValues, resolver };
  const methods = useForm<T>(formConfig);

  const submit: SubmitHandler<T> = (data) => {
    onSubmit(data);
  };

  return (
    <FormProvider {...methods}>
      <Form layout="vertical" onFinish={methods.handleSubmit(submit)}>
        {children}
      </Form>
    </FormProvider>
  );
};

export default SHForm;
