<script lang="ts">
	import { styleOptions, styleOverrides, variableMapping } from '../../stores/editor.ts';

	type T = keyof typeof variableMapping;

	export let css: T; // css variable name
	const label = variableMapping[css];
	let value = $styleOverrides[css]
		? Object.entries(styleOptions[css]).find(([k, v]) => $styleOverrides[css] === v)?.[0]
		: 'default';

	$: if (value) {
		$styleOverrides[css] = styleOptions[css][value];
	}
	const id = `${Math.floor(Math.random() * 9e12)}`;
</script>

<div class="flex flex-col">
	<label for={id}>{label}</label>
	<select {id} bind:value>
		{#each Object.entries(styleOptions[css]) as [k, v] (k)}
			<option value={k}>{k}</option>
		{/each}
	</select>
</div>

<style lang="postcss">
	label {
		@apply text-sm;
	}
	select {
		@apply bg-gray-200 rounded-lg p-1;
	}
</style>
