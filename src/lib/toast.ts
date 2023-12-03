import { toast } from '@zerodevx/svelte-toast';

export const toastErrorMsg = (str: string) => {
	toast.push(str, {
		theme: {
			'--toastBackground': 'RGBA(220, 20, 60, 0.7)'
		}
	});
};
export const toastErrorCatch = (alternate: string) => (err: Error) => {
	const display = err.message == 'Failed to fetch' ? alternate : err.message;
	toastErrorMsg(display);
};

export const toastMsg = (str: string) =>
	toast.push(str, {
		theme: {
			'--toastBackground': 'RGBA(80, 90, 0, 0.7)'
		}
	});
