import {
  createContext,
      RouterContextProvider,
    } from "react-router";
import type {UserAccount} from "../../types/user.account.ts";


export  const userContext = createContext<UserAccount | null>(null);
export const contextProvider = new RouterContextProvider();







