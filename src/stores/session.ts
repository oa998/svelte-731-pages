import { writable } from 'svelte/store';

export const session = writable({
	admin: false,
	auth: false
});
