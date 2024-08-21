import { createAppSlice } from "@/app/createAppSlice";
import type { AuthStateType, UserType } from "@/types/features/auth/types";
import type {
  LoginFormDataType,
  RegisterFormDataType,
} from "@/types/routes/auth/types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import authService from "./authService";

const user = localStorage.getItem("user");
const parsedUser = user ? JSON.parse(user) : null;

const initialState: AuthStateType = {
  user: parsedUser,
  isError: false,
  isSuccess: false,
  isLoading: true,
  message: "",
};

export const userRegister = createAsyncThunk<
  UserType,
  RegisterFormDataType,
  { rejectValue: string }
>("", async (user, thunkAPI) => {
  try {
    const registeredUser = await authService.register(user);
    return registeredUser;
  } catch (error: unknown) {
    let message: string;
    if (axios.isAxiosError(error)) {
      message =
        (error.response?.data.error.message as string) ||
        error.message ||
        "An error occurred";
    } else {
      message = (error as Error).message || "An error occurred";
    }
    return thunkAPI.rejectWithValue(message);
  }
});

export const userLogin = createAsyncThunk<
  UserType,
  LoginFormDataType,
  { rejectValue: string }
>("auth/login", async (user, thunkAPI) => {
  try {
    return await authService.login(user);
  } catch (error: unknown) {
    let message: string;
    if (axios.isAxiosError(error)) {
      message =
        (error.response?.data.error.message as string) ||
        error.message ||
        "An error occurred";
    } else {
      message = (error as Error).message || "An error occurred";
    }
    return thunkAPI.rejectWithValue(message);
  }
});

export const userLogout = createAsyncThunk("auth/logout", () => {
  return authService.logout();
});

export const authSlice = createAppSlice({
  name: "auth",
  initialState,
  reducers: {
    userReset: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userRegister.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(userRegister.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        state.message = "User successfully registered";
      })
      .addCase(userRegister.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.message = "Incorrect email or password";
        state.user = null;
      })
      .addCase(userLogin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        state.message = "User successfully logged in";
      })
      .addCase(userLogin.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.message = "Incorrect email or password";
        state.user = null;
      })
      .addCase(userLogout.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export const { userReset } = authSlice.actions;
export default authSlice.reducer;
