import type {
  UserResponseDataType,
  UserType,
} from "@/types/features/auth/types";
import type {
  LoginFormDataType,
  RegisterFormDataType,
} from "@/types/routes/auth/types";
import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/user/`;

const register = async (userData: RegisterFormDataType): Promise<UserType> => {
  const response = await axios.post<UserResponseDataType>(
    API_URL + "register",
    userData,
  );
  if (response.data) {
    if (response.data.data === undefined) {
      throw new Error("user response undefined");
    }
    localStorage.setItem("user", JSON.stringify(response.data.data));
  }

  return response.data.data;
};

const login = async (userData: LoginFormDataType): Promise<UserType> => {
  const response = await axios.post<UserResponseDataType>(
    API_URL + "login",
    userData,
  );
  if (response.data) {
    if (response.data.data === undefined) {
      throw new Error("user response undefined");
    }
    localStorage.setItem("user", JSON.stringify(response.data.data));
  }
  return response.data.data;
};

const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  login,
  logout,
};

export default authService;
