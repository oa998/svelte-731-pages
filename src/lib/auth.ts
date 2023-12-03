import { goto } from '$app/navigation';
import { base } from '$app/paths';
import { env } from '$env/dynamic/public';
import { session } from '$stores/session';
import { peekFor401, throwIfNot2xx } from './fetch-utils';
import { toastErrorMsg, toastMsg } from './toast';

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
	}).then(async (r) => {
		if (r.status == 200) {
			const j = await r.json();
			if (Object.keys(j).includes('auth') && Object.keys(j).includes('admin')) {
				session.set(j);
			}
		}
		return r;
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
	})
		.then(throwIfNot2xx('Logout failed'))
		.then(async (r) => {
			if (r.status == 200) {
				session.set({ admin: false, auth: false });
			}
			return r;
		})
		.then(() => toastMsg('Logged out'))
		.then(() => goto(`${base}`))
		.catch(() => toastErrorMsg('Failed to logout'));
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
