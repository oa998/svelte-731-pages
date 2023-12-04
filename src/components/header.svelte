<script>
	import CompanyName from './company-name.svelte';
</script>

<header>
	<CompanyName class="text-4xl" />
	<slot />
</header>

<style lang="postcss">
	header {
		border-bottom: 1px solid rgba(255, 255, 255, 0.6);
		@apply flex flex-row items-center justify-between;
	}
</style>
