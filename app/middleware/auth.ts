// app/middleware/auth.ts
import { redirect, createContext } from "react-router";
import type { Route} from "./+types/root";
import type {UserAccount} from "../../types/user.account.ts";
import {getAccount} from "@/utils/fetch.http.ts";


export const userContext = createContext<UserAccount | null>();

export const authMiddleware: Route.Middleware = async ({
                  context, next }: Route.LoaderFunctionArgs) => {
    const userAccount = await getAccount();

    if (!userAccount) {
        throw redirect("/login");
    }

    context.set(userContext, userAccount);
    return next();
};

