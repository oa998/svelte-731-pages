<script lang="ts">
	import SeeAllImages from './see-all-images.svelte';

	export let open = false;
</script>

<input type="checkbox" bind:checked={open} hidden />
<div>
	<SeeAllImages />
</div>

<style lang="postcss">
	div {
		max-width: max-content;
		max-height: 80vh;
		overflow-y: scroll;
		top: 10vh;
		@apply grid justify-center fixed right-0 h-full w-full bg-black;
	}
	input:not(:checked) ~ div {
		@apply hidden;
	}
</style>
