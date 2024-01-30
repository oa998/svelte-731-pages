<script lang="ts">
	import Header from '$components/header.svelte';
	import SessionMenu from '$components/session-menu.svelte';
	import { session } from '$stores/session';
</script>

<Header>
	<div class="flex flex-row pr-5 gap-3 items-center">
		<!-- <button on:click={() => goto(`${base}/courses`)} class="courses">Courses</button> -->
		<div class="menu">
			{#if $session.auth}
				<div class="email">{$session.email}</div>
			{/if}
			<SessionMenu size="2.5rem" />
		</div>
	</div>
</Header>

<div class="fixed top-14 sm:top-20 w-full slot">
	<slot />
</div>

<style lang="postcss">
	.menu {
		@apply flex flex-row rounded-md text-white items-center;
	}
	.email {
		@apply px-2;
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
