import { resetSession } from '$stores/session';

export const throwIfNot2xx = async (response: Response) => {
	if (/^2..$/.test(`${response.status}`)) return response;
	const message = await response.text();
	throw new Error(message);
};

export const throwCustomIfNot2xx = (message: string) => (response: Response) => {
	if (/^2..$/.test(`${response.status}`)) return response;
	throw new Error(message);
};

export const peekFor401 = (r: Response) => {
	if (/^401$/.test(`${r.status}`)) {
		resetSession();
	}
	return r;
};
