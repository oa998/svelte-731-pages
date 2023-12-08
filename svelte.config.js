import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/kit/vite'; // for tailwind

export default {
	kit: {
		adapter: adapter({
			// default options are shown. On some platforms
			// these options are set automatically — see below
			pages: 'build',
			assets: 'build',
			fallback: undefined,
			precompress: false,
			strict: true
		}),
		alias: {
			// this will match a file
			'$components/*': 'src/components',
			'$stores/*': 'src/stores'
		},
		paths: {
			// base: '/svelte-731-pages'
		}
	},
	preprocess: vitePreprocess()
};
