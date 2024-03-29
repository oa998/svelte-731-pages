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
	session.set({
		admin: false,
		auth: false,
		email: ''
	});
};

export const applyToken = (token: string) => {
	if (token) {
		const decoded = jwtDecode(token) satisfies { claims: string[]; email: string };
		session.set({
			admin: decoded?.claims?.includes('admin'),
			auth: !!decoded?.email,
			email: decoded?.email
		});
	} else {
		resetSession();
	}
};
