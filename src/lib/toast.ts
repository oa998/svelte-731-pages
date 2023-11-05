import { toast } from '@zerodevx/svelte-toast';

export const toastErrorMsg = (str: string) => {
	toast.push(str, {
		theme: {
			'--toastBackground': 'RGBA(220, 20, 60, 0.7)'
		}
	});
};
export const toastErrorCatch = (err: Error) => toastErrorMsg(err.message);

export const toastMsg = (str: string) => toast.push(str);
