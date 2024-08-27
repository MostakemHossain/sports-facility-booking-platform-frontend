import { Form } from "antd";
import { ReactNode } from "react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
  Resolver,
  DefaultValues,
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
  return (
    <FormProvider {...methods}>
      <Form layout="vertical" onFinish={methods.handleSubmit(onSubmit)}>
        {children}
      </Form>
    </FormProvider>
  );
};

export default SHForm;
