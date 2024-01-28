import { browser } from '$app/environment';
import { jwtDecode } from 'jwt-decode';
import { writable } from 'svelte/store';

type Session = {
	admin: boolean;
	auth: boolean;
	email: string;
	courses: string[];
};

export const session = writable<Session>({
	admin: false,
	auth: false,
	email: '',
	courses: []
});

export const resetSession = () => {
	console.log('resetting session');
	if (!browser) return;
	sessionStorage.removeItem('token');
	session.set({
		admin: false,
		auth: false,
		email: '',
		courses: []
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
			email: decoded?.email,
			courses: ['crs_2582808431', 'crs_3622197755']
		});
		console.log('applied');
	} else {
		resetSession();
	}
};

export const applyFromSessionStorage = () => {
	if (!browser) return;
	console.log('applying from session storage');
	const token = sessionStorage.getItem('token');
	console.log({ token });
	applyToken(token || '');
	return !!token;
};
