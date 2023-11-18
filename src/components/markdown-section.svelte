<script lang="ts">
	import { customMarked } from '$lib/marked-custom';
	import { onMount } from 'svelte';
	export let markdown: string = '';
	let html = '';
	onMount(() => {
		html = customMarked.parse(markdown);
	});
	$: if (html) {
		html = customMarked.parse(markdown);
	}
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="true" />
	<link
		href="https://fonts.googleapis.com/css2?family=Exo+2:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&family=Taviraj:ital,wght@0,200;0,400;0,600;0,700;1,200;1,400;1,600;1,700&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<div
	class={`md_wrapper
 ${$$props.class ?? ''}`}
>
	{@html html}
</div>

<style lang="postcss">
	:global(.md_wrapper) {
		overflow: hidden;
		@apply text-white;
	}
	:global(.md_wrapper *) {
		text-wrap: wrap;
	}
	:global(.md_wrapper p, .md_wrapper ul, .md_wrapper ol, .md_wrapper details) {
		font-family: 'Taviraj', serif;
		@apply text-xl font-light;
	}

	:global(.md_wrapper > p) {
		@apply w-full;
	}

	:global(.md_wrapper > :not(:first-child)) {
		@apply pt-8;
	}
	:global(.md_wrapper ol, .md_wrapper ul) {
		@apply pl-5;
	}
	:global(.md_wrapper ol) {
		@apply list-decimal;
	}
	:global(.md_wrapper ul) {
		@apply list-disc;
	}
	:global(.md_wrapper ul ul, .md_wrapper ol ol) {
		list-style-type: circle;
		@apply pl-5 text-left;
	}
	:global(.md_wrapper blockquote) {
		@apply whitespace-nowrap text-center place-self-center;
	}
	:global(.md_wrapper h1, .md_wrapper h2, .md_wrapper h3, .md_wrapper h4, .md_wrapper h5) {
		font-family: 'Lobster', sans-serif;
		@apply py-5 font-light;
	}
	:global(.md_wrapper h1) {
		@apply text-5xl;
	}
	:global(.md_wrapper h2) {
		@apply text-4xl;
	}
	:global(.md_wrapper h3) {
		@apply text-3xl;
	}
	:global(.md_wrapper h2) {
		@apply text-2xl;
	}
	:global(.md_wrapper h5) {
		@apply text-xl;
	}

	:global(.md_wrapper a) {
		@apply underline text-blue-700;
	}

	:global(.md_wrapper blockquote, .md_wrapper p:has(> img)) {
		@apply flex flex-row justify-center w-full;
	}

	:global(.md_wrapper img) {
		@apply max-w-full max-h-[70vh];
	}

	:global(.md_wrapper blockquote ul, .md_wrapper blockquote ol) {
		@apply text-left;
	}
	:global(.md_wrapper details) {
		@apply rounded border border-white cursor-pointer overflow-hidden;
	}

	:global(.md_wrapper summary) {
		background-color: color-mix(in srgb, var(--bondi-blue) 80%, purple);
		@apply p-5 text-center;
	}

	:global(.md_wrapper details[open] div) {
		@apply py-5 bg-opacity-80 text-center;
	}

	@media (max-width: 640px) {
		:global(.md_wrapper p, .md_wrapper ul, .md_wrapper ol, .md_wrapper details) {
			@apply text-base;
		}
		:global(.md_wrapper h1) {
			@apply text-4xl;
		}
		:global(.md_wrapper h2) {
			@apply text-3xl;
		}
		:global(.md_wrapper h3) {
			@apply text-2xl;
		}
		:global(.md_wrapper h2) {
			@apply text-xl;
		}
	}
</style>
