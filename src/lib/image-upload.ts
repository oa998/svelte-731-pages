import { env } from '$env/dynamic/public';

const headers = {
	Authorization: `Client-ID ${env.PUBLIC_IMGUR_CLIENT_ID}`
};

const moveToAlbum = (imageHash: string) => {
	const formdata = new FormData();
	formdata.append('deletehashes[]', imageHash);

	const requestOptions = {
		method: 'POST',
		headers,
		body: formdata
	};

	fetch('https://api.imgur.com/3/album/7edTTiDoC3yQpPV/add', requestOptions)
		.catch((error) => console.log('error moving to album', error))
		.then(() => getAlbumImages());
};

export const removeFromAlbum = (imageHash: string) => {
	const formdata = new FormData();
	formdata.append('ids[]', imageHash);

	const requestOptions = {
		method: 'POST',
		headers,
		body: formdata
	};

	return fetch('https://api.imgur.com/3/album/7edTTiDoC3yQpPV/remove_images', requestOptions);
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
		headers,
		body: new FormData(e.currentTarget)
	};

	return fetch('https://api.imgur.com/3/image', requestOptions)
		.then((response) => response.json())
		.then((result) => {
			console.log(JSON.stringify(result, null, 2));
			moveToAlbum(result.data.deletehash);
		})
		.catch((error) => console.log('error', error));
};

export const getAlbumImages = () => {
	const requestOptions = {
		method: 'GET',
		headers
	};

	return fetch('https://api.imgur.com/3/album/AUKIaeY/images', requestOptions)
		.then((response) => response.json())
		.then((result) => {
			return result.data?.error ? [] : result?.data;
		});
};

/*
  
// title:  731-vibes-album
{"data":{"id":"AUKIaeY","deletehash":"7edTTiDoC3yQpPV"},"success":true,"status":200}

 */
