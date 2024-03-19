<script context="module" lang="ts">
	export type MenuAction = {
		text: string;
		action?: () => void;
		icon?: string;
		class: string;
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
	export let size: string = 'large';
	const dispatcher = createEventDispatcher();

	$: dispatcher('menu-open-close-event', {
		open: focused
	});

	const id = `${Math.floor(Math.random() * 9e10)}`;
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class={`relative ${$$props.class}`} on:mouseleave={exit} on:mouseenter={enter}>
	<input type="checkbox" {id} class="hidden" bind:checked={focused} />
	<label for={id} class="flex items-end space-x-1 cursor-pointer">
		<div class="transistion">
			<Icon {icon} class="z-10" style={`font-size: ${size}`} color={focused ? 'black' : 'white'} />
		</div>
	</label>

	<div
		class:ztop={focused}
		class="absolute mt-1 right-1 top-full rounded overflow-hidden min-w-max shadow hidden transition delay-75 ease-in-out z-20"
		on:mouseenter={enter}
		on:mouseleave={exit}
	>
		<ul class="block text-center text-sm text-white">
			{#each actions as action}
				<li>
					{#if !action.action}
						<div class={`${action.class} px-5 py-1`}>
							<span>
								{action.text}
							</span>
						</div>
					{:else}
						<button
							class={`px-5 py-2 w-full hover:brightness-200 flex flex-row gap-1 items-center ${action.class} `}
							on:click={() => {
								action.action?.();
								focused = false;
							}}
						>
							<span>
								{action.text}
							</span>
							{#if action.icon}
								<Icon icon={action.icon} color="cyan" style="font-size: small" />
							{/if}</button
						>
					{/if}
				</li>
			{/each}
		</ul>
	</div>
</div>

<style lang="postcss">
	input[type='checkbox']:checked ~ div {
		display: unset;
	}

	div.transistion {
		transition: transform 100ms linear;
	}
	div.rotate {
		color: green;
	}

	li {
		list-style: none;
	}

	ul,
	li {
		@apply p-0;
	}
	.ztop {
		@apply z-40;
	}
</style>
