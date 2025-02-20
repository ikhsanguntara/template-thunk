import React from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button, Form, Col } from "react-bootstrap";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../_metronic/_partials/controls";
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
    .matches(/^\d+$/, "Phone must be a number")
    .nullable(),
  roles: yup
    .array()
    .of(yup.string().required("Invalid role"))
    .min(1, "At least one role must be selected"),
});

const options = [
  { value: "admin", label: "Admin" },
  { value: "editor", label: "Editor" },
  { value: "viewer", label: "Viewer" },
];

const FormInput = ({ label, name, type = "text", register, errors, required }) => (
  <Form.Group as={Col} controlId={`form${name}`}>
    <Form.Label className={required ? "required" : ""}>{label}</Form.Label>
    <Form.Control type={type} {...register(name)} />
    <small className="text-danger">{errors[name]?.message}</small>
  </Form.Group>
);

const FormSelect = ({ control, name, errors }) => (
  <Form.Group>
    <Form.Label className="required">Roles</Form.Label>
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Select
          {...field}
          options={options}
          isMulti
          isClearable
          getOptionLabel={(e) => e.label}
          getOptionValue={(e) => e.value}
          value={options.filter((option) => field.value.includes(option.value))} // Pastikan nilai yang dipilih ditampilkan
          onChange={(selected) =>
            field.onChange(selected ? selected.map((item) => item.value) : [])
          }
        />
      )}
    />
    <small className="text-danger">{errors[name]?.message}</small>
  </Form.Group>
);

export const UserCreate = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      roles: [], // Pastikan default-nya array kosong agar tidak error
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
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Row>
            <FormInput
              label="Username"
              name="username"
              register={register}
              errors={errors}
              required
            />
            <FormInput
              label="Fullname"
              name="fullname"
              register={register}
              errors={errors}
              required
            />
          </Form.Row>
          <Form.Row>
            <FormInput
              label="Password"
              name="password"
              type="password"
              register={register}
              errors={errors}
            />
            <FormInput
              label="Re-password"
              name="confirmPassword"
              type="password"
              register={register}
              errors={errors}
            />
          </Form.Row>
          <Form.Row>
            <FormInput
              label="Email"
              name="email"
              type="email"
              register={register}
              errors={errors}
            />
            <FormInput
              label="No Handphone"
              name="phone"
              register={register}
              errors={errors}
            />
          </Form.Row>
          <FormSelect control={control} name="roles" errors={errors} />
          <Button type="submit" className="mt-3">
            Submit
          </Button>
        </Form>
      </CardBody>
    </Card>
  );
};
