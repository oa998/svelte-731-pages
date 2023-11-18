<script lang="ts">
</script>

<article id="custom-article">
	<slot />
</article>

<style lang="postcss">
	article {
		transition: all 1s;
		margin: 0 auto;
		@apply flex flex-col max-w-3xl w-full px-2;
	}
</style>
