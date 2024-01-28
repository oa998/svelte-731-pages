import { env } from '$env/dynamic/public';
import { images } from '../stores/images';
import { throwCustomIfNot2xx } from './fetch-utils';
import { toastErrorCatch, toastMsg } from './toast';

const headers = {
	Authorization: `Bearer ${env.PUBLIC_IMGUR_ACCESS_TOKEN}`
};
// const albumHash = 'bEsql5b';
const albumHash = 'vdt9oAp'; // delete #2 -- WX4r2s54ABuloZt
// const albumDelete = 'zOhklJIXmESkgad';

export const createAlbum = () => {
	const formdata = new FormData();
	formdata.append('title', '731V' + Math.floor(Math.random() * 1e5));

	const requestOptions = {
		method: 'POST',
		headers,
		body: formdata
	};

	return fetch('https://api.imgur.com/3/album', requestOptions)
		.then(throwCustomIfNot2xx('Failed to create album'))
		.then(async (r) => console.log(await r.text()))
		.catch(toastErrorCatch);
};

const moveToAlbum = (imageHash: string, imageName: string) => {
	const formdata = new FormData();
	formdata.append('deletehashes[]', imageHash);

	const requestOptions = {
		method: 'POST',
		headers,
		body: formdata
	};

	return fetch(`https://api.imgur.com/3/album/${albumHash}/add`, requestOptions)
		.then(throwCustomIfNot2xx('Failed to add image to album'))
		.then(() => toastMsg(imageName + ' uploaded'))
		.catch(toastErrorCatch);
};

export const upload = async (
	e: Event & {
		readonly submitter: HTMLElement | null;
	} & {
		currentTarget: EventTarget & HTMLFormElement;
	}
) => {
	const images = new FormData(e.currentTarget).getAll('image');

	for (const image of images) {
		const f = new FormData();
		f.set('image', image);

		const requestOptions = {
			method: 'POST',
			headers,
			body: f
		};

		await fetch('https://api.imgur.com/3/image', requestOptions)
			.then(throwCustomIfNot2xx('Failed to upload image'))
			.then((response) => response.json())
			.then((result) => moveToAlbum(result.data.deletehash, f.get('image').name))
			.catch(toastErrorCatch);
	}
};

export const deleteImage = (imageHash: string) => {
	const requestOptions = {
		method: 'DELETE',
		headers
	};
	return fetch(`https://api.imgur.com/3/image/${imageHash}`, requestOptions)
		.then(throwCustomIfNot2xx('Failed to delete image'))
		.catch(toastErrorCatch);
};

export const getAlbumImages = () => {
	const requestOptions = {
		method: 'GET',
		headers
	};

	return fetch(`https://api.imgur.com/3/album/${albumHash}/images`, requestOptions)
		.then(throwCustomIfNot2xx('Failed to read album'))
		.then((response) => response.json())
		.then((result) => {
			if (result.data?.error) {
				images.set([]);
			} else {
				const imgs = (result?.data || []) as { datetime: number; link: string; id: string }[];
				const sortedImages = imgs.sort((a, b) => b.datetime - a.datetime);
				images.set(sortedImages);
			}
		})
		.catch(toastErrorCatch);
};

