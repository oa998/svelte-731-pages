<script>
	import { applyFromSessionStorage } from '$stores/session';
	import { onMount } from 'svelte';
	onMount(() => {
		applyFromSessionStorage();
		console.log('mounting non-auth layout');
	});
</script>

<slot />

<style lang="postcss">
	:root {
		--toastContainerTop: auto;
		--toastContainerRight: 10px;
		--toastContainerBottom: 10px;
		--toastBarHeight: 0;
	}
</style>
