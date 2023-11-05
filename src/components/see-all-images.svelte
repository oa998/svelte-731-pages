<script lang="ts">
	import { deleteImage, getAlbumImages } from '$lib/imgur-apis';
	import { toastMsg } from '$lib/toast';
	import Icon from '@iconify/svelte';
	import { onMount } from 'svelte';
	import { toastErrorCatch } from './../lib/toast.ts';
	import UploadImage from './upload-image.svelte';

	let imgJsons: { link: string; id: string }[] = [];
	let loading = false;

	const load = () => {
		loading = true;
		getAlbumImages()
			.then((imgs) => (imgJsons = imgs.sort((a, b) => b.datetime - a.datetime)))
			.catch(toastErrorCatch)
			.then(() => (loading = false));
	};

	onMount(load);
</script>

<div class="wrapper">
	<div class="buttons">
		<UploadImage on:image-uploaded={load} />
	</div>
	<div class="images">
		{#each imgJsons as { link, id }, i (id)}
			<section>
				<img src={link} alt={`img_${i}`} />

				<button
					class="delete"
					on:click={() => {
						deleteImage(id)
							.then(() => {
								toastMsg('Image deleted');
								load();
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

	div.buttons {
		@apply text-xs sticky top-[-1px] right-0 z-10 grid gap-1 bg-black pb-1;
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
