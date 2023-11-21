<script lang="ts">
	import ImageColumn, { refreshImages } from './image-column.svelte';
	import UploadImage from './upload-image.svelte';
	export let open = false;
</script>

<aside>
	<input type="checkbox" bind:checked={open} hidden />
	<div>
		<UploadImage on:image-uploaded={refreshImages} />
		<ImageColumn />
	</div>
</aside>

<style lang="postcss">
	div {
		overflow-y: scroll;
		box-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
		grid-template-columns: 1fr;
		grid-template-rows: 1fr 20fr;
		@apply grid justify-center h-full w-full gap-1 bg-black rounded;
	}
	input:not(:checked) ~ div {
		@apply hidden;
	}
</style>
