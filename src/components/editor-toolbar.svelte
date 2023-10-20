<script lang="ts">
	import { editPreview } from './../stores/editor.ts';
</script>

<input type="checkbox" checked={$editPreview} class="hidden" />
<div class="toolbar-wrapper">
	{#if !$editPreview}
		<div class="buttons">
			<div class="control">
				<button>-</button>
				<span>Section spacing</span>
				<button>+</button>
			</div>
		</div>
		<div class="buttons">
			<button on:click={() => ($editPreview = !$editPreview)}>Preview</button>
			<button id="cancel">Cancel </button>
			<button id="save">Save</button>
		</div>
	{:else}
		<div class="buttons">
			<button on:click={() => ($editPreview = !$editPreview)}>Exit Preview</button>
		</div>
	{/if}
</div>

<style lang="postcss">
	.menu-card button {
		@apply relative px-3 py-1 rounded bg-violet-400 text-white shadow-md drop-shadow-md active:shadow-none active:text-gray-300 whitespace-nowrap;
	}

	.control {
		@apply flex flex-row w-max items-center gap-1 border border-dashed border-black p-1 rounded;
	}

	.toolbar-wrapper {
		box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.5);
		@apply w-full fixed bottom-0 left-0 p-3 bg-white flex flex-row justify-between;
	}

	.buttons {
		@apply p-1 flex flex-row gap-3 content-center;
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
