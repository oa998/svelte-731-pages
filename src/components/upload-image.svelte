<script lang="ts">
	import { upload } from '$lib/image-upload';

	let imageSelected = false;
	$: fileChange = (e) => {
		imageSelected = !!e.target.files?.[0]?.name;
	};
</script>

<form on:submit|preventDefault={upload} class="bg-white w-full">
	<input type="file" name="image" id="image" accept="image" hidden on:change={fileChange} />
	{#if !imageSelected}
		<label for="image">Upload Image</label>
	{:else}
		<button type="submit" class="border border-black rounded">something</button>
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
		@apply w-full;
	}
</style>
