<script lang="ts">
	import Icon from '@iconify/svelte';
</script>

<button on:click class="relative flex w-full justify-center">
	<hr class="w-full absolute top-[45%] z-0" />
	<span id="add-menu-wrapper" class="bg-green-500 rounded-full">
		<Icon icon="ci:add-plus-circle" />
	</span>
</button>

<style lang="postcss">
	button {
		cursor: pointer;
		transition: all 100ms;
	}

	button:hover > hr {
		border-color: green;
		mask: linear-gradient(
			90deg,
			transparent 15%,
			white 46%,
			transparent,
			white 54%,
			transparent 85%
		);
	}

	button:hover > span {
		background-color: green;
	}

	hr {
		border-width: 2px;
		mask: linear-gradient(
			90deg,
			transparent 45%,
			white 46%,
			transparent,
			white 54%,
			transparent 55%
		);
		transition: all 300ms;
	}

	:global(#add-menu-wrapper svg) {
		color: white;
	}
	/* 
	:global(.svgg) {
		font-size: large;
		color: green;
		z-index: 5;
		transition: all 300ms;
	}
	:global(.svgg:hover) {
		font-size: xx-large;
		background-color: white;
	}

	:global(.svgg ~ hr) {
		border-color: green;
	} */
</style>
