<script lang="ts">
	import { browser } from '$app/environment';
	import { styleOverrides, variableMapping } from './../stores/editor.ts';

	let loaded = false;
	let r: HTMLElement;
	if (browser) r = document.querySelector(':root')!;
	$: if (r) {
		Object.keys(variableMapping).forEach((cssVar) =>
			r!.style.setProperty(cssVar, $styleOverrides[cssVar])
		);
		loaded = true;
	}
</script>

{#if loaded}
	<article id="custom-article">
		<slot />
	</article>
{/if}

<style lang="postcss">
	article {
		transition: all 1s;
		margin: 0 auto;
		@apply flex flex-col;
	}

	:global(article#custom-article p) {
		transition: all 1s;
		margin-top: var(--paragraph-margin-top);
	}

	:global(article#custom-article) {
		max-width: var(--article-max-width);
		gap: var(--article-gap);
	}
</style>
