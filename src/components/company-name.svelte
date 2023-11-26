<script lang="ts">
	export let textSize: string = 'text-3xl';
</script>

<span class={` ${$$props.class} ${textSize}`}>731 Vibes</span>

<style lang="postcss">
	span {
		color: var(--lemon-chiffon);
		display: inline-block;
		text-shadow: 1px 1px 4px var(--persian-indigo), 1px 1px 8px var(--persian-indigo);
		font-family: 'Lobster', sans-serif;
		@apply w-full p-2 sm:p-5;
	}
</style>
