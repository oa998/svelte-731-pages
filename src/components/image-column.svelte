<script context="module">
	import { getAlbumImages, setMockImages } from '$lib/imgur-apis';
	export function refreshImages() {
		if (window.location.host.includes('localhost')) {
			setMockImages();
		} else {
			getAlbumImages().catch(toastErrorCatch);
		}
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
				<img src={link} alt={`img_${i}`} loading="lazy" class="min-h-[50px]" />

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

				<div class="copy">
					<button
						on:click={() => {
							navigator.clipboard.writeText(link);
							navigator.clipboard.readText().then((s) => toastMsg(`copied: ${s}`));
						}}
					>
						<Icon icon="material-symbols:link" style="font-size:large" color="black" />
					</button>

					<button
						on:click={() => {
							navigator.clipboard.writeText(`![img](${link} "image")`);
							navigator.clipboard.readText().then((s) => toastMsg(`copied: ${s}`));
						}}
					>
						<Icon icon="pepicons-pencil:eye-frame" style="font-size:large" color="black" />
					</button>
				</div>
			</section>
		{/each}
	</div>
</div>

<style lang="postcss">
	div.wrapper {
		@apply relative flex flex-col;
	}

	div.images {
		grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
		@apply grid gap-2 relative;
	}

	section,
	img {
		@apply w-full h-auto;
	}

	section {
		@apply relative bg-black bg-opacity-80 grid h-full items-center;
	}

	section .copy {
		@apply flex flex-row gap-1 absolute bottom-1 right-1;
	}

	section .copy button {
		@apply bg-white rounded border border-black;
	}

	section button.delete {
		@apply absolute top-1 right-1 bg-white rounded;
	}

	button:disabled {
		@apply bg-slate-300 text-gray-500;
	}

	section .copy button:active {
		@apply bg-green-600;
	}
</style>
