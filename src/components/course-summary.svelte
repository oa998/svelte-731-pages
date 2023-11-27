<script lang="ts">
	import { base } from '$app/paths';
	import type { Course } from '$lib/articles';
	import { session } from '$stores/session';

	export let course: Course;
	let cardWidth: number;
</script>

<div class="outer" bind:clientWidth={cardWidth}>
	<div
		class="bg-image"
		style={`background-image: url(${course.image}); padding-top: ${(cardWidth / 4) * 3}px`}
	/>
	<div class="summary p-family">
		<h1 class="h-family">{course.title}</h1>
		<div>{course.summary}</div>

		{#if $session.loggedIn}
			<a
				href={`${base}/course/${course.courseId}`}
				class="m-auto block text-white border border-white bg-lime-800 py-3 px-8 rounded-lg w-fit"
				>Start Course</a
			>
		{:else}
			<a
				href={`${base}/login`}
				class="m-auto block text-white border border-white bg-blue-500 py-3 px-8 rounded-lg w-fit"
				>Login to Enroll</a
			>
		{/if}
	</div>
</div>

<style lang="postcss">
	.outer {
		max-height: 80lvh;
		background: linear-gradient(to bottom, transparent, var(--rich-black));
		@apply max-w-xl w-full rounded-lg flex flex-col relative overflow-y-scroll;
	}
	.bg-image {
		aspect-ratio: 4/3;
		width: 100%;
		height: auto;
		background-size: cover;
		background-repeat: no-repeat;
		background-position: center center;
		position: sticky;
		top: 0;
	}
	.overlay {
		height: 100%;
		background: linear-gradient(to bottom, transparent 60%, var(--rich-black));
	}
	h1 {
		color: var(--lemon-chiffon);
		@apply font-bold text-3xl w-full text-center py-2 z-10;
	}
	.summary {
		background: linear-gradient(to bottom, transparent, var(--rich-black) 40px);
		top: -40px;
		@apply text-white p-6 text-base whitespace-pre-wrap font-thin relative;
	}
</style>
