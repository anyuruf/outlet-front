import {
  createContext,
      RouterContextProvider,
    } from "react-router";
import type {UserAccount} from "../../types/user.account.ts";

const dbContext = createContext<UserAccount | null>();

function getLoadContext(req, res) {
      const context = new RouterContextProvider();
      context.set(dbContext, createDb());
      return context;
}
