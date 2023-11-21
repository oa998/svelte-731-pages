<script lang="ts">
	import ImageColumn, { refreshImages } from './image-column.svelte';
	import UploadImage from './upload-image.svelte';
	export let open = false;
</script>

<input type="checkbox" bind:checked={open} hidden />
<div>
	<UploadImage on:image-uploaded={refreshImages} />
	<ImageColumn />
</div>

<style lang="postcss">
	div {
		max-width: max-content;
		max-height: 80vh;
		overflow-y: scroll;
		box-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
		grid-template-columns: 1fr;
		grid-template-rows: 1fr 20fr;
		position: absolute;
		right: 0;
		top: 10vh;
		@apply grid justify-center h-full w-full bg-black rounded;
	}
	input:not(:checked) ~ div {
		@apply hidden;
	}
</style>
