import { type Route } from './+types/healthcheck.ts'

export async function loader({ request }: Route.LoaderArgs) {
	const host =
		request.headers.get('X-Forwarded-Host') ?? request.headers.get('host')

}
