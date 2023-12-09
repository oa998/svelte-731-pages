<script lang="ts">
	import { createAlbum } from '$lib/imgur-apis';
	import ImageColumn, { refreshImages } from './image-column.svelte';
	import UploadImage from './upload-image.svelte';
	export let open = false;
</script>

<aside>
	<input type="checkbox" bind:checked={open} hidden />
	<div>
		<button on:click={createAlbum}>Create Album</button>
		<UploadImage on:image-uploaded={refreshImages} />
		<ImageColumn />
	</div>
</aside>

<style lang="postcss">
	div {
		overflow-y: scroll;
		grid-template-columns: 1fr;
		grid-template-rows: 1fr 20fr;
		max-height: 100vh;
		@apply grid justify-center h-full w-full gap-1 pb-10;
	}
	input:not(:checked) ~ div {
		@apply hidden;
	}
</style>
