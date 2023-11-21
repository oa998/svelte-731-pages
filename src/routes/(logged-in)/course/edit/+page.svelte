<script lang="ts">
	import ChapterEditForm from '$components/chapter-edit-form.svelte';
	import CourseEditForm from '$components/course-edit-form.svelte';
	import ImageSheet from '$components/image-sheet.svelte';
	import { getAllChapters, getAllCourses, type Chapter, type Course } from '$lib/articles';
	import { toastErrorCatch } from '$lib/toast';
	import { onMount } from 'svelte';

	let courseId: string;
	let chapter: Chapter | undefined;
	let chapters: Chapter[] = [];
	let course: Course | undefined;
	let chapterId: string;
	let courses: Course[] = [];

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

	const refreshCourses = () =>
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
			.catch(toastErrorCatch);

	onMount(() => {
		refreshCourses();
	});

	const refreshChapters = async (courseId: string) => {
		if (course.fake) {
			chapters = [];
		} else {
			await getAllChapters(courseId).then((_chapters) => {
				chapters = _chapters;
			});
		}
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
	<aside id="sidebar">
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
	</aside>
	{#if chapters}
		<aside id="sidebar">
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
		</aside>
	{/if}
	{#if course}
		<div class="edit-column">
			<CourseEditForm {course} on:course-updated={refreshCourses} minimize={!!chapter} />
			{#if chapter}
				<ChapterEditForm
					{courseId}
					{chapter}
					on:chapter-updated={() => refreshChapters(courseId)}
					minimize={!chapter}
				/>
			{/if}
		</div>
	{/if}
</div>
<ImageSheet open />

<div class="py-[200px]">{courseId}</div>

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

	#pg {
		grid-template-columns: 1fr 1fr 3fr;
	}

	aside#sidebar {
		background: color-mix(in srgb, var(--rich-black) 30%, transparent);
		/* filter: blur(2px); */
		max-height: 100dvh;
		@apply flex flex-col gap-1 sticky top-0 overflow-scroll;
	}
	aside#sidebar::-webkit-scrollbar {
		display: none;
	}

	.edit-column {
		max-height: 100dvh;
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
