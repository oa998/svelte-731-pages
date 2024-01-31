<script lang="ts">
	import Header from '$components/header.svelte';
	import SessionMenu from '$components/session-menu.svelte';
	import { session } from '$stores/session';
</script>

<Header>
	{#if $session.auth}
		<div class="email">{$session.email}</div>
	{/if}
	<SessionMenu size="2.5rem" />
</Header>

<div class="fixed top-12 sm:top-12 w-full slot">
	<slot />
</div>

<style lang="postcss">
	.email {
		@apply px-2 text-xs sm:text-sm flex-shrink text-ellipsis overflow-hidden text-white;
	}

	.slot {
		max-height: calc(100lvh - 3rem);
		overflow: scroll;
	}
	@media (max-width: 640px) {
		.slot {
			max-height: calc(100lvh - 2.5rem);
		}
	}
</style>
