// import createClient from 'openapi-fetch';
// import type { paths } from './v1.d'; // generated by openapi-typescript

// const client = createClient<paths>({
// 	baseUrl: 'http://localhost:3000'
// });

export const studentApplicationUpload = (formData: FormData) => {
	return fetch('/z/app/upload', {
		method: 'POST',
		headers: {
			Accept: '*/*'
		},
		body: formData
	});
};