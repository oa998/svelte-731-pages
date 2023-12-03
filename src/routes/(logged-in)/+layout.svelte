<script>
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import { logout, sessionPing } from '$lib/auth';
	import { toastErrorMsg } from '$lib/toast';
	import { session } from '$stores/session';
	import { SvelteToast } from '@zerodevx/svelte-toast';
	import { onMount } from 'svelte';
	import '../../app.css';

	onMount(() => {
		if (!$session.auth) {
			sessionPing();
		}
	});

	let loading = false;
	const _logout = () => {
		loading = true;
		logout()
			.then(() => session.set({ admin: false, auth: false }))
			.then(() => goto(`${base}`))
			.catch(() => toastErrorMsg('Failed to logout'))
			.then(() => (loading = false));
	};
</script>

{#if $session.auth}
	<div class="text-white text-center flex flex-row gap-2 items-center justify-end py-1">
		<span>Logged in</span>
		<span
			>{#if $session.admin}(admin){:else}(not admin){/if}</span
		>
		<button
			on:click={_logout}
			disabled={loading}
			class="disabled:text-gray-400 disabled:bg-gray-800 border border-white py-1 px-3 rounded"
			>Click to log out</button
		>
	</div>
{:else}
	<div class="text-white text-center"><a href={`${base}/login`}>Click to log in</a></div>
{/if}
<slot />
<SvelteToast options={{ reversed: true, intro: { y: 192 } }} />

<style>
	:root {
		--toastContainerTop: auto;
		--toastContainerRight: 10px;
		--toastContainerBottom: 10px;
		--toastBarHeight: 0;
	}
</style>
