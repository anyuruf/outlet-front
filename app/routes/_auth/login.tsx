import { Button } from "@/components/ui/button";

export default function LoginPage() {
    const handleLogin = () => {
        // Full redirect is REQUIRED for OAuth2
        window.location.href = "/oauth2/authorization/oidc";
    };

    return (
        <main
            className="min-h-screen flex items-center justify-center bg-background px-4"
            aria-labelledby="login-heading"
        >
            <section
                className="w-full max-w-sm rounded-xl border bg-card p-8 shadow-sm"
                role="region"
                aria-describedby="login-description"
            >
                <header className="mb-6 text-center">
                    <h1
                        id="login-heading"
                        className="text-2xl font-semibold tracking-tight"
                    >
                        Sign in
                    </h1>
                    <p
                        id="login-description"
                        className="mt-2 text-sm text-muted-foreground"
                    >
                        Authenticate securely with our Identity Provider please.
                    </p>
                </header>

                <Button
                    type="button"
                    className="w-full"
                    onClick={handleLogin}
                >
                    Continue To Identity Provider
                </Button>
            </section>
        </main>
    );
}
