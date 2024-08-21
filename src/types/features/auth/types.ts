export interface AuthStateType {
  user: UserType | null;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
}

export interface UserResponseDataType {
  data: UserType;
}

export interface UserType {
  userId: string;
  username: string;
  email: string;
  createdAt?: Date;
  token: string;
}
