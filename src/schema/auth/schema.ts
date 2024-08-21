import type {
  LoginFormDataType,
  RegisterFormDataType,
} from "@/types/routes/auth/types";
import { z, ZodType } from "zod";

export const registerSchema: ZodType<RegisterFormDataType> = z
  .object({
    username: z.string().min(1, "Username is required"),
    email: z.string().email("Invalid email format").min(1, "Email is required"),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const loginSchema: ZodType<LoginFormDataType> = z.object({
  email: z.string().email("Invalid email format").min(1, "Email is required"),
  password: z.string().min(1, { message: "Password is required" }),
});
