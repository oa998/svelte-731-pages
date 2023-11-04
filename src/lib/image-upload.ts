import { env } from '$env/dynamic/public';

const moveToAlbum = (imageHash: string) => {
	const formdata = new FormData();
	formdata.append('deletehashes[]', imageHash);

	const requestOptions = {
		method: 'POST',
		headers: {
			Authorization: `Client-ID ${env.PUBLIC_IMGUR_CLIENT_ID}`
		},
		body: formdata,
		redirect: 'follow'
	};

	fetch('https://api.imgur.com/3/album/7edTTiDoC3yQpPV/add', requestOptions).catch((error) =>
		console.log('error moving to album', error)
	);
};

export const upload = (
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
			moveToAlbum(result.data.deletehash);
		})
		.catch((error) => console.log('error', error));
};

/**
 * 
 * 
{"data":{"id":"AUKIaeY","deletehash":"7edTTiDoC3yQpPV"},"success":true,"status":200}

 */
