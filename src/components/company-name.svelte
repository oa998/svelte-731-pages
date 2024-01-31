<script lang="ts">
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';

	export let textSize: string = 'text-3xl';
	export let subtitle = false;
</script>

<button on:click={() => goto(`${base || '/'}`)} class={` ${$$props.class} ${textSize}`}>
	<span>731 Vibes</span>
	{#if subtitle}
		<div
			class="text-violet-200 dark-text-shadow font-sans font-thin text-lg sm:text-xl italic w-full text-right -mt-6 pr-3 sm:pr-6"
		>
			Paris Salon
		</div>
	{/if}
</button>

<style lang="postcss">
	button > span {
		color: var(--lemon-chiffon);
		text-shadow: 1px 1px 4px var(--persian-indigo), 1px 1px 8px var(--persian-indigo);
		font-family: 'Lobster', sans-serif;
		@apply p-2 sm:p-5;
	}
	.dark-text-shadow {
		text-shadow: 0 0 4px #7c3aed, 0 0 6px #7c3aed, 0 0 8px #7c3aed;
		/* text-shadow: 0 0 4px blue; */
	}
</style>
