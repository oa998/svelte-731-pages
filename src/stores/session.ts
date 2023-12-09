import { writable } from 'svelte/store';

export const session = writable({
	admin: false,
	auth: false,
	email: ''
});

export const resetSession = () => {
	session.set({
		admin: false,
		auth: false,
		email: ''
	});
};
