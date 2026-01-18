import { requireUserId } from '#app/utils/auth.server.ts'
import { prisma } from '#app/utils/db.server.ts'
import { getDomainUrl, getNoteImgSrc, getUserImgSrc } from '#app/utils/misc.tsx'
import { type Route } from './+types/download-user-data.ts'

export async function loader({ request }: Route.LoaderArgs) {
	const userId = await requireUserId(request)

	const domain = getDomainUrl(request)

	return Response.json({
		user: {
			...user,
			image: user.image
				? {
						...user.image,
						url: domain + getUserImgSrc(user.image.objectKey),
					}
				: null,
			notes: user.notes.map((note) => ({
				...note,
				images: note.images.map((image) => ({
					...image,
					url: domain + getNoteImgSrc(image.objectKey),
				})),
			})),
		},
	})
}
