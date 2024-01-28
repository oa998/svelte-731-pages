import { goto } from '$app/navigation';
import { base } from '$app/paths';
import { applyToken, resetSession } from '$stores/session';
import { peekFor401, throwIfNot2xx } from './fetch-utils';
import { toastErrorCatch, toastMsg } from './toast';

export function ping() {
	fetch(`/data/auth/wakeup-ping`);
}

export function sessionPing() {
	return fetch(`/data/auth/session-ping`, {
		method: 'GET',
		headers: {
			accept: 'application/json',
			['content-type']: 'application/json'
		},
		credentials: 'include'
	})
		.then(peekFor401)
		.then(throwIfNot2xx);
}

export function login(email: string, password: string) {
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
				const token = await r.text();
				applyToken(token);
			}
		})
		.then(() => goto(`${base == '/' ? '' : base}/courses`))
		.catch(toastErrorCatch);
}

export function logout() {
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
		.then(() => goto(`${base || '/'}`))
		.catch(toastErrorCatch);
}

export function passwordReset(email: string) {
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
		.then(() => toastMsg(`Password reset sent for ${email}`))
		.catch(toastErrorCatch);
}
