<script lang="ts">
	import { env } from '$env/dynamic/public';
	import { upload } from '$lib/image-upload';
</script>

<form on:submit|preventDefault={upload} class="bg-white">
	<input type="file" name="image" id="image" accept="image" />
	<input type="text" name="album" hidden value="p2M8FFhintt0aW5" />
	<button type="submit" class="border border-black p-1 rounded">upload</button>
	<span class="pl-10 text-xs">var: {env.PUBLIC_IMGUR_CLIENT_ID}</span>
</form>

<!-- 

{
    "data": {
        "id": "OBfO4UG",
        "deletehash": "p2M8FFhintt0aW5",
        "account_id": "3010605",
        "title": "731vibes",
        "description": "",
        "privacy": "0",
        "cover": "",
        "order": "",
        "layout": "b",
        "num_images": "",
        "datetime": "2023-11-04 17:20:40"
    },
    "success": true,
    "status": 200
}

 -->
