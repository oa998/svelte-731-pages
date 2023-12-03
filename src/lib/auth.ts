import { env } from '$env/dynamic/public';
import { session } from '$stores/session';
import { peekFor401, throwIfNot2xx } from './fetch-utils';

export function ping() {
	fetch(`${env.PUBLIC_SERVER_URL}/auth/wakeup-ping`);
}

export function sessionPing() {
	return fetch(`${env.PUBLIC_SERVER_URL}/auth/session-ping`, {
		method: 'GET',
		headers: {
			accept: 'application/json',
			['content-type']: 'application/json'
		},
		credentials: 'include'
	})
		.then(peekFor401)
		.then(throwIfNot2xx('Not logged in'))
		.then((r) => r.json())
		.then((j) => {
			if (Object.keys(j).includes('auth') && Object.keys(j).includes('admin')) {
				session.set(j);
			}
		});
}

export function login(email: string, password: string) {
	return fetch(`${env.PUBLIC_SERVER_URL}/auth/login`, {
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

export function logout() {
	return fetch(`${env.PUBLIC_SERVER_URL}/auth/logout`, {
		method: 'POST',
		headers: {
			accept: 'application/json',
			['content-type']: 'application/json'
		},
		credentials: 'include'
	});
}

export function passwordReset(email: string) {
	return fetch(`${env.PUBLIC_SERVER_URL}/auth/email-reset`, {
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
