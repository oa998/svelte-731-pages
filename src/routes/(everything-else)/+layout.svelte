<script lang="ts">
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import { page } from '$app/stores';
	import Header from '$components/header.svelte';
	import Menu, { type MenuAction } from '$components/menu.svelte';
	import { logout, sessionPing } from '$lib/auth';
	import { session } from '$stores/session';
	import { SvelteToast } from '@zerodevx/svelte-toast';
	import { onMount } from 'svelte';

	onMount(() => {
		if (!$session.auth) {
			sessionPing();
		}
	});

	let loggedInActions: MenuAction[] = [];
	let loggedOutActions: MenuAction[] = [
		{
			text: 'Log In',
			class: 'bg-slate-900 text-white',
			action: () => goto(`${base}/login`)
		}
	];
	$: {
		loggedInActions = [];
		if ($session.auth) {
			loggedInActions = loggedInActions.concat([
				{
					text: $session.email,
					class: 'bg-slate-900 text-white font-bold border-b border-white'
				},
				{
					text: 'Log Out 👋',
					class: 'bg-slate-900 text-white',
					action: () => logout()
				}
			]);
		}
		if ($session.admin) {
			loggedInActions = loggedInActions.concat([
				{
					text: 'Admin',
					class: 'bg-red-500 pt-1 font-bold'
				},
				{
					text: 'Manage Courses',
					class: 'bg-red-500',
					action: () => goto(`${base}/course/edit`)
				}
			]);
		}
	}
</script>

{#if $page.url.pathname != '/login'}
	<Header>
		<div class="flex flex-row pr-5 gap-3 items-center">
			<button on:click={() => goto(`${base}/courses`)} class="courses">Courses</button>
			<div class="menu">
				{#if $session.auth}
					<Menu size="1.5rem" icon={'ic:round-menu'} actions={loggedInActions} />
				{:else}
					<Menu size="1.5rem" icon={'ic:round-menu'} actions={loggedOutActions} />
				{/if}
			</div>
		</div>
	</Header>
{/if}

<div class="fixed top-14 sm:top-20 w-full slot">
	<slot />
</div>
<SvelteToast options={{ reversed: true, intro: { y: 192 } }} />

<style lang="postcss">
	button.courses {
		@apply px-2 rounded-lg text-white border border-white;
	}

	.slot {
		max-height: calc(100lvh - 5rem);
		overflow: scroll;
	}
	@media (max-width: 640px) {
		.slot {
			max-height: calc(100lvh - 3.5rem);
		}
	}
</style>
