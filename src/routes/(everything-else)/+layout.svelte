<script lang="ts">
	import Header from '$components/header.svelte';
	import Menu, { type MenuAction } from '$components/menu.svelte';
	import { logout, sessionPing } from '$lib/auth';
	import { session } from '$stores/session';
	import { SvelteToast } from '@zerodevx/svelte-toast';
	import { onMount } from 'svelte';

	onMount(() => {
		if (!$session.auth) {
			console.log('calling session ping');
			sessionPing();
		}
	});

	let actions: MenuAction[] = [];
	$: {
		console.log({ $session });
		actions = [];
		if ($session.auth) {
			actions = actions.concat([
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
			actions = actions.concat([
				{
					text: 'Admin',
					class: 'bg-red-500 pt-1 font-bold'
				},
				{
					text: 'Manage Courses',
					class: 'bg-red-500',
					action: () => console.log('hi')
				}
			]);
		}
	}
</script>

{#if $session.auth}
	<Header>
		<div class="flex flex-row pr-5 gap-3 items-center">
			<button class="courses">Courses</button>
			<div class="menu">
				<Menu size="1.5rem" icon={'ic:round-menu'} {actions} />
			</div>
		</div>
	</Header>
{/if}
<slot />
<SvelteToast options={{ reversed: true, intro: { y: 192 } }} />

<style lang="postcss">
	button.courses {
		@apply px-2 rounded-lg text-white border border-white;
	}
</style>
