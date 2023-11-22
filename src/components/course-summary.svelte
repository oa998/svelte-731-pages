<script lang="ts">
	import type { Course } from '$lib/articles';

	export let course: Course;
</script>

<div class="outer">
	<div class="bg-image" style={`background-image: url(${course.image})`}>
		<div class="overlay">
			<h1 class="h-family">{course.title}</h1>
		</div>
	</div>
	<div class="summary p-family">
		{course.summary}
	</div>
</div>

<style lang="postcss">
	.outer {
		@apply max-w-xl w-full bg-white rounded-lg flex flex-col relative overflow-hidden;
	}
	.bg-image {
		z-index: 20;
		aspect-ratio: 4/3;
		width: 100%;
		height: auto;
		background-size: cover;
		background-repeat: no-repeat;
		background-position: center center;
		position: relative;
	}
	.overlay {
		height: 100%;
		background: linear-gradient(to bottom, transparent 60%, var(--rich-black));
	}
	h1 {
		color: var(--lemon-chiffon);
		@apply font-bold text-3xl w-full text-center py-2 z-10 absolute bottom-0;
	}
	.summary {
		background: var(--rich-black);
		@apply text-white p-6 text-base whitespace-pre-wrap font-thin;
	}
</style>
