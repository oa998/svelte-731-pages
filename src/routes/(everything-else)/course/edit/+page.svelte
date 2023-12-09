<script lang="ts">
	import ChapterEditForm from '$components/chapter-edit-form.svelte';
	import CourseEditForm from '$components/course-edit-form.svelte';
	import ImageSheet from '$components/image-sheet.svelte';
	import { getAllChapters, getAllCourses, type Chapter, type Course } from '$lib/courses';
	import Icon from '@iconify/svelte';
	import { onMount } from 'svelte';

	let courseId: string;
	let chapter: Chapter | undefined;
	let chapters: Chapter[] = [];
	let course: Course | undefined;
	let chapterId: string;
	let courses: Course[] = [];
	let coursesLoading = true;
	let chaptersLoading = false;

	onMount(() => {});

	$: if (courseId !== undefined) {
		course = courses.find((c) => c.courseId === courseId)!;
	} else {
		course = undefined;
	}
	$: if (chapterId) {
		chapter = chapters.find((c) => c.chapterId === chapterId)!;
	} else {
		chapter = undefined;
	}

	const refreshCourses = () => {
		coursesLoading = true;
		getAllCourses()
			.then((_courses) => {
				courses = _courses.concat({
					courseId: 'crs_' + Math.floor(Math.random() * 9e9),
					title: 'NEW COURSE',
					summary: '',
					image: '',
					fake: true // fake denotes that it's just client-side and hasn't been saved yet
				});
			})
			.then(() => (coursesLoading = false));
	};

	onMount(() => {
		refreshCourses();
	});

	const refreshChapters = async (courseId: string) => {
		if (course?.fake) {
			chapters = [];
		} else {
			chaptersLoading = true;
			await getAllChapters(courseId).then((_chapters) => {
				chapters = _chapters;
			});
		}
		chaptersLoading = false;
		chapters = chapters.concat({
			chapterId: 'chap_' + Math.floor(Math.random() * 9e9),
			title: 'NEW CHAPTER',
			markdown:
				'# Put a header here\n\nBody text can be here.\n\nAn image even:\n\n![img](https://i.imgur.com/UDaCScY.png "image")\n\n- these are\n- items in\n- a bulleted list\n\n1. these\n1. are\n1. numbered',
			sequence: Math.max(...chapters.map((c) => c.sequence), 0) + 1
		});
	};

	$: if (courseId !== undefined) {
		refreshChapters(courseId);
	}
</script>

<div id="pg">
	<aside id="sidebar" class="darken-bg">
		<span class="subtitle">Courses:</span>
		<div id="chapters-container">
			{#each courses as course (course.courseId)}
				<button
					on:click={() => {
						courseId = course.courseId;
						chapterId = '';
					}}
					class="details"
				>
					<div class="summary" data-selected={courseId === course.courseId}>
						{course.title}
					</div>
				</button>
			{/each}
		</div>
		<div class="loader" hidden={!coursesLoading}>
			<Icon icon="eos-icons:loading" style="font-size:xx-large" color="white" />
		</div>
	</aside>
	<aside id="sidebar" class="darken-bg">
		{#if chapters}
			<span class="subtitle">Chapters:</span>
			<div id="chapters-container">
				{#each chapters.sort((a, b) => a.sequence - b.sequence) as chapter (chapter.chapterId)}
					<button
						on:click={() => {
							chapterId = chapter.chapterId;
						}}
						class="details"
					>
						<div class="summary" data-selected={chapterId === chapter.chapterId}>
							({chapter.sequence}) {chapter.title}
						</div>
					</button>
				{/each}
			</div>
		{/if}
		<div class="loader" hidden={!chaptersLoading}>
			<Icon icon="eos-icons:loading" style="font-size:xx-large" color="white" />
		</div>
	</aside>
	<div class="edit-column darken-bg">
		{#if course}
			<CourseEditForm {course} on:course-updated={refreshCourses} minimize={!!chapter} />
			{#if chapter}
				<ChapterEditForm
					{courseId}
					{chapter}
					on:chapter-updated={() => refreshChapters(courseId)}
					minimize={!chapter}
				/>
			{/if}
		{/if}
	</div>
	<div class="darken-bg">
		<ImageSheet open />
	</div>
</div>

<style lang="postcss">
	#pg {
		display: grid;
		gap: 10px;
		/* min-height: calc(100lvh);
		max-height: calc(100lvh); */
		width: 100vw;
		min-height: 90lvh;
		@apply h-full;
	}

	#pg {
		grid-template-columns: 1fr 1fr 3fr 1fr;
	}

	.darken-bg {
		background: color-mix(in srgb, var(--rich-black) 30%, transparent);
	}

	aside#sidebar {
		/* filter: blur(2px); */
		max-height: 100lvh;
		@apply flex flex-col gap-1 sticky top-0 overflow-scroll;
	}
	aside#sidebar::-webkit-scrollbar {
		display: none;
	}

	.loader {
		place-self: center;
	}

	.edit-column {
		max-height: 100lvh;
		@apply w-full flex flex-col gap-1 overflow-y-scroll;
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
		@apply mt-2 overflow-hidden w-full text-left relative;
	}

	button.details div[data-selected='true'] {
		@apply bg-green-400 border-t-4 border-b-4 border-green-700;
	}

	.summary {
		color: black;
		background: white;
		@apply p-3 cursor-pointer;
	}

	.summary::-webkit-details-marker {
		display: none;
	}
</style>
