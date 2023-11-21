import { writable } from 'svelte/store';

export const images = writable<{ link: string; id: string }[]>([
	{ link: 'https://i.imgur.com/ZgUXcG4.png', id: 'lkajslfkja' },
	{ link: 'https://i.imgur.com/ZgUXcG4.png', id: 'sf3fewg' },
	{ link: 'https://i.imgur.com/ZgUXcG4.png', id: 'lkajasf34slfkja' },
	{ link: 'https://i.imgur.com/ZgUXcG4.png', id: 'as' },
	{ link: 'https://i.imgur.com/ZgUXcG4.png', id: 'asdfasf32' },
	{ link: 'https://i.imgur.com/ZgUXcG4.png', id: 'fiuiwehf' },
	{ link: 'https://i.imgur.com/ZgUXcG4.png', id: '9io9uhb' }
]);
