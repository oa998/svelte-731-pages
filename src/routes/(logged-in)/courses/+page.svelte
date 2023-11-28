<script lang="ts">
	import CourseSummary from '$components/course-summary.svelte';
	import Header from '$components/header.svelte';
	import { getAllCourses, type Course } from '$lib/articles';
	import Icon from '@iconify/svelte';
	import { onMount } from 'svelte';

	let coursePromise: Promise<Course[]> = Promise.resolve([]);

	onMount(() => {
		coursePromise = getAllCourses().then((_courses) => {
			console.log('_courses', _courses);
			return _courses;
		});
	});
</script>

<div class="bg">
	<Header />
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
		background-color: #271c7d;
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 2000 1500'%3E%3Cdefs%3E%3CradialGradient id='a' cx='1000' cy='750' r='50.7%25' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%230059a3'/%3E%3Cstop offset='1' stop-color='%23271C7D'/%3E%3C/radialGradient%3E%3ClinearGradient id='b' gradientUnits='objectBoundingBox' x1='0' y1='0' x2='1' y2='0'%3E%3Cstop offset='0' stop-color='%23048AAF' /%3E%3Cstop offset='0.35' stop-color='%230059a3' stop-opacity='0.5'/%3E%3C/linearGradient%3E%3ClinearGradient id='b2' gradientUnits='objectBoundingBox' x1='1' y1='0' x2='0' y2='0'%3E%3Cstop offset='0' stop-color='%23048AAF'/%3E%3Cstop offset='0.35' stop-color='%230059a3' stop-opacity='0.5'/%3E%3C/linearGradient%3E%3ClinearGradient id='c' gradientUnits='objectBoundingBox' x1='0.5' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%23048AAF'/%3E%3Cstop offset='0.5' stop-color='%230059a3' stop-opacity='0.5'/%3E%3C/linearGradient%3E%3ClinearGradient id='c2' gradientUnits='objectBoundingBox' x1='0.5' y1='1' x2='1' y2='0'%3E%3Cstop offset='0' stop-color='%23048AAF'/%3E%3Cstop offset='0.5' stop-color='%230059a3' stop-opacity='0.5'/%3E%3C/linearGradient%3E%3CradialGradient id='d' cx='1000' cy='750' r='50.2%25' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0.5' stop-color='%23a00070' stop-opacity='0.5'/%3E%3Cstop offset='1' stop-color='%23E00B43'/%3E%3C/radialGradient%3E%3C/defs%3E%3Crect fill='url(%23a)' width='2000' height='1500'/%3E%3Cg fill-opacity='0.7'%3E%3Cpath fill='url(%23b)' d='M2035 1550h-950c0 0 202-1600 950-1600h0V1550z'/%3E%3Cpath fill='url(%23b2)' d='M-35 1550L-35 1550l0-1600h950C915-50 713 1550-35 1550z'/%3E%3Cpath fill='url(%23c)' d='M2035 1550L2035 1550l-2070 0V815.7C-35 815.7 2035 971.8 2035 1550z'/%3E%3Cpath fill='url(%23c2)' d='M2035-50v734.3c0 0-2070-156.1-2070-734.3v0H2035z'/%3E%3C/g%3E%3Crect fill-opacity='0.7' fill='url(%23d)' width='2000' height='1500'/%3E%3C/svg%3E");
		background-attachment: fixed;
		background-size: cover;
		@apply w-full h-full;
	}
	.flexgrid {
		grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
		@apply grid gap-10 px-5 max-w-7xl m-auto justify-items-center;
	}
</style>
