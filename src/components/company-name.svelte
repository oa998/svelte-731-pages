<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
	<link href="https://fonts.googleapis.com/css2?family=Lobster&display=swap" rel="stylesheet" />
</svelte:head>

<header class={`p-2 sm:p-5 text-3xl ${$$props.class}`}>731 Vibes</header>

<style lang="postcss">
	header {
		color: var(--lemon-chiffon);
		display: inline-block;
		text-shadow: 1px 1px 4px crimson;
		font-family: 'Lobster', sans-serif;
		@apply z-20 w-full;
	}
</style>
