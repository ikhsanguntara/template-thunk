import React from "react";
import { Form, Col } from "react-bootstrap";
import Select from "react-select";
import { Controller } from "react-hook-form";

// FormInput Component
export const FormInput = ({
  label,
  name,
  type,
  register,
  errors,
  touchedFields,
  required,
}) => (
  <Form.Group as={Col} controlId={`form${name}` } className="mb-2">
    <Form.Label className={required ? "required" : ""}>{label}</Form.Label>
    <Form.Control
      type={type}
      {...register(name)}
      isInvalid={!!errors[name]}
      isValid={!errors[name] && touchedFields[name]} // Hanya valid setelah disentuh
    />
    <Form.Control.Feedback type="invalid">
      {errors[name]?.message}
    </Form.Control.Feedback>
    <Form.Control.Feedback type="valid"></Form.Control.Feedback>
  </Form.Group>
);

// FormTextarea Component
export const FormTextarea = ({
  label,
  name,
  register,
  errors,
  touchedFields,
  required,
}) => (
  <Form.Group as={Col} controlId={`form${name}`} className="mb-2">
    <Form.Label className={required ? "required" : ""}>{label}</Form.Label>
    <Form.Control
      as="textarea"
      rows={3}
      {...register(name)}
      isInvalid={!!errors[name]}
      isValid={!errors[name] && touchedFields[name]} // Hanya valid setelah disentuh
    />
    <Form.Control.Feedback type="invalid">
      {errors[name]?.message}
    </Form.Control.Feedback>
    <Form.Control.Feedback type="valid"></Form.Control.Feedback>
  </Form.Group>
);

// FormSelect Component
export const FormSelect = ({ control, name, errors, options }) => (
  <Form.Group as={Col}>
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
          value={
            options?.filter((option) => field.value?.includes(option.value)) ||
            []
          }
          onChange={(selected) =>
            field.onChange(selected ? selected.map((item) => item.value) : [])
          }
        />
      )}
    />
    {errors[name] && (
      <small className="text-danger">{errors[name]?.message}</small>
    )}
  </Form.Group>
);
