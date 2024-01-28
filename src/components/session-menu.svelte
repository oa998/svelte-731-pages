<script lang="ts">
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import { logout } from '$lib/auth';
	import { session } from '$stores/session';
	import type { MenuAction } from './menu.svelte';
	import Menu from './menu.svelte';

	export let size: string = '1.5rem';

	let alwaysActions = [
		{
			text: 'Downloads',
			class: 'bg-slate-900 text-white border-t border-white',
			action: () => goto(`${base}/downloads`)
		},
		{
			text: 'Courses',
			class: 'bg-slate-900 text-white border-t border-white',
			action: () => goto(`${base}/courses`)
		}
	];
	const defaultActions: MenuAction[] = [
		{
			text: 'Log In',
			class: 'bg-blue-600 text-white rounded-t',
			action: () => goto(`${base}/login`)
		}
	];
	let actions: MenuAction[] = [];
	$: {
		actions = [];
		if ($session.auth) {
			// If logged in, give option to log out, plus other options
			actions = [
				{
					text: 'Log Out 👋',
					class: 'bg-slate-900 text-white',
					action: () => logout()
				}
			].concat(alwaysActions);
		} else {
			// If logged out, give option to log in, plus other options
			actions = defaultActions.concat(alwaysActions);
		}
		if ($session.admin) {
			actions = actions.concat([
				{
					text: 'Admin',
					class: 'bg-red-600 pt-1 font-bold border-t border-slate-300'
				},
				{
					text: 'Edit Courses',
					class: 'bg-red-500',
					action: () => goto(`${base}/course/edit`)
				},
				{
					text: 'Course Access',
					class: 'bg-red-500',
					action: () => goto(`${base}/admin/user-access`)
				}
			]);
		}
	}
</script>

<Menu {size} icon={'ic:round-menu'} {actions} />
