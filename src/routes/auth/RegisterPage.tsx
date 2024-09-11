import { useAppDispatch, useAppSelector } from "@/app/hooks";
import RegisterFormField from "@/components/auth/RegisterFormField";
import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import { userRegister, userReset } from "@/features/auth/authSlice";
import { registerSchema } from "@/schema/auth/schema";
import type { RegisterFormDataType } from "@/types/routes/auth/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { ZodError } from "zod";

const RegisterPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user, isLoading, isError, isSuccess, message } = useAppSelector(
    (state) => state.auth,
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormDataType>({ resolver: zodResolver(registerSchema) });
  const onSubmit: SubmitHandler<RegisterFormDataType> = async (data) => {
    try {
      dispatch(userRegister(data));
    } catch (error: unknown) {
      if (error instanceof ZodError) {
        error.issues.map((issue) => {
          console.error(issue.message);
        });
      } else {
        console.error("An unexpected error occurred");
      }
    }
  };

  useEffect(() => {
    if (isError) console.error(message);

    if (isSuccess || user) navigate("/");

    setTimeout(() => dispatch(userReset()), 10);
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  if (isLoading) {
    return <div>... Loading</div>;
  }

  return (
    <Container className="flex-col">
      {user ? (
        <>
          <div>{user.username} already registered</div>
          <Link to={"/"}>Home</Link>
        </>
      ) : (
        <>
          <h2>Register</h2>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-2"
          >
            <RegisterFormField
              type="text"
              label="username"
              placeholder="username"
              name="username"
              error={errors.username}
              register={register}
              required
            ></RegisterFormField>
            <RegisterFormField
              type="email"
              label="email"
              placeholder="email"
              name="email"
              error={errors.email}
              register={register}
              required
            ></RegisterFormField>
            <RegisterFormField
              type="password"
              label="password"
              placeholder="password"
              name="password"
              error={errors.password}
              register={register}
              required
            ></RegisterFormField>
            <RegisterFormField
              type="password"
              label="confirm password"
              placeholder="confirm password"
              name="confirmPassword"
              error={errors.confirmPassword}
              register={register}
              required
            ></RegisterFormField>
            <Button type="submit">Submit</Button>
          </form>
        </>
      )}
    </Container>
  );
};
export default RegisterPage;
