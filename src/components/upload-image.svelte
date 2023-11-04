<script lang="ts">
	import { env } from '$env/dynamic/public';

	const moveToAlbum = (imageHash: string) => {
		const formdata = new FormData();
		formdata.append('ids[]', imageHash);

		var requestOptions = {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${env.PUBLIC_IMGUR_ACCESS_TOKEN}`
			},
			body: formdata,
			redirect: 'follow'
		};

		fetch('https://api.imgur.com/3/album/p2M8FFhintt0aW5/add', requestOptions).catch((error) =>
			console.log('error moving to album', error)
		);
	};

	const upload = (
		e: Event & {
			readonly submitter: HTMLElement | null;
		} & {
			currentTarget: EventTarget & HTMLFormElement;
		}
	) => {
		const requestOptions = {
			method: 'POST',
			headers: {
				Authorization: `Client-ID ${env.PUBLIC_IMGUR_CLIENT_ID}`
			},
			body: new FormData(e.currentTarget),
			redirect: 'follow'
		};

		fetch('https://api.imgur.com/3/image', requestOptions)
			.then((response) => response.json())
			.then((result) => {
				console.log(JSON.stringify(result, null, 2));
				const imgHash = result.data.id;
				moveToAlbum(imgHash);
			})
			.catch((error) => console.log('error', error));
	};
</script>

<form on:submit|preventDefault={upload} class="bg-white">
	<input type="file" name="image" id="image" accept="image" />
	<input type="text" name="album" hidden value="p2M8FFhintt0aW5" />
	<button type="submit">upload</button>
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
