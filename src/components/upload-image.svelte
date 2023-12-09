<script lang="ts">
	import { upload } from '$lib/imgur-apis';
	import { toastMsg } from '$lib/toast';
	import { createEventDispatcher } from 'svelte';

	let fileInput: HTMLInputElement;
	let imagesSelected: number = 0;
	const dispatch = createEventDispatcher();
	let uploading = false;

	$: fileChange = (
		e: Event & {
			target: HTMLInputElement | null | EventTarget;
			currentTarget: EventTarget & HTMLInputElement;
		}
	) => {
		// imageSelected = (e.target as HTMLInputElement).files?.[0]?.name;
		imagesSelected = (e.target as HTMLInputElement).files?.length || 0;
	};

	$: _selectFile = () => fileInput.click();

	$: _upload = (
		e: Event & {
			readonly submitter: HTMLElement | null;
		} & {
			currentTarget: EventTarget & HTMLFormElement;
		}
	) => {
		uploading = true;
		upload(e)
			.then((r) => {
				dispatch('image-uploaded', r);
				toastMsg(`${imagesSelected} image${imagesSelected > 1 ? 's' : ''} uploaded`);
				imagesSelected = 0;
			})
			.then(() => (uploading = false));
	};
</script>

<form on:submit|preventDefault={_upload} class="bg-white p-1">
	<input
		type="file"
		name="image"
		id="image"
		accept="image"
		multiple
		hidden
		bind:this={fileInput}
		on:change={fileChange}
	/>
	<button
		type="button"
		class="overflow-hidden"
		on:click|preventDefault|stopPropagation={_selectFile}
	>
		{#if imagesSelected > 0}
			{`${imagesSelected} image${imagesSelected > 1 ? 's' : ''}`}
		{:else}
			Upload Image
		{/if}
	</button>
	{#if imagesSelected > 0}
		<button type="submit" class="border border-black rounded" disabled={uploading}
			>{uploading ? 'Uploading' : 'Upload'}</button
		>
	{/if}
</form>

<style lang="postcss">
	form {
		@apply flex flex-col text-center;
	}

	form button[type='submit'] {
		background-color: green;
		color: white;
		@apply w-full;
	}

	button[type='submit']:disabled {
		@apply bg-gray-500 text-gray-700;
	}
</style>