export const setMockImages = () => {
	images.set([
		{ link: 'https://i.imgur.com/lUsy2i1.png', id: '' + Math.floor(Math.random() * 9e9) },
		{ link: 'https://i.imgur.com/h7tqK2W.png', id: '' + Math.floor(Math.random() * 9e9) },
		{ link: 'https://i.imgur.com/RyvVS2P.png', id: '' + Math.floor(Math.random() * 9e9) },
		{ link: 'https://i.imgur.com/Gqya0UU.jpg', id: '' + Math.floor(Math.random() * 9e9) },
		{ link: 'https://i.imgur.com/UWyQBjk.png', id: '' + Math.floor(Math.random() * 9e9) },
		{ link: 'https://i.imgur.com/lUsy2i1.png', id: '' + Math.floor(Math.random() * 9e9) },
		{ link: 'https://i.imgur.com/h7tqK2W.png', id: '' + Math.floor(Math.random() * 9e9) },
		{ link: 'https://i.imgur.com/RyvVS2P.png', id: '' + Math.floor(Math.random() * 9e9) },
		{ link: 'https://i.imgur.com/Gqya0UU.jpg', id: '' + Math.floor(Math.random() * 9e9) },
		{ link: 'https://i.imgur.com/UWyQBjk.png', id: '' + Math.floor(Math.random() * 9e9) },
		{ link: 'https://i.imgur.com/lUsy2i1.png', id: '' + Math.floor(Math.random() * 9e9) },
		{ link: 'https://i.imgur.com/h7tqK2W.png', id: '' + Math.floor(Math.random() * 9e9) },
		{ link: 'https://i.imgur.com/RyvVS2P.png', id: '' + Math.floor(Math.random() * 9e9) },
		{ link: 'https://i.imgur.com/Gqya0UU.jpg', id: '' + Math.floor(Math.random() * 9e9) },
		{ link: 'https://i.imgur.com/UWyQBjk.png', id: '' + Math.floor(Math.random() * 9e9) },
		{ link: 'https://i.imgur.com/lUsy2i1.png', id: '' + Math.floor(Math.random() * 9e9) },
		{ link: 'https://i.imgur.com/h7tqK2W.png', id: '' + Math.floor(Math.random() * 9e9) },
		{ link: 'https://i.imgur.com/RyvVS2P.png', id: '' + Math.floor(Math.random() * 9e9) },
		{ link: 'https://i.imgur.com/Gqya0UU.jpg', id: '' + Math.floor(Math.random() * 9e9) },
		{ link: 'https://i.imgur.com/UWyQBjk.png', id: '' + Math.floor(Math.random() * 9e9) },
		{ link: 'https://i.imgur.com/lUsy2i1.png', id: '' + Math.floor(Math.random() * 9e9) },
		{ link: 'https://i.imgur.com/h7tqK2W.png', id: '' + Math.floor(Math.random() * 9e9) },
		{ link: 'https://i.imgur.com/RyvVS2P.png', id: '' + Math.floor(Math.random() * 9e9) },
		{ link: 'https://i.imgur.com/Gqya0UU.jpg', id: '' + Math.floor(Math.random() * 9e9) },
		{ link: 'https://i.imgur.com/UWyQBjk.png', id: '' + Math.floor(Math.random() * 9e9) },
		{ link: 'https://i.imgur.com/lUsy2i1.png', id: '' + Math.floor(Math.random() * 9e9) },
		{ link: 'https://i.imgur.com/h7tqK2W.png', id: '' + Math.floor(Math.random() * 9e9) },
		{ link: 'https://i.imgur.com/RyvVS2P.png', id: '' + Math.floor(Math.random() * 9e9) },
		{ link: 'https://i.imgur.com/Gqya0UU.jpg', id: '' + Math.floor(Math.random() * 9e9) },
		{ link: 'https://i.imgur.com/UWyQBjk.png', id: '' + Math.floor(Math.random() * 9e9) },
		{ link: 'https://i.imgur.com/lUsy2i1.png', id: '' + Math.floor(Math.random() * 9e9) },
		{ link: 'https://i.imgur.com/h7tqK2W.png', id: '' + Math.floor(Math.random() * 9e9) },
		{ link: 'https://i.imgur.com/RyvVS2P.png', id: '' + Math.floor(Math.random() * 9e9) },
		{ link: 'https://i.imgur.com/Gqya0UU.jpg', id: '' + Math.floor(Math.random() * 9e9) },
		{ link: 'https://i.imgur.com/UWyQBjk.png', id: '' + Math.floor(Math.random() * 9e9) },
		{ link: 'https://i.imgur.com/lUsy2i1.png', id: '' + Math.floor(Math.random() * 9e9) },
		{ link: 'https://i.imgur.com/h7tqK2W.png', id: '' + Math.floor(Math.random() * 9e9) },
		{ link: 'https://i.imgur.com/RyvVS2P.png', id: '' + Math.floor(Math.random() * 9e9) },
		{ link: 'https://i.imgur.com/Gqya0UU.jpg', id: '' + Math.floor(Math.random() * 9e9) },
		{ link: 'https://i.imgur.com/UWyQBjk.png', id: '' + Math.floor(Math.random() * 9e9) },
		{ link: 'https://i.imgur.com/lUsy2i1.png', id: '' + Math.floor(Math.random() * 9e9) },
		{ link: 'https://i.imgur.com/h7tqK2W.png', id: '' + Math.floor(Math.random() * 9e9) },
		{ link: 'https://i.imgur.com/RyvVS2P.png', id: '' + Math.floor(Math.random() * 9e9) },
		{ link: 'https://i.imgur.com/Gqya0UU.jpg', id: '' + Math.floor(Math.random() * 9e9) },
		{ link: 'https://i.imgur.com/UWyQBjk.png', id: '' + Math.floor(Math.random() * 9e9) },
		{ link: 'https://i.imgur.com/lUsy2i1.png', id: '' + Math.floor(Math.random() * 9e9) },
		{ link: 'https://i.imgur.com/h7tqK2W.png', id: '' + Math.floor(Math.random() * 9e9) },
		{ link: 'https://i.imgur.com/Gqya0UU.jpg', id: '' + Math.floor(Math.random() * 9e9) },
		{ link: 'https://i.imgur.com/RyvVS2P.png', id: '' + Math.floor(Math.random() * 9e9) },
		{ link: 'https://i.imgur.com/Gqya0UU.jpg', id: '' + Math.floor(Math.random() * 9e9) },
		{ link: 'https://i.imgur.com/UWyQBjk.png', id: '' + Math.floor(Math.random() * 9e9) }
	]);
};

/*
  album image objects:
  {
    account_id:null
    account_url:null
    ad_type:0
    ad_url:""
    animated:false
    bandwidth:262423
    datetime:1699203015
    deletehash:"xaxaxaxaxaxa"
    description:null
    edited:"0"
    favorite:false
    has_sound:false
    height:546
    id:"aaaaaa"
    in_gallery:false
    in_most_viral:false
    is_ad:false
    link:"https://i.imgur.com/aaaaaa.png"
    name:null
    nsfw:null
    section:null
    size:262423
    tags:[]
    title:null
    type:"image/png"
    views:1
    vote:null
    width:728
  }
*/
