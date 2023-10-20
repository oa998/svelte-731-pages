import { writable } from 'svelte/store';

export const editPreview = writable(false);

export const variableMapping = {
	'--article-gap': 'Section spacing',
	'--article-max-width': 'Article width',
	'--paragraph-margin-top': 'Paragraph spacing'
};

export const styleOptions = {
	'--article-gap': {
		default: '0.5rem', // small
		small: '0.5rem',
		medium: '1.25rem',
		large: '2.5rem',
		'x-large': '5rem'
	},
	'--article-max-width': {
		default: '48rem', // medium
		small: '36rem',
		medium: '48rem',
		large: '64rem',
		'x-large': '100%'
	},
	'--paragraph-margin-top': {
		default: '0.5rem', // small
		small: '0.5em',
		medium: '1em',
		large: '2em',
		'x-large': '4em'
	}
};

export const styleOverrides = writable<{ [key: string]: string }>({
	'--article-gap': '',
	'--article-max-width': '',
	'--paragraph-margin-top': '2em'
});
