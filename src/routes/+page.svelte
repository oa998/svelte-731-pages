<script lang="ts">
	import { getAllChapters, getChapter, getCourse } from '$lib/articles';
	import { onMount } from 'svelte';

	onMount(() => {
		getAllChapters('lashes').then((allChapters) => console.log({ allChapters }));
		getCourse('lashes').then((course) => console.log({ course }));
		getChapter('lashes', '2YzscsLXatdgDj1N0Eaj').then((chapter) => console.log({ chapter }));
	});
</script>

<div class="text-blue-50 text-3xl">hello</div>
