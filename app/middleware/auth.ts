// app/middleware/auth.ts
import {redirect} from "react-router";
import type { Route} from "./+types/root";

import {getAccount} from "@/utils/fetch.http.ts";
import { userContext} from "@/middleware/context.ts";


export const authMiddleware: Route.Middleware = async ({next, context }: Route.LoaderFunctionArgs) => {
    // SSR phase: do not force auth
    if (typeof window === "undefined") {
        return next;
    }

    const userAccount = await getAccount();

    if (!userAccount) {
        // Browser only → send to gateway OAuth
        throw redirect("/oauth2/authorization/oidc");
    }

    context.set(userContext, userAccount);
    return next;
};

