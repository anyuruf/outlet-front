import { createThemeSessionResolver } from "remix-themes"
import { createCookieSessionStorage } from "react-router";

// You can default to 'development' if process.env.NODE_ENV is not set
const isProduction = process.env.NODE_ENV === "production"

const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "theme",
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    // Todo enable env variable
    secrets: [String(process.env.THEME_SESSION_SECRET)],
    // Set domain and secure only if in production
    ...(isProduction
      ? { domain: "https://outlet.com", secure: true }
      : {}),
  },
})

export const themeSessionResolver = createThemeSessionResolver(sessionStorage)