<script lang="ts">
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';

	export let textSize: string = 'text-3xl';
	export let shimmer = false;
</script>

<button on:click={() => goto(`${base || '/'}`)} class={` ${$$props.class} ${textSize}`}
	>731 Vibes</button
>

<style lang="postcss">
	button {
		color: var(--lemon-chiffon);
		display: inline-block;
		text-shadow: 1px 1px 4px var(--persian-indigo), 1px 1px 8px var(--persian-indigo);
		font-family: 'Lobster', sans-serif;
		@apply p-2 sm:p-5;
	}
</style>
