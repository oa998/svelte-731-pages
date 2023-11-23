import { env } from '$env/dynamic/public';
import { images } from '../stores/images';
import { throwIfNot2xx } from './fetch-utils';

const headers = {
	Authorization: `Bearer ${env.PUBLIC_IMGUR_ACCESS_TOKEN}`
};

const albumHash = 'bEsql5b';
// const albumDelete = 'zOhklJIXmESkgad';

export const createAlbum = () => {
	const formdata = new FormData();
	formdata.append('title', '731V' + Math.floor(Math.random() * 1e5));

	const requestOptions = {
		method: 'POST',
		headers,
		body: formdata
	};

	return fetch('https://api.imgur.com/3/album', requestOptions).then(
		throwIfNot2xx('Failed to create album')
	);
};

const moveToAlbum = (imageHash: string) => {
	const formdata = new FormData();
	formdata.append('deletehashes[]', imageHash);

	const requestOptions = {
		method: 'POST',
		headers,
		body: formdata
	};

	return fetch(`https://api.imgur.com/3/album/${albumHash}/add`, requestOptions).then(
		throwIfNot2xx('Failed to add image to album')
	);
};

export const deleteImage = (imageHash: string) => {
	const requestOptions = {
		method: 'DELETE',
		headers
	};
	return fetch(`https://api.imgur.com/3/image/${imageHash}`, requestOptions).then(
		throwIfNot2xx('Failed to delete image')
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
		headers,
		body: new FormData(e.currentTarget)
	};

	return fetch('https://api.imgur.com/3/image', requestOptions)
		.then(throwIfNot2xx('Failed to upload image'))
		.then((response) => response.json())
		.then((result) => moveToAlbum(result.data.deletehash));
};

export const getAlbumImages = () => {
	const requestOptions = {
		method: 'GET',
		headers
	};

	return fetch(`https://api.imgur.com/3/album/${albumHash}/images`, requestOptions)
		.then(throwIfNot2xx('Failed to read album'))
		.then((response) => response.json())
		.then((result) => {
			if (result.data?.error) {
				images.set([]);
			} else {
				console.log('results', result.data);
				images.set(result?.data);
			}
		});
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
