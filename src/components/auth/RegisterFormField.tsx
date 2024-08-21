import type { RegisterFormFieldPropsType } from "@/types/components/auth/types";

const RegisterFormField: React.FC<RegisterFormFieldPropsType> = ({
  type,
  placeholder,
  name,
  register,
  error,
  valueAsNumber,
  label,
  required,
}) => (
  <>
    <label htmlFor={name}>{label}</label>
    <input
      id={name}
      type={type}
      placeholder={placeholder}
      {...register(name, { valueAsNumber, required })}
    />
    {error && (
      <p style={{ color: "red" }}>
        {error.message ? error.message : "This is a required field"}
      </p>
    )}
  </>
);
export default RegisterFormField;
