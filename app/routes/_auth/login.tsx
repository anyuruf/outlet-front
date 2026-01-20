import {OUTLET_PROVIDER_NAME, ProviderConnectionForm} from "@/utils/connections.tsx";
import {useSearchParams} from "react-router";

export default function LoginPage() {
    const [searchParams] = useSearchParams()
    const redirectTo = searchParams.get('redirectTo')


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

                <ProviderConnectionForm
                    type="Login"
                    providerName={OUTLET_PROVIDER_NAME}
                    redirectTo={redirectTo}
                />
            </section>
        </main>
    );
}
