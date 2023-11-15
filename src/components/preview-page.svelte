<script lang="ts">
	import { browser } from '$app/environment';
	import Icon from '@iconify/svelte';
	import { writable } from 'svelte/store';
	export let open = false;
	export let toggle: () => void;
	const dialogRef = writable<HTMLDialogElement>();

	$: if (!!$dialogRef) {
		if (open) $dialogRef.showModal();
		else $dialogRef.close();
	}

	if (browser) {
		document.body.style.overflow = 'hidden';
	}
</script>

<svelte:document
	on:keydown={(e) => {
		if (e.key === 'Escape') toggle();
	}}
/>

<!-- <dialog bind:this={$dialogRef} on:cancel|preventDefault={toggle} on:scroll|stopPropagation> -->
{#if open}
	<div class="preview-modal">
		<button class="close-preview" on:click={toggle}>
			<Icon icon="ph:x-fill" style="font-size:x-large" color="red" />
		</button>
		<slot />
		{#each Array(100).fill(1) as n}
			<div>{n}</div>
		{/each}
		<div class="watermark">Preview</div>
	</div>
{/if}

<!-- </dialog> -->

<style lang="postcss">
	div.preview-modal {
		color: white;
		width: 100vw;
		height: 100vh;
		background: var(--rich-black);

		overflow: scroll;
		@apply absolute bottom-0 left-0;
	}

	div.preview-modal::-webkit-scrollbar {
		display: none;
	}

	button.close-preview {
		@apply sticky top-0 pt-2 pr-2 w-full flex flex-row-reverse;
	}

	div.watermark {
		@apply fixed right-2 bottom-0 text-5xl text-gray-500 italic font-black opacity-20 text-right;
	}
</style>
