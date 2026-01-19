import { useRouteLoaderData } from 'react-router'
import { type loader as rootLoader } from '#app/root.tsx'
import { type UserAccount} from "../../types/user.account.ts";

function isUser(
	userAccount: UserAccount,
): userAccount is Awaited<ReturnType<typeof rootLoader>>['data']['userAccount'] {
	return userAccount && typeof userAccount === 'object' && typeof userAccount.userId === 'string'
}

export function useOptionalUser() {
	const data = useRouteLoaderData<typeof rootLoader>('root')
	if (!data || !isUser(data.userAccount)) {
		return undefined
	}
	return data.userAccount
}

export function useUser() {
	const maybeUser = useOptionalUser()
	if (!maybeUser) {
		throw new Error(
			'No user found in root loader, but user is required by useUser. If user is optional, try useOptionalUser instead.',
		)
	}
	return maybeUser
}

export function userHasPermission(
	userAccount: UserAccount | undefined |null,
	permission: string
) {
	if (!userAccount) return false
	return userAccount.authorities.includes(permission)
}

export function userHasRole(
	userAccount: UserAccount| undefined |null,
	role: string,
) {
	if (!userAccount) return false
	return userAccount.authorities.includes(role)
}
