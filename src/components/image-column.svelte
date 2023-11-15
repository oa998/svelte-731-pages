<script context="module">
	import { getAlbumImages } from '$lib/imgur-apis';
	export function refreshImages() {
		getAlbumImages().catch(toastErrorCatch);
	}
</script>

<script lang="ts">
	import { deleteImage } from '$lib/imgur-apis';
	import { toastMsg } from '$lib/toast';
	import Icon from '@iconify/svelte';
	import { onMount } from 'svelte';
	import { toastErrorCatch } from '../lib/toast.ts';
	import { images } from '../stores/images.ts';
	onMount(refreshImages);
</script>

<div class="wrapper">
	<div class="images">
		{#each $images as { link, id }, i (id)}
			<section>
				<img src={link} alt={`img_${i}`} />

				<button
					class="delete"
					on:click={() => {
						deleteImage(id)
							.then(() => {
								toastMsg('Image deleted');
								refreshImages();
							})
							.catch(toastErrorCatch);
					}}
				>
					<Icon icon="ph:x-fill" style="font-size:x-large" color="red" />
				</button>

				<button
					class="copy"
					on:click={() => {
						navigator.clipboard.writeText(`![img](${link} "image")`);
					}}
				>
					<Icon icon="ph:copy" style="font-size:small" color="white" />
				</button>
			</section>
		{/each}
	</div>
</div>

<style lang="postcss">
	div.wrapper {
		@apply relative flex flex-col w-[130px];
	}

	div.images {
		@apply flex flex-col gap-1;
	}

	section,
	img {
		@apply w-full h-auto;
	}

	section {
		@apply relative;
	}

	section button.copy {
		@apply absolute bottom-1 right-1 bg-black rounded p-2;
	}

	section button.delete {
		@apply absolute top-1 right-1 bg-white rounded;
	}

	button:disabled {
		@apply bg-slate-300 text-gray-500;
	}
</style>
