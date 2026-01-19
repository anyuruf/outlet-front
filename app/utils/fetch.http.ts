import { SERVER_BACKEND_URL } from "./constants";
import {UserAccount} from "../../types/user.account.ts";

export class HttpError extends Error {
    constructor(
        public status: number,
        message: string
    ) {
        super(message);
    }
}

export async function apiFetch<T>(
    path: string,
    init?: RequestInit
): Promise<T> {
    const response = await fetch(`${SERVER_BACKEND_URL}${path}`, {
        credentials: "include", // IMPORTANT for Spring Security / Keycloak
        headers: {
            "Content-Type": "application/json",
            ...init?.headers,
        },
        ...init,
    });

    if (!response.ok) {
        const text = await response.text();
        throw new HttpError(response.status, text || response.statusText);
    }

    return await response.json() as Promise<T>;
}

export function getAccount(): Promise<UserAccount> {
    return apiFetch<UserAccount>("/api/account");
}
