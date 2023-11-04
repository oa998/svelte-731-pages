<script lang="ts">
	import { env } from '$env/dynamic/public';
	import { upload } from '$lib/image-upload';
</script>

<form on:submit|preventDefault={upload} class="bg-white">
	<input type="file" name="image" id="image" accept="image" />
	<button type="submit" class="border border-black p-1 rounded">upload</button>
	<span class="pl-10 text-xs">var: {env.PUBLIC_IMGUR_CLIENT_ID}</span>
</form>
