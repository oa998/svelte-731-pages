<script lang="ts">
	const upload = (
		e: Event & {
			readonly submitter: HTMLElement | null;
		} & {
			currentTarget: EventTarget & HTMLFormElement;
		}
	) => {
		const form = new FormData(e.currentTarget);
		console.log(form.get('album'), '<<album');
		const requestOptions = {
			method: 'POST',
			headers: {
				Authorization: `Client-ID 9f881d93c8b3282`
			},
			body: new FormData(e.currentTarget),
			redirect: 'follow'
		};

		// wqV6XuJ

		fetch('https://api.imgur.com/3/image', requestOptions)
			.then((response) => response.text())
			.then((result) => console.log(result))
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
