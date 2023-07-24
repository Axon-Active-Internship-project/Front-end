import { FormProvider, useForm, useWatch } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box } from "@chakra-ui/react";
import { FormHookProps } from "../../interfaces";

const validationSchema = Yup.object({
  first_name: Yup.string().required("First Name is required"),
  last_name: Yup.string().required("Last Name is required"),
  phone: Yup.string().matches(
    /(0[3|5|7|8|9])+([0-9]{8})\b/g,
    "Input phone Vietnam"
  ),
  email: Yup.string()
    .required("Emial is required")
    .email("Please input vaild email"),
  countryCode: Yup.string().required("Country is required"),
  stateCode: Yup.string().required("City is required"),
  city: Yup.string().required("Town is required"),
  street: Yup.string().required("Address is required"),
  paymentMethod: Yup.string().required("Choose your payment method"),
});

const defaultValues = {
  first_name: "",
  last_name: "",
  phone: "",
  email: "",
  countryCode: "",
  stateCode: "",
  city: "",
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
