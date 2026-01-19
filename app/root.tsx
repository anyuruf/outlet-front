import { OpenImgContextProvider } from 'openimg/react'
import {
	data,
	Link,
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	useLoaderData,
	useMatches,
} from 'react-router'
import {
	FacebookIcon,
	InstagramIcon,
	LinkedinIcon,
	TwitterIcon,
} from 'lucide-react'
import { type Route } from './+types/root.ts'
import { GeneralErrorBoundary } from '@/components/error-boundary.tsx'
import { EpicProgress } from './components/progress-bar.tsx'
import { SearchBar } from '@/components/search-bar.tsx'
import { useToast } from '@/components/toaster.tsx'
import { href as iconsHref } from '@/components/ui/icon.tsx'
import { EpicToaster } from '@/components/ui/sonner.tsx'
import { Sidebar, SidebarHeader, SidebarProvider } from '@/components/ui/sidebar'
import { AppHeader } from '@/components/headers/AppHeader'
import OutletLogoSVG from '@/components/headers/OutletLogoSVG'
import { ClientHintCheck, getHints } from '@/utils/client-hints.tsx'
import { getEnv } from '@/utils/env.server.ts'
import { pipeHeaders } from '@/utils/headers.server.ts'
import { combineHeaders, getDomainUrl, getImgSrc } from '@/utils/misc.tsx'
import { type Theme, getTheme } from '@/utils/theme.server.ts'
import { getToast } from '@/utils/toast.server.ts'
import { useOptionalUser } from '@/utils/user.ts'
import { authMiddleware, userContext } from "@/middleware/auth";
import React from "react";


export  const  middleware: Route.MiddlewareFunction[] = [authMiddleware];

export const links: Route.LinksFunction = () => {
	return [
		// Preload svg sprite as a resource to avoid render blocking
		{ rel: 'preload', href: iconsHref, as: 'image' },
		{
			rel: 'icon',
			href: '/favicon.ico',
			sizes: '48x48',
		}
	].filter(Boolean)
}

export const meta: Route.MetaFunction = () => {
	return [
		{ title: 'Outlet iCommerce' },
		{ name: 'Business Dealer ecommerce site', },
	]
}

export async function loader({ request, context }: Route.LoaderArgs) {
	const user = context.get(userContext);
	const { toast, headers: toastHeaders } = await getToast(request)

	return data(
		{
			user,
			requestInfo: {
				hints: getHints(request),
				origin: getDomainUrl(request),
				path: new URL(request.url).pathname,
				userPrefs: {
					theme: getTheme(request),
				},
			},
			ENV: getEnv(),
			toast,
		},
		{
			headers: combineHeaders(
				toastHeaders,
			),
		},
	)
}

export const headers: Route.HeadersFunction = pipeHeaders

function Document({
	children,
	nonce,
	theme = 'light',
	env = {},
}: {
	children: React.ReactNode
	nonce: string
	theme?: Theme
	env?: Record<string, string | undefined>
}) {
	const allowIndexing = ENV.ALLOW_INDEXING !== 'false'
	return (
		<html lang="en" className={`${theme} h-full overflow-x-hidden`}>
			<head>
				<ClientHintCheck nonce={nonce} />
				<Meta />
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width,initial-scale=1" />
				{allowIndexing ? null : (
					<meta name="robots" content="noindex, nofollow" />
				)}
				<Links />
			</head>
			<body className="bg-background text-foreground">
				{children}
				<ScrollRestoration  />
				<Scripts  />
			</body>
		</html>
	)
}

export function Layout({ children }: { children: React.ReactNode }) {
	// if there was an error running the loader, data could be missing
	const data = useLoaderData<typeof loader | null>()

	return (
		<Document  env={data?.ENV}>
			{children}
		</Document>
	)
}

function App() {
	const data = useLoaderData<typeof loader>()
	const user = useOptionalUser()
	const matches = useMatches()
	const isOnSearchPage = matches.find((m) => m.id === 'routes/users/index')
	const searchBar = isOnSearchPage ? null : <SearchBar status="idle" />
	useToast(data.toast)

	return (
		<OpenImgContextProvider
			optimizerEndpoint="/resources/images"
			getSrc={getImgSrc}
		>
			<div className='flex min-h-dvh w-full'>
				<SidebarProvider defaultOpen={false}>
					<Sidebar>
						<SidebarHeader className="p-0 gap-0">
							{/********* Overlay for Logo to have same background as the one in the AppHeader ******/}
							<div className="flex item-center z-53 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b justify-left px-12 py-4">
								<OutletLogoSVG className="h-8"/>
							</div>
						</SidebarHeader>
					</Sidebar>
					<div className='flex flex-1 flex-col'>
						<AppHeader />
						<main className='mx-auto size-full max-w-7xl flex-1 px-2 py-0 sm:px-4'>
							{/* Main content */}
							<section className="grid grid-cols gap-10 row-start-2 col-start-1">
								<Outlet />
							</section>
						</main>
						<footer>
							<div className='text-muted-foreground mx-auto flex size-full max-w-7xl items-center justify-between gap-3 px-4 py-3 max-sm:flex-col sm:gap-6 sm:px-6'>
								<p className='text-sm text-balance max-sm:text-center'>
									{`©${new Date().getFullYear()}`}{' '}
									<a href='#' className='text-primary'>
										Shadcn/studio
									</a>
									, Made for better web design
								</p>
								<div className='flex items-center gap-5'>
									<a href='#'>
										<FacebookIcon className='size-4' />
									</a>
									<a href='#'>
										<InstagramIcon className='size-4' />
									</a>
									<a href='#'>
										<LinkedinIcon className='size-4' />
									</a>
									<a href='#'>
										<TwitterIcon className='size-4' />
									</a>
								</div>
							</div>
						</footer>
					</div>
				</SidebarProvider>
			</div>
			<EpicToaster closeButton position="top-center" theme={theme} />
			<EpicProgress />
		</OpenImgContextProvider>
	)
}

function AppWithProviders() {
	const data = useLoaderData<typeof loader>()
	return (
			<App />
	)
}

export default AppWithProviders

// this is a last resort error boundary. There's not much useful information we
// can offer at this level.
export const ErrorBoundary = GeneralErrorBoundary
