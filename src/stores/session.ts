import { writable } from 'svelte/store';

export const session = writable({
	admin: false,
	auth: false,
	email: ''
});

export const resetSession = () => {
	console.log('reset session');
	session.set({
		admin: false,
		auth: false,
		email: ''
	});
};
