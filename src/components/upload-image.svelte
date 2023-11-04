<script lang="ts">
	import { upload } from '$lib/image-upload';

	let imageSelected = false;
	$: fileChange = (e) => {
		imageSelected = e.target.files?.[0]?.name;
	};
</script>

<form on:submit|preventDefault={upload} class="bg-white w-full p-1">
	<input type="file" name="image" id="image" accept="image" hidden on:change={fileChange} />
	<label for="image">
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
