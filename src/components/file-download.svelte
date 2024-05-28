<script lang="ts">
	import Icon from '@iconify/svelte';
	export let filename: string;
	export let remoteFilename: string = '';
	export let title: string;
	export let details: string[];
	export let downloadedName: string = '';

	let anchorRef: HTMLAnchorElement;
</script>

<button
	class="rounded bg-gray-200 card-shadow shadow-black p-10"
	on:click={() => {
		anchorRef.click();
	}}
>
	<a
		href={remoteFilename || `/downloads/${filename}`}
		class="hidden"
		bind:this={anchorRef}
		download={downloadedName || filename}>download file</a
	>
	<div class="grid areas">
		<div class="font-bold header">{title}</div>
		<div class="icon m-auto">
			<Icon icon="pepicons-print:file" style="font-size:xxx-large" />
		</div>
		<div class="details">
			{#each details as a}
				<div>{a}</div>
			{/each}
		</div>
	</div>
</button>

<style lang="postcss">
	.card-shadow {
		transition: box-shadow 100ms linear;
		text-align: left;
		box-shadow: 6px 6px 5px 0 black;
		@apply active:shadow-sm active:shadow-black;
	}
	.areas {
		grid-template-areas:
			'header icon'
			'details icon';
	}
	.header {
		grid-area: header;
		@apply text-xl;
	}
	.icon {
		grid-area: icon;
		@apply w-full flex justify-end;
	}
	.details {
		grid-area: details;
	}
</style>
