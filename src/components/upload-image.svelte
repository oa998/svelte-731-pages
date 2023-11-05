<script lang="ts">
	import { upload } from '$lib/image-upload';
	import { toast } from '@zerodevx/svelte-toast';
	import { createEventDispatcher } from 'svelte';

	let imageSelected = '';
	const dispatch = createEventDispatcher();
	$: fileChange = (e) => {
		imageSelected = e.target.files?.[0]?.name;
	};
	$: _upload = (e) => {
		upload(e)
			.then((r) => {
				dispatch('image-uploaded', r).toast.push(`${imageSelected} uploaded`);
				imageSelected = '';
			})
			.catch((e) => {
				toast.push(e.message, {
					theme: {
						'--toastBackground': 'RGBA(220, 20, 60, 0.7)'
					}
				});
			});
	};
</script>

<form on:submit|preventDefault={_upload} class="bg-white p-1 max-w-[130px]">
	<input type="file" name="image" id="image" accept="image" hidden on:change={fileChange} />
	<label for="image" class="overflow-hidden">
		{#if !!imageSelected}
			{imageSelected}
		{:else}
			Upload Image
		{/if}
	</label>
	{#if !!imageSelected}
		<button type="submit" class="border border-black rounded">Upload</button>
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
</style>
