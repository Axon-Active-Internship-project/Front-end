import React from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box } from "@chakra-ui/react";

const validationSchema = Yup.object({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  age: Yup.number()
    .required("Age is required")
    .min(18, "Applicant must be at least 18 years old")
    .typeError("Please enter a number"),
  phoneNumber: Yup.string(),
  confirmationPin: Yup.string(),
  website: Yup.string(),
  willingToRelocate: Yup.boolean().equals(
    [true],
    "Applicant must be able to relocate"
  ),
  favoriteColor: Yup.string(),
  preferredShift: Yup.array().min(2, "Please select at least 2 shifts"),
  additionalNotes: Yup.string().required(),
  previousExperience: Yup.boolean(),
  callbackTime: Yup.string().required("Please select a callback time"),
  excitementScale: Yup.number(),
  password: Yup.string(),
});

const defaultValues = {
  firstName: "",
  lastName: "",
  age: 0,
  phoneNumber: "",
  confirmationPin: "",
  website: "",
  willingToRelocate: true,
  favoriteColor: "",
  preferredShift: ["afternoons"],
  additionalNotes: "",
  previousExperience: false,
  callbackTime: "",
  excitementScale: 5,
  password: "",
};

const FormHook = ({ children }: { children: React.ReactNode }) => {
  const methods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues,
    mode: "onBlur",
  });

  const values = useWatch({ control: methods.control });
  const onSubmit = (data: any) => {
    console.log(data);
  };

  console.log(methods);

  return (
    <FormProvider {...methods}>
      <Box w={"100%"} as="form" onSubmit={methods.handleSubmit(onSubmit)}>
        {children}
      </Box>
    </FormProvider>
  );
};

export default FormHook;
