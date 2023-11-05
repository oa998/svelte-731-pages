<script>
	import { SvelteToast } from '@zerodevx/svelte-toast';
	import '../app.css';
</script>

<slot />
<SvelteToast options={{ reversed: true, intro: { y: 192 } }} />

<style>
	:root {
		--toastContainerTop: auto;
		--toastContainerRight: 10px;
		--toastContainerBottom: 10px;
		--toastBarHeight: 0;
	}
</style>
