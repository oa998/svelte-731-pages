import { browser } from '$app/environment';
import { jwtDecode } from 'jwt-decode';
import { writable } from 'svelte/store';

type Session = {
	admin: boolean;
	auth: boolean;
	email: string;
};

export const session = writable<Session>({
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
			auth: !!decoded?.email,
			email: decoded?.email
		});
		console.log('applied');
	} else {
		resetSession();
	}
};

export const applyFromSessionStorage = () => {
	if (!browser) return;
	const token = sessionStorage.getItem('token');
	applyToken(token || '');
	return !!token;
};
