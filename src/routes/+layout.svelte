<script>
	import { browser } from '$app/environment';
	import { applyToken } from '$stores/session';
	import '@fontsource-variable/hepta-slab';
	import '@fontsource-variable/quicksand';
	import { SvelteToast } from '@zerodevx/svelte-toast';
	import '../app.css';

	if (browser && /(:\W|^)token=/.test(document.cookie)) {
		const token = /(?:\b|^)token=([^;]+)/.exec(document.cookie)?.[1] || '';
		applyToken(token);
	}
</script>

<slot />
<SvelteToast options={{ reversed: true, intro: { y: 192 } }} />

<style lang="postcss">
	:root {
		--toastContainerTop: auto;
		--toastContainerRight: 10px;
		--toastContainerBottom: 10px;
		--toastBarHeight: 0;
	}
</style>
