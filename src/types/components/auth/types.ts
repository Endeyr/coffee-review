import type {
  LoginFormDataType,
  RegisterFormDataType,
} from "@/types/routes/auth/types";
import type { FieldError, UseFormRegister } from "react-hook-form";

export type ValidLoginFieldNamesType = keyof LoginFormDataType;

export interface LoginFormFieldPropsType {
  type: string;
  placeholder: string;
  name: ValidLoginFieldNamesType;
  register: UseFormRegister<LoginFormDataType>;
  error: FieldError | undefined;
  valueAsNumber?: boolean;
  required?: boolean;
  label: string;
}

export type ValidRegisterFieldNamesType = keyof RegisterFormDataType;

export interface RegisterFormFieldPropsType {
  type: string;
  placeholder: string;
  name: ValidRegisterFieldNamesType;
  register: UseFormRegister<RegisterFormDataType>;
  error: FieldError | undefined;
  valueAsNumber?: boolean;
  required?: boolean;
  label: string;
}
