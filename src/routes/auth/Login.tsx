import { useAppDispatch, useAppSelector } from "@/app/hooks";
import LoginFormField from "@/components/auth/LoginFormField";
import { Button } from "@/components/ui/button";
import { userLogin, userReset } from "@/features/auth/authSlice";
import { loginSchema } from "@/schema/auth/schema";
import type { LoginFormDataType } from "@/types/routes/auth/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { ZodError } from "zod";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user, isLoading, isError, isSuccess, message } = useAppSelector(
    (state) => state.auth,
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormDataType>({ resolver: zodResolver(loginSchema) });

  const onSubmit: SubmitHandler<LoginFormDataType> = async (data) => {
    try {
      dispatch(userLogin(data));
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

    setTimeout(() => {
      dispatch(userReset());
    }, 10);
  }, []);

  if (isLoading) {
    return <div>... Loading</div>;
  }

  return (
    <>
      {user ? (
        <>
          <div>{user.username} already logged in</div>
          <Link to={"/"}>Home</Link>
        </>
      ) : (
        <>
          <h2>Login</h2>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-2"
          >
            <LoginFormField
              type="email"
              label="email"
              placeholder="email"
              name="email"
              error={errors.email}
              register={register}
              required={true}
            ></LoginFormField>
            <LoginFormField
              type="password"
              label="password"
              placeholder="password"
              name="password"
              error={errors.password}
              register={register}
              required={true}
            ></LoginFormField>
            <Button type="submit">Submit</Button>
          </form>
        </>
      )}
    </>
  );
};
export default LoginPage;
