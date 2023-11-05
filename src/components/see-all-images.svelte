<script lang="ts">
	import { deleteImage, getAlbumImages } from '$lib/image-upload';
	import Icon from '@iconify/svelte';
	import { toast } from '@zerodevx/svelte-toast';
	import { onMount } from 'svelte';
	import UploadImage from './upload-image.svelte';

	let imgJsons: { link: string; id: string }[] = [];
	let loading = false;
	let d = 'https://i.imgur.com/Fngg8iI.png';

	const load = () => {
		loading = true;
		getAlbumImages()
			.then((imgs) => (imgJsons = imgs))
			.catch((e) => {
				toast.push(e.message, {
					theme: {
						'--toastBackground': 'RGBA(220, 20, 60, 0.7)'
					}
				});
			})
			.then(() => (loading = false));
	};

	onMount(load);
</script>

<div>
	<div class="buttons">
		<button disabled={loading} on:click={load}>{loading ? 'Loading' : 'Refresh images'}</button>
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
							.then((r) => {
								if (r.status === 200) {
									imgJsons = imgJsons.filter((j) => j.id !== id);
								}
							})
							.catch((e) => console.error(e));
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
	div {
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
		@apply text-xs sticky top-[-1px] right-0 z-10 grid gap-1 bg-black py-1;
	}

	div.buttons button {
		background-color: var(--bondi-blue);
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
