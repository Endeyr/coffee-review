import type { Dispatch } from "react";

export interface IContext {
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<React.SetStateAction<boolean>>;
}
