import * as cookie from 'cookie'


export function useTheme(request: Request) {
	const cookieName = 'en_theme'

	function theme(request: Request):Theme {
		const cookieHeader = request.headers.get('cookie')
		const parsed = cookieHeader ? cookie.parse(cookieHeader)[cookieName] : 'light'
		if (parsed === 'light' || parsed === 'dark') return parsed
		return 'light'
	}

	function setTheme(theme: Theme | 'system'): String {
		if (theme === 'system') {
			return cookie.serialize(cookieName, '', {path: '/', maxAge: -1})
		} else {
			return cookie.serialize(cookieName, theme, {path: '/', maxAge: 31536000})
		}
	}

	return {theme, setTheme}

}

export type Theme = 'light' | 'dark' | 'system'
