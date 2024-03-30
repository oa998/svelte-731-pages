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
			text: 'Lash University',
			class: 'bg-violet-800 rounded-t pt-1 font-bold border-t border-x border-slate-300'
		},
		{
			text: 'University Details',
			class: 'bg-violet-600 border-x border-slate-300',
			action: () => goto(`${base}/university/curriculum`)
		},
		{
			text: 'Applications and Downloads',
			class: 'bg-violet-600 border-x border-slate-300',
			action: () => goto(`${base}/university/downloads`)
		},
		{
			text: 'Online Courses',
			class: 'bg-violet-600 border-x border-slate-300 border-b',
			action: () => goto(`${base}/courses`)
		},
		{
			text: 'Services',
			class: 'bg-slate-900 border border-slate-700',
			action: () => goto(`${base}/services`)
		}
	];
	const defaultActions: MenuAction[] = [
		{
			text: 'Log In',
			class: 'bg-slate-900 text-white rounded-b border border-slate-700',
			action: () => goto(`${base}/login`)
		}
	];
	let actions: MenuAction[] = [];
	$: {
		actions = [];
		if ($session.auth) {
			// If logged in, give option to log out, plus other options
			actions = alwaysActions.concat([
				{
					text: 'Log Out 👋',
					class: 'bg-slate-900 text-white rounded-b border border-slate-700',
					action: () => logout()
				}
			]);
		} else {
			// If logged out, give option to log in, plus other options
			actions = alwaysActions.concat(defaultActions);
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
