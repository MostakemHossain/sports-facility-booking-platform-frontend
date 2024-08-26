import { ReactNode } from "react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";

type TFormConfig<T extends FieldValues> = {
  defaultValues?: T;
};

type TFormProp<T extends FieldValues> = {
  children: ReactNode;
  onSubmit: SubmitHandler<T>;
} & TFormConfig<T>;

const SHForm = <T extends FieldValues>({
  onSubmit,
  children,
  defaultValues,
}: TFormProp<T>) => {
  const formConfig = { defaultValues } as any;
  const methods = useForm<T>(formConfig);
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  );
};

export default SHForm;
