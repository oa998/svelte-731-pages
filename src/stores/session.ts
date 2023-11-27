import { adminPing, sessionPing } from '$lib/auth';
import { readable } from 'svelte/store';

export const session = readable(
	{
		admin: false,
		loggedIn: false
	},
	(set) => {
		adminPing().then((isAdmin) => {
			set({
				admin: isAdmin,
				loggedIn: isAdmin
			});
			if (!isAdmin) {
				sessionPing().then((isLoggedIn) => {
					set({
						admin: false,
						loggedIn: isLoggedIn
					});
				});
			}
		});
	}
);
