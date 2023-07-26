import { FormProvider, useForm, useWatch } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box } from "@chakra-ui/react";
import { FormHookProps } from "../../interfaces";

const validationSchema = Yup.object({
  first_name: Yup.string()
    .required("First Name is required")
    .matches(
      /^[A-Za-z ]+$/g,
      "First Name can not include numbers and special characters"
    )
    .max(40, "First Name "),
  last_name: Yup.string()
    .required("Last Name is required")
    .matches(
      /^[A-Za-z ]+$/g,
      "Last Name can not include number and special characters "
    ),
  phone: Yup.string()
    .required("Phone is required")
    .matches(/(0[3|5|7|8|9])+([0-9]{8})\b/g, "Invaild phone number"),
  email: Yup.string()
    .required("Email is required")
    .email("Please input vaild email")
    .max(265, ""),
  provinceCode: Yup.string().required("Province is required"),
  districtCode: Yup.string().required("District is required"),
  wardCode: Yup.string().required("Ward is required"),
  street: Yup.string().required("Address is required"),
  paymentMethod: Yup.string().required("Choose your payment method"),
});

const defaultValues = {
  first_name: "",
  last_name: "",
  phone: "",
  email: "",
  provinceCode: "",
  districtCode: "",
  wardCode: "",
  street: "",
  paymentMethod: "",
};

const FormHook = ({ children, onHandleSubmit }: FormHookProps) => {
  const methods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues,
    mode: "onBlur",
  });

  const values = useWatch({ control: methods.control });

  return (
    <FormProvider {...methods}>
      <Box w={"100%"} as="form" onSubmit={methods.handleSubmit(onHandleSubmit)}>
        {children}
      </Box>
    </FormProvider>
  );
};

export default FormHook;
