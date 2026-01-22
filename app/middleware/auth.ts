// app/middleware/auth.ts
import {redirect} from "react-router";
import type { Route} from "./+types/root";
import {getAccount} from "@/utils/fetch.http.ts";
import {userContext, contextProvider} from "@/middleware/context.ts";





export const authMiddleware: Route.Middleware = async ({
                  context, next }: Route.LoaderFunctionArgs) => {
    const userAccount = await getAccount();

    if (!userAccount) {
        throw redirect("/login");
    }

    contextProvider.set(userContext, userAccount);
    return next();
};

