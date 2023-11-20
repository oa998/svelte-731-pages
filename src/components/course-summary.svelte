<script lang="ts">
	import type { Course } from '$lib/articles';

	export let course: Course;
</script>

<div class="outer">
	<div class="bg-image" style={`background-image: url(${course.image})`}>
		<div class="overlay">
			<h1>{course.title}</h1>
		</div>
	</div>
	<div class="summary">{course.summary}</div>
</div>

<style lang="postcss">
	.outer {
		@apply max-w-xl w-full bg-white rounded-lg flex flex-col relative overflow-hidden;
	}
	img {
		@apply w-full z-0;
	}
	.bg-image {
		z-index: 20;
		/* background: linear-gradient(to bottom, orange, black); */
		width: 100%;
		height: 300px;
		background-size: cover;
		background-repeat: no-repeat;
		background-position: center center;
		position: relative;
	}
	.overlay {
		height: 100%;
		background: linear-gradient(to bottom, transparent, var(--rich-black));
	}
	h1 {
		font-family: 'Lobster', sans-serif;
		color: var(--lemon-chiffon);
		@apply font-bold text-3xl w-full text-center py-2 z-10 absolute bottom-0;
	}
	.summary {
		font-family: sans-serif;
		background: var(--rich-black);
		@apply text-white text-left z-10 p-6;
	}
</style>
