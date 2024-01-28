import { browser } from '$app/environment';
import { jwtDecode } from 'jwt-decode';
import { writable } from 'svelte/store';

export const session = writable({
	admin: false,
	auth: false,
	email: ''
});

export const resetSession = () => {
	if (!browser) return;
	sessionStorage.removeItem('token');
	session.set({
		admin: false,
		auth: false,
		email: ''
	});
};

export const applyToken = (token: string) => {
	if (!browser) return;
	if (token) {
		const decoded = jwtDecode(token) satisfies { claims: string[]; email: string };
		sessionStorage.setItem('token', token);
		session.set({
			admin: decoded?.claims?.includes('admin'),
			auth: true,
			email: decoded?.email
		});
	} else {
		resetSession();
	}
};

export const applyFromSessionStorage = () => {
	if (!browser) return;
	console.log('applying from session storage');
	const token = sessionStorage.getItem('token');
	applyToken(token || '');
	return !!token;
};
