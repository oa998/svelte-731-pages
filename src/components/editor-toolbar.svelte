<script lang="ts">
	import { courseMarkdown } from './../stores/course.ts';
	import { editPreview } from './../stores/editor.ts';
	export let showImages: () => void = () => {};
</script>

<input type="checkbox" checked={$editPreview} class="hidden" />
<div class="toolbar-wrapper">
	{#if !$editPreview}
		<div class="buttons">
			<button on:click={() => ($editPreview = !$editPreview)}>Preview</button>
			<button id="cancel">Cancel </button>
			<button
				id="save"
				on:click={() => {
					const courseId = `c-${Math.floor(Math.random() * 1e7)}`;
					console.log({ courseId, courseMarkdown: $courseMarkdown.substring(0, 50) });
					// &id=8imPjhk1VkZi579SKBgL
					fetch(
						`https://nginx-anything-storage-glovbogi2a-uc.a.run.app/storage?collectionPath=course/lashes/chapter`,
						{
							method: 'POST',
							headers: {
								accept: 'application/json',
								['content-type']: 'application/json'
							},
							body: JSON.stringify({
								courseMarkdown: $courseMarkdown
							}),
							credentials: 'include'
						}
					);
				}}>Save</button
			>
			<button on:click={showImages}>Images</button>
		</div>
	{:else}
		<div class="buttons">
			<button class="font-semibold" on:click={() => ($editPreview = !$editPreview)}
				>Exit Preview</button
			>
		</div>
	{/if}
</div>

<style lang="postcss">
	.article-settings {
		@apply w-max items-center gap-3 p-1 flex flex-row;
	}

	.toolbar-wrapper {
		box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.5);
		@apply w-full fixed bottom-0 left-0 p-3 bg-white flex flex-row flex-wrap sm:justify-end justify-center items-center;
	}

	.buttons {
		@apply p-1 flex flex-row gap-3 content-center h-min;
	}

	.buttons button {
		@apply border border-slate-600 rounded px-2;
	}

	input:checked ~ div.toolbar-wrapper {
		background: transparent;
		box-shadow: none;
		@apply justify-end;
	}

	input:checked ~ div.toolbar-wrapper > .buttons > button {
		justify-self: end;
		background: white;
	}
</style>
