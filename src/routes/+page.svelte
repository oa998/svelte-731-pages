<script lang="ts">
	import { getAllChapters } from '$lib/articles';
	import { onMount } from 'svelte';

	onMount(() => getAllChapters('lashes').then((r) => console.log({ r })));
</script>

<div class="text-blue-50 text-3xl">hello</div>
