import { goto } from '$app/navigation';
import { base } from '$app/paths';
import { resetSession, session } from '$stores/session';
import { jwtDecode } from 'jwt-decode';
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
		.then(throwIfNot2xx)
		.then((r) => r.json())
		.then((j) => {
			if (Object.keys(j).includes('auth') && Object.keys(j).includes('admin')) {
				session.set(j);
			}
		});
}

export function login(email: string, password: string) {
	return (
		fetch(`/data/auth/login`, {
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
					const decoded = jwtDecode(token);
					console.log({ decoded });
				}
			})
			.then(() => toastMsg('Logged in'))
			// .then(() => goto(`${base == '/' ? '' : base}/courses`))
			.catch(toastErrorCatch)
	);
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
