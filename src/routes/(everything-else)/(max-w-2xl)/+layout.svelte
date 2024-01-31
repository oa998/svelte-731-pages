<div
	class="fixed top-12 sm:top-12 w-full slot px-5 sm:px-10 py-20 slot min-w-[400px] overflow-scroll"
>
	<div class="max-w-2xl m-auto">
		<slot />
	</div>
</div>

<style lang="postcss">
	.slot {
		max-height: calc(100lvh - 3rem);
	}
	@media (max-width: 640px) {
		.slot {
			max-height: calc(100lvh - 2.5rem);
		}
	}
</style>
