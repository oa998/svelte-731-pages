<script lang="ts">
	import { getAlbumImages } from '$lib/image-upload';
	import Icon from '@iconify/svelte';
	import { onMount } from 'svelte';
	import UploadImage from './upload-image.svelte';

	let imageURLs: string[] = [];
	let loading = false;
	let d = 'https://i.imgur.com/Fngg8iI.png';

	const load = () => {
		loading = true;
		getAlbumImages()
			.then((r) => {
				console.log({ r });
				return r;
			})
			.then((urls) => (imageURLs = urls))
			.catch((e) => console.log(e))
			.then(() => (loading = false));
	};

	onMount(load);
</script>

<div>
	<div class="buttons">
		<button disabled={loading} on:click={load}>{loading ? 'Loading' : 'Refresh images'}</button>
		<UploadImage />
	</div>
	<div class="images">
		{#each imageURLs as url, i (url)}
			<section>
				<img src={url} alt={`img_${i}`} />
				<span>{url}</span>
			</section>
		{/each}
		<section>
			<img src={d} alt={`img_${d}`} />
			<button>
				<Icon icon="ph:copy" style="font-size:small" color="white" />
			</button>
		</section>
		<section>
			<img src={'https://i.imgur.com/mpC4Orz.gif'} alt={`img_${d}`} />
			<button>
				<Icon icon="ph:copy" style="font-size:small" color="white" />
			</button>
		</section>
		<section>
			<img src={d} alt={`img_${d}`} />
			<button>
				<Icon icon="ph:copy" style="font-size:small" color="white" />
			</button>
		</section>
		<section>
			<img src={d} alt={`img_${d}`} />
			<button>
				<Icon icon="ph:copy" style="font-size:small" color="white" />
			</button>
		</section>
		<section>
			<img src={d} alt={`img_${d}`} />
			<button>
				<Icon icon="ph:copy" style="font-size:small" color="white" />
			</button>
		</section>
		<section>
			<img src={d} alt={`img_${d}`} />
			<button>
				<Icon icon="ph:copy" style="font-size:small" color="white" />
			</button>
		</section>
		<section>
			<img src={d} alt={`img_${d}`} />
			<button>
				<Icon icon="ph:copy" style="font-size:small" color="white" />
			</button>
		</section>
		<section>
			<img src={d} alt={`img_${d}`} />
			<button>
				<Icon icon="ph:copy" style="font-size:small" color="white" />
			</button>
		</section>
		<section>
			<img src={d} alt={`img_${d}`} />
			<button>
				<Icon icon="ph:copy" style="font-size:small" color="white" />
			</button>
		</section>
		<section>
			<img src={d} alt={`img_${d}`} />
			<button>
				<Icon icon="ph:copy" style="font-size:small" color="white" />
			</button>
		</section>
		<section>
			<img src={d} alt={`img_${d}`} />
			<button>
				<Icon icon="ph:copy" style="font-size:small" color="white" />
			</button>
		</section>
		<section>
			<img src={d} alt={`img_${d}`} />
			<button>
				<Icon icon="ph:copy" style="font-size:small" color="white" />
			</button>
		</section>
		<section>
			<img src={d} alt={`img_${d}`} />
			<button>
				<Icon icon="ph:copy" style="font-size:small" color="white" />
			</button>
		</section>
		<section>
			<img src={d} alt={`img_${d}`} />
			<button>
				<Icon icon="ph:copy" style="font-size:small" color="white" />
			</button>
		</section>
		<section>
			<img src={d} alt={`img_${d}`} />
			<button>
				<Icon icon="ph:copy" style="font-size:small" color="white" />
			</button>
		</section>
		<section>
			<img src={d} alt={`img_${d}`} />
			<button>
				<Icon icon="ph:copy" style="font-size:small" color="white" />
			</button>
		</section>
		<section>
			<img src={d} alt={`img_${d}`} />
			<button>
				<Icon icon="ph:copy" style="font-size:small" color="white" />
			</button>
		</section>
		<section>
			<img src={d} alt={`img_${d}`} />
			<button>
				<Icon icon="ph:copy" style="font-size:small" color="white" />
			</button>
		</section>
		<section>
			<img src={d} alt={`img_${d}`} />
			<button>
				<Icon icon="ph:copy" style="font-size:small" color="white" />
			</button>
		</section>
		<section>
			<img src={d} alt={`img_${d}`} />
			<button>
				<Icon icon="ph:copy" style="font-size:small" color="white" />
			</button>
		</section>
		<section>
			<img src={d} alt={`img_${d}`} />
			<button>
				<Icon icon="ph:copy" style="font-size:small" color="white" />
			</button>
		</section>
		<section>
			<img src={d} alt={`img_${d}`} />
			<button>
				<Icon icon="ph:copy" style="font-size:small" color="white" />
			</button>
		</section>
	</div>
</div>

<style lang="postcss">
	div {
		@apply relative flex flex-col max-w-[130px];
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

	span {
		@apply text-xs text-white;
	}

	div.buttons {
		@apply text-xs sticky top-[-1px] right-0 z-10 grid gap-1 bg-black py-1;
	}

	div.buttons button {
		background-color: var(--bondi-blue);
	}

	section button {
		@apply absolute bottom-1 right-1 bg-black rounded p-2;
	}

	button:disabled {
		@apply bg-slate-300 text-gray-500;
	}
</style>
