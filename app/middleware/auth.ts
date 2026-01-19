// app/middleware/auth.ts
import { redirect, createContext } from "react-router";
import type { Route } from "./+types/root";

export const userContext = createContext<User | null>();

export const authMiddleware: Route.Middleware = async ({
                   request, context, next }) => {
    const user = await getUserFromSession(request);

    if (!user) {
        throw redirect("/login");
    }

    context.set(userContext, user);
    return next();
};