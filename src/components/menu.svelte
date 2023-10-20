<script context="module" lang="ts">
	export type MenuAction = {
		text: string;
		action: () => void;
	};
</script>

<script lang="ts">
	import Icon from '@iconify/svelte';
	import { createEventDispatcher } from 'svelte';

	let focused = false;
	let intervals: number[] = [];
	const exit = () => {
		intervals.push(setTimeout(() => (focused = false), 500));
	};
	const enter = () => {
		intervals.forEach((i) => clearInterval(i));
		intervals = [];
	};

	export let actions: MenuAction[];
	export let icon: string;
	const dispatcher = createEventDispatcher();

	$: dispatcher('menu-open-close-event', {
		open: focused
	});

	const id = `${Math.floor(Math.random() * 9e10)}`;
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="relative" on:mouseleave={exit} on:mouseenter={enter}>
	<input type="checkbox" {id} class="hidden" bind:checked={focused} />
	<label for={id} class="flex items-end space-x-1 cursor-pointer">
		<span class="text-lg">
			<Icon {icon} class="z-10" />
		</span>
	</label>

	<div
		class="absolute mt-1 right-1 top-full min-w-max shadow rounded hidden bg-gray-300 border border-black transition delay-75 ease-in-out z-20"
		on:mouseenter={enter}
		on:mouseleave={exit}
	>
		<ul class="block text-left text-sm text-gray-900">
			{#each actions as { text, action } (text)}
				<li>
					<button
						class="block px-1 py-2 hover:bg-gray-200 rounded w-full text-left"
						on:click={() => {
							action();
							focused = false;
						}}>{text}</button
					>
				</li>
			{/each}
		</ul>
	</div>
</div>

<style>
	input[type='checkbox']:checked ~ div {
		display: unset;
	}

	li {
		list-style: none;
	}

	ul,
	li {
		@apply p-0;
	}
</style>
