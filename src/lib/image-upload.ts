import { env } from '$env/dynamic/public';

const moveToAlbum = (imageHash: string) => {
	const formdata = new FormData();
	formdata.append('ids[]', imageHash);

	const requestOptions = {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${env.PUBLIC_IMGUR_ACCESS_TOKEN}`
		},
		body: formdata,
		redirect: 'follow'
	};

	fetch('https://api.imgur.com/3/album/OBfO4UG/add', requestOptions).catch((error) =>
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
			const imgHash = result.data.id;
			moveToAlbum(imgHash);
		})
		.catch((error) => console.log('error', error));
};
