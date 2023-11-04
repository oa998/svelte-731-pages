<script lang="ts">
	import { getAlbumImages } from '$lib/image-upload';
	import { onMount } from 'svelte';

	let imageURLs: string[] = [];
	let loading = true;

	onMount(() => {
		getAlbumImages()
			.then((urls) => (imageURLs = urls))
			.catch((e) => console.log(e))
			.then(() => (loading = false));
	});
</script>

<div>
	{#each imageURLs as url, i (url)}
		<section>
			<img src={url} alt={`img_${i}`} />
			<span>{url}</span>
		</section>
	{/each}
</div>

<style lang="postcss">
	div {
		@apply flex flex-col max-w-xs;
	}
	section,
	img {
		@apply w-full h-auto;
	}
	span {
		@apply text-xs;
	}
</style>
