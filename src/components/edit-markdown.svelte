<script lang="ts">
	import { writable } from 'svelte/store';
	export let markdown: string = '';
	export let onblur: (textContent: string) => void = () => {};
	const value = writable(markdown);

	$: $value = markdown.replaceAll(/\n{2,}/g, '\n\n').trim();
</script>

<div
	contenteditable
	bind:innerText={$value}
	on:blur={() => onblur($value)}
	class="whitespace-pre-wrap w-full h-full bg-white bg-opacity-90 p-1"
>
	{$value}
</div>

<style lang="postcss">
</style>
