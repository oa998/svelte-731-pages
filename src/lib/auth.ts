import { env } from '$env/dynamic/public';

export function login(email: string, password: string) {
	return fetch(`${env.PUBLIC_AUTH_URL}/login`, {
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

export function passwordReset(email: string) {
	return fetch(`${env.PUBLIC_AUTH_URL}/email-reset`, {
		method: 'PUT',
		headers: {
			accept: 'application/json',
			['content-type']: 'application/json'
		},
		body: JSON.stringify({
			email
		}),
		credentials: 'include'
	});
}
