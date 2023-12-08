import { goto } from '$app/navigation';
import { base } from '$app/paths';
import { resetSession, session } from '$stores/session';
import { peekFor401, throwIfNot2xx } from './fetch-utils';
import { toastErrorCatch, toastMsg } from './toast';

export function ping() {
	// fetch(`${env.PUBLIC_SERVER_URL}/auth/wakeup-ping`);
	fetch(`/data/auth/wakeup-ping`);
}

export function sessionPing() {
	// return fetch(`${env.PUBLIC_SERVER_URL}/auth/session-ping`, {
	return fetch(`/data/auth/session-ping`, {
		method: 'GET',
		headers: {
			accept: 'application/json',
			['content-type']: 'application/json'
		},
		credentials: 'include'
	})
		.then(peekFor401)
		.then(throwIfNot2xx)
		.then((r) => r.json())
		.then((j) => {
			alert('we are setting session');
			if (Object.keys(j).includes('auth') && Object.keys(j).includes('admin')) {
				session.set(j);
			}
		});
}

export function login(email: string, password: string) {
	// return fetch(`${env.PUBLIC_SERVER_URL}/auth/login`, {
	return fetch(`/data/auth/login`, {
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
	})
		.then(throwIfNot2xx)
		.then(async (r) => {
			if (/^2..$/.test(`${r.status}`)) {
				const j = await r.json();
				if (Object.keys(j).includes('auth') && Object.keys(j).includes('admin')) {
					session.set(j);
				}
			}
			return r;
		})
		.then(() => toastMsg('Logged in'))
		.then(() => goto(`${base == '/' ? '' : base}/courses`))
		.catch(toastErrorCatch);
}

export function logout() {
	// return fetch(`${env.PUBLIC_SERVER_URL}/auth/logout`, {
	return fetch(`/data/auth/logout`, {
		method: 'POST',
		headers: {
			accept: 'application/json',
			['content-type']: 'application/json'
		},
		credentials: 'include'
	})
		.then(throwIfNot2xx)
		.then(async (r) => {
			if (/^2..$/.test(`${r.status}`)) {
				resetSession();
			}
			return r;
		})
		.then(() => toastMsg('Logged out'))
		.then(() => goto(`${base == '/' ? '' : base}`));
}

export function passwordReset(email: string) {
	// return fetch(`${env.PUBLIC_SERVER_URL}/auth/email-reset`, {
	return fetch(`/data/auth/email-reset`, {
		method: 'PUT',
		headers: {
			accept: 'application/json',
			['content-type']: 'application/json'
		},
		body: JSON.stringify({
			email
		}),
		credentials: 'include'
	})
		.then(throwIfNot2xx)
		.then(() => toastMsg(`Password reset sent for ${email}`));
}
