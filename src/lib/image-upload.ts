import { env } from '$env/dynamic/public';

const headers = {
	Authorization: `Bearer ${env.PUBLIC_IMGUR_ACCESS_TOKEN}`
};

const albumHash = 'bEsql5b';
const albumDelete = 'zOhklJIXmESkgad';

export const createAlbum = () => {
	const formdata = new FormData();
	formdata.append('title', '731V' + Math.floor(Math.random() * 1e5));

	const requestOptions = {
		method: 'POST',
		headers,
		body: formdata
	};

	fetch('https://api.imgur.com/3/album', requestOptions)
		.then((response) => response.text())
		.then((result) => console.log('album create', result))
		.catch((error) => console.log('error', error));
};

const moveToAlbum = (imageHash: string) => {
	const formdata = new FormData();
	formdata.append('deletehashes[]', imageHash);

	const requestOptions = {
		method: 'POST',
		headers,
		body: formdata
	};

	fetch(`https://api.imgur.com/3/album/${albumHash}/add`, requestOptions)
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

	return fetch(`https://api.imgur.com/3/album/${albumHash}/remove_images`, requestOptions);
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

	return fetch(`https://api.imgur.com/3/album/${albumHash}/images`, requestOptions)
		.then((response) => response.json())
		.then((result) => {
			console.log(result?.data);
			return result.data?.error ? [] : result?.data;
		});
};

/*
  
// title:  731-vibes-album
{"data":{"id":"AUKIaeY","deletehash":"${albumHash}"},"success":true,"status":200}

 */
