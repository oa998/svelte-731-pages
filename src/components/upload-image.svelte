<script lang="ts">
	import { upload } from '$lib/imgur-apis';
	import { toastErrorCatch, toastMsg } from '$lib/toast';
	import { createEventDispatcher } from 'svelte';

	let imageSelected: string | undefined = '';
	const dispatch = createEventDispatcher();
	let uploading = false;

	$: fileChange = (
		e: Event & {
			target: HTMLInputElement | null | EventTarget;
			currentTarget: EventTarget & HTMLInputElement;
		}
	) => {
		imageSelected = (e.target as HTMLInputElement).files?.[0]?.name;
	};

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
				toastMsg(`${imageSelected} uploaded`);
				imageSelected = '';
			})
			.catch(toastErrorCatch)
			.then(() => (uploading = false));
	};
</script>

<form on:submit|preventDefault={_upload} class="bg-white p-1">
	<input type="file" name="image" id="image" accept="image" hidden on:change={fileChange} />
	<label for="image" class="overflow-hidden">
		{#if !!imageSelected}
			{imageSelected}
		{:else}
			Upload Image
		{/if}
	</label>
	{#if !!imageSelected}
		<button type="submit" class="border border-black rounded" disabled={uploading}
			>{uploading ? 'Uploading' : 'Upload'}</button
		>
	{/if}
</form>

<style lang="postcss">
	form {
		@apply flex flex-col text-center;
	}

	form label {
		@apply py-1;
	}

	form button {
		background-color: green;
		color: white;
		@apply w-full;
	}

	button:disabled {
		@apply bg-gray-500 text-gray-700;
	}
</style>
