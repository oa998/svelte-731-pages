<script lang="ts">
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import { page } from '$app/stores';
	import Header from '$components/header.svelte';
	import SessionMenu from '$components/session-menu.svelte';
	import { session } from '$stores/session';

	$: isLoginPage = $page.url.pathname == '/login';
</script>

{#if !isLoginPage}
	<Header>
		<div class="flex flex-row pr-5 gap-3 items-center">
			<button on:click={() => goto(`${base}/courses`)} class="courses">Courses</button>
			<div class="menu">
				{#if $session.auth}
					<div class="email">{$session.email}</div>
				{/if}
				<SessionMenu />
			</div>
		</div>
	</Header>
{/if}

<div class="fixed top-14 sm:top-20 w-full slot" class:top0={isLoginPage}>
	<slot />
</div>

<style lang="postcss">
	.menu {
		@apply flex flex-row rounded-md text-white items-center;
	}
	.email {
		border-radius: 0.3rem;
		@apply px-2 bg-black;
	}
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
	.top0 {
		top: 0;
		max-height: 100lvh;
	}
</style>
