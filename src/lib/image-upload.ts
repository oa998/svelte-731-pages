import { env } from '$env/dynamic/public';

// const moveToAlbum = (imageHash: string) => {
// 	const formdata = new FormData();
// 	formdata.append('deletehashes[]', imageHash);

// 	const requestOptions = {
// 		method: 'POST',
// 		headers: {
// 			// Authorization: `Client-ID ${env.PUBLIC_IMGUR_CLIENT_ID}`
// 			Authorization: `Bearer ${env.PUBLIC_IMGUR_ACCESS_TOKEN}`
// 		},
// 		body: formdata,
// 		redirect: 'follow'
// 	};
// 	fetch('https://api.imgur.com/3/album/OBfO4UG', requestOptions).catch((error) =>
// 		console.log('error moving to album', error)
// 	);
// };

const getAlbumImages = () => {
	fetch('https://api.imgur.com/3/album/OBfO4UG/images', {
		method: 'GET',
		headers: {
			Authorization: `Client-ID ${env.PUBLIC_IMGUR_CLIENT_ID}`
		},
		body: new FormData(),
		redirect: 'follow'
	})
		.then((r) => r.json())
		.then((j) => console.log(JSON.stringify(j, null, 2)))
		.catch((e) => console.log(e));
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
			// moveToAlbum(result.data.deletehash);
		})
		.catch((error) => console.log('error', error));

	getAlbumImages();
};

/**
 * 
 * 
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

 */
