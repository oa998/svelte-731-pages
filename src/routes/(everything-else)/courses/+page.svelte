<script lang="ts">
	import CourseSummary from '$components/course-summary.svelte';
	import { getAllCourses, type Course } from '$lib/courses';
	import Icon from '@iconify/svelte';
	import { onMount } from 'svelte';

	let coursePromise: Promise<Course[]> = Promise.resolve([]);

	onMount(() => {
		coursePromise = getAllCourses().then((_courses) => {
			return _courses || [];
		});
	});
</script>

<div class="bg">
	<div class="text-white font-sans text-5xl text-center py-6">Courses Overview</div>
	<div>
		{#await coursePromise}
			<div
				class="text-3xl font-sans flex flex-row text-white gap-6 w-full justify-center absolute top-1/2 bg-black items-center py-3"
			>
				Loading
				<Icon icon="eos-icons:loading" color="white" />
			</div>
		{:then courses}
			<div class="flexgrid">
				{#each courses as course (course.courseId)}
					<CourseSummary {course} />
				{/each}
				{#each courses as course (course.courseId)}
					<CourseSummary {course} />
				{/each}
			</div>
		{:catch error}
			<div>An error occurred {error}</div>
		{/await}
	</div>
	<div class="py-[100px]" />
</div>

<style lang="postcss">
	.bg {
		overflow-x: hidden;
		overflow-y: scroll;
		@apply w-full h-full;
	}
	.flexgrid {
		grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
		@apply grid gap-10 px-5 max-w-7xl m-auto justify-items-center;
	}
</style>
