<script lang="ts">
	import CourseSummary from '$components/course-summary.svelte';
	import Header from '$components/header.svelte';
	import { getAllCourses, type Course } from '$lib/articles';
	import { onMount } from 'svelte';

	let courses: Course[] = [];
	let course: Course;

	onMount(() => {
		getAllCourses().then((_courses) => {
			console.log('_courses', _courses);
			courses = _courses;
			if (_courses.length) {
				course = courses[0];
			}
		});
	});
</script>

<div id="pg">
	<aside id="sidebar">
		<Header />
		<div class="text-white h-family text-3xl text-center">Courses Overview</div>
		<span class="subtitle">Courses:</span>
		<div id="chapters-container">
			{#each courses as _course (_course.courseId)}
				<button
					on:click|preventDefault={() => {
						course = _course;
					}}
					class={`details ${course.courseId == _course.courseId ? 'open' : 'closed'}`}
					><div class="summary">{_course.title}</div>
				</button>
			{/each}
		</div>
	</aside>
	<div id="summary">
		{#if course}
			{#key course.courseId}
				<CourseSummary {course} />
			{/key}
		{/if}
	</div>
</div>
<div class="py-[200px]" />

<style lang="postcss">
	#pg {
		display: grid;
		gap: 10px;
		min-height: calc(100dvh);
		max-height: calc(100dvh);
		width: 100vw;
		background-color: #271c7d;
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 2000 1500'%3E%3Cdefs%3E%3CradialGradient id='a' cx='1000' cy='750' r='50.7%25' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%230059a3'/%3E%3Cstop offset='1' stop-color='%23271C7D'/%3E%3C/radialGradient%3E%3ClinearGradient id='b' gradientUnits='objectBoundingBox' x1='0' y1='0' x2='1' y2='0'%3E%3Cstop offset='0' stop-color='%23048AAF' /%3E%3Cstop offset='0.35' stop-color='%230059a3' stop-opacity='0.5'/%3E%3C/linearGradient%3E%3ClinearGradient id='b2' gradientUnits='objectBoundingBox' x1='1' y1='0' x2='0' y2='0'%3E%3Cstop offset='0' stop-color='%23048AAF'/%3E%3Cstop offset='0.35' stop-color='%230059a3' stop-opacity='0.5'/%3E%3C/linearGradient%3E%3ClinearGradient id='c' gradientUnits='objectBoundingBox' x1='0.5' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%23048AAF'/%3E%3Cstop offset='0.5' stop-color='%230059a3' stop-opacity='0.5'/%3E%3C/linearGradient%3E%3ClinearGradient id='c2' gradientUnits='objectBoundingBox' x1='0.5' y1='1' x2='1' y2='0'%3E%3Cstop offset='0' stop-color='%23048AAF'/%3E%3Cstop offset='0.5' stop-color='%230059a3' stop-opacity='0.5'/%3E%3C/linearGradient%3E%3CradialGradient id='d' cx='1000' cy='750' r='50.2%25' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0.5' stop-color='%23a00070' stop-opacity='0.5'/%3E%3Cstop offset='1' stop-color='%23E00B43'/%3E%3C/radialGradient%3E%3C/defs%3E%3Crect fill='url(%23a)' width='2000' height='1500'/%3E%3Cg fill-opacity='0.7'%3E%3Cpath fill='url(%23b)' d='M2035 1550h-950c0 0 202-1600 950-1600h0V1550z'/%3E%3Cpath fill='url(%23b2)' d='M-35 1550L-35 1550l0-1600h950C915-50 713 1550-35 1550z'/%3E%3Cpath fill='url(%23c)' d='M2035 1550L2035 1550l-2070 0V815.7C-35 815.7 2035 971.8 2035 1550z'/%3E%3Cpath fill='url(%23c2)' d='M2035-50v734.3c0 0-2070-156.1-2070-734.3v0H2035z'/%3E%3C/g%3E%3Crect fill-opacity='0.7' fill='url(%23d)' width='2000' height='1500'/%3E%3C/svg%3E");
		background-attachment: fixed;
		background-size: cover;
		@apply fixed top-0;
	}

	@media (max-width: 640px) {
		#pg {
			grid-template-columns: 1fr;
			grid-template-rows: 100vh 1fr;
		}
	}
	@media (min-width: 640px) {
		#pg {
			grid-template-columns: minmax(300px, 1fr) 3fr;
		}
	}

	@media (max-width: 768px) {
		aside#sidebar {
			transition: transform 0.2s linear;
			position: absolute;
			top: 0;
		}
	}

	aside#sidebar {
		background: color-mix(in srgb, var(--rich-black) 30%, transparent);
		max-height: 100dvh;
		@apply flex flex-col gap-1 sticky top-0 overflow-scroll;
	}
	aside#sidebar::-webkit-scrollbar {
		display: none;
	}

	#summary {
		@apply grid place-self-center max-w-lg;
	}

	.subtitle {
		background: linear-gradient(to right, var(--rich-black), transparent);
		text-shadow: 0 0 1px purple, 0 0 3px purple, 0 0 5px purple;
		@apply text-sm font-thin italic text-white pl-5;
	}

	#chapters-container {
		@apply pb-20;
	}

	button.details {
		@apply mt-2 overflow-hidden w-full text-left;
	}

	.summary {
		color: black;
		background: white;
		@apply py-5 pl-5 cursor-pointer;
	}

	button.details.open > .summary {
		background: linear-gradient(70deg, whitesmoke 90%, #eb6a9f 90%, #a9295e);
	}
</style>
