import React from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button, Form, Col, Row } from "react-bootstrap";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../_metronic/_partials/controls";
import {
  FormInput,
  FormTextarea,
  FormSelect,
} from "../../utility/FormComponent"; // Import komponen
import Select from "react-select";
// Schema validasi dengan Yup
const schema = yup.object().shape({
  username: yup.string().required("Username is required"),
  fullname: yup.string().required("Fullname is required"),
  password: yup.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  phone: yup
    .string()
    .matches(/^[0-9]+$/, "Phone must be a number")
    .nullable(),
  roles: yup
    .array()
    .of(yup.string().required("Invalid role"))
    .min(1, "At least one role must be selected"),
  description: yup.string().required("Description is required"),
});

const options = [
  { value: "admin", label: "Admin" },
  { value: "editor", label: "Editor" },
  { value: "viewer", label: "Viewer" },
];

export const UserCreate = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, touchedFields },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
      username: "",
      fullname: "",
      password: "",
      confirmPassword: "",
      email: "",
      phone: "",
      roles: [],
      description: "",
    },
  });

  const onSubmit = (data) => {
    console.log("Form Submitted:", data);
  };

  return (
    <Card>
      <CardHeader title="Create User">
        <CardHeaderToolbar>
          <Button className="btn btn-primary" onClick={handleSubmit(onSubmit)}>
            Save
          </Button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <Form noValidate onSubmit={handleSubmit(onSubmit)}>
          <Row className="gap-2">
            <FormInput
              label="Username"
              name="username"
              type="text"
              touchedFields={touchedFields}
              register={register}
              errors={errors}
              required
            />

            <FormInput
              label="Fullname"
              name="fullname"
              type="text"
              touchedFields={touchedFields}
              register={register}
              errors={errors}
              required
            />
          </Row>
          <Row className="gap-2">
            <FormInput
              label="Password"
              name="password"
              type="password"
              touchedFields={touchedFields}
              register={register}
              errors={errors}
            />
            <FormInput
              label="Re-password"
              name="confirmPassword"
              type="password"
              touchedFields={touchedFields}
              register={register}
              errors={errors}
            />
          </Row>
          <Row className="gap-2">
            <FormInput
              label="Email"
              name="email"
              type="email"
              touchedFields={touchedFields}
              register={register}
              errors={errors}
            />
            <FormInput
              label="No Handphone"
              name="phone"
              type="number"
              touchedFields={touchedFields}
              register={register}
              errors={errors}
            />
          </Row>
          <Row className="gap-2">
            <FormSelect control={control} name="roles" errors={errors} />
            <FormTextarea
              label="Description"
              name="description"
              touchedFields={touchedFields}
              register={register}
              errors={errors}
              required
            />
          </Row>
          <Button type="submit" className="mt-3">
            Submit
          </Button>
        </Form>
      </CardBody>
    </Card>
  );
};
