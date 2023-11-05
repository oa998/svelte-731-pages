export const throwIfNot2xx = (message: string) => (response: Response) => {
	if (/^2..$/.test(`${response.status}`)) return response;
	throw new Error(message);
};
