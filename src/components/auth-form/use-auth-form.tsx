import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export type FormData = {
  email: string;
  password: string;
};

export const useAuthForm = () => {
  const defaultValues = {
    email: "",
    password: "",
  };

  const schema = yup.object().shape({
    email: yup
      .string()
      .trim()
      .email("Email must be a valid email address")
      .required("Email is required"),
    password: yup
      .string()
      .trim()
      .required("Password is required"),
  });

  const {
    control,
    formState: { isSubmitting, errors },
    handleSubmit,
    register,
  } = useForm<FormData>({
    defaultValues,
    resolver: yupResolver(schema),
  });

  return {
    control,
    errors,
    handleSubmit,
    isSubmitting,
    register,
  };
};
