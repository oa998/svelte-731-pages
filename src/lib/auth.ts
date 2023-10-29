import { PUBLIC_AUTH_URL } from '$env/static/public';

export function login(email: string, password: string) {
	return fetch(PUBLIC_AUTH_URL, {
		method: 'POST',
		headers: {
			accept: 'application/json',
			['content-type']: 'application/json'
		},
		body: JSON.stringify({
			email,
			password
		}),
		credentials: 'include'
	});
}
