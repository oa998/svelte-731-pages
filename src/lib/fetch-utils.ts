import { session } from '$stores/session';

export const throwIfNot2xx = (message: string) => (response: Response) => {
	console.log('tsting', response.url);
	if (/^2..$/.test(`${response.status}`)) return response;
	throw new Error(message);
};

export const peekFor401 = (r: Response) => {
	if (/^401$/.test(`${r.status}`)) {
		session.set({ auth: false, admin: false });
	}
	return r;
};
