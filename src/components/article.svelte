<script lang="ts">
</script>

<article id="custom-article">
	<slot />
</article>

<style lang="postcss">
	article {
		transition: all 1s;
		margin: 0 auto;
		@apply flex flex-col max-w-3xl;
	}

	:global(article#custom-article p) {
		transition: all 1s;
		/* margin-top: var(--paragraph-margin-top); */
	}

	:global(article#custom-article) {
		/* max-width: var(--article-max-width); */
		/* gap: var(--article-gap); */
	}
</style>
