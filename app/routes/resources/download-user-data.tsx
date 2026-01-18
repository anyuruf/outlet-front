import { requireUserId } from '#app/utils/auth.server.ts'
import { prisma } from '#app/utils/db.server.ts'
import { getDomainUrl, getNoteImgSrc, getUserImgSrc } from '#app/utils/misc.tsx'
import { type Route } from './+types/download-user-data.ts'

export async function loader({ request }: Route.LoaderArgs) {
	const userId = await requireUserId(request)

	return null
}
