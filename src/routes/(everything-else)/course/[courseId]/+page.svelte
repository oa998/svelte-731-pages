<script lang="ts">
	import { page } from '$app/stores';
	import Article from '$components/article.svelte';
	import MarkdownSection from '$components/markdown-section.svelte';
	import { getAllChapters, getCourse, type Chapter, type Course } from '$lib/courses';
	import { customMarked } from '$lib/marked-custom';
	import { onMount } from 'svelte';

	type ChapterEnriched = Chapter & {
		anchors: { text: string; href: string }[];
	};

	let courseId = $page.params.courseId;
	let markdown: string;
	let videoURL: string | undefined;
	let chapters: ChapterEnriched[] = [];
	let course: Course = { title: '', courseId: '', markdown: '' };
	let chapterId: string;
	let showChapters = true;
	let screenWidth: number;

	onMount(() => {
		getCourse(courseId).then((_course) => {
			course = _course;
		});

		getAllChapters(courseId).then((_chapters) => {
			chapters = _chapters
				.map((c) => {
					const div = document.createElement('div');
					div.innerHTML = customMarked.parse(c.markdown);
					const anchors = [...div.querySelectorAll('a[class="anchor"]')].map((a) => {
						return {
							text: a.getAttribute('name') || '',
							href: a.getAttribute('href') || ''
						};
					});
					return {
						...c,
						anchors
					};
				})
				.sort((a, b) => a.sequence - b.sequence);
			chapters = chapters;
			chapterId = chapters[0].chapterId;
		});
	});

	$: _scroll = (href: string) => {
		document
			.querySelector(`a[href="${href}"]`)
			?.scrollIntoView({ behavior: 'smooth', block: 'start' });
	};

	$: if (chapterId) {
		const chapter = chapters.find((c) => c.chapterId === chapterId)!;
		({ markdown, videoURL } = chapter);
	}

	$: if (screenWidth > 640) showChapters = true;
</script>

<div id="pg" bind:clientWidth={screenWidth}>
	<input
		type="checkbox"
		name="show-chapters"
		id="show-chapters"
		bind:checked={showChapters}
		hidden
	/>
	<label for="show-chapters">{showChapters ? 'Hide' : 'Show'} Chapters</label>
	<aside id="sidebar">
		<span class="subtitle">Course:</span>
		<div id="course-title">{course.title}</div>
		<span class="subtitle">Chapters:</span>
		<div id="chapters-container">
			{#each chapters as chapter, i (chapter.chapterId)}
				<button
					on:click|preventDefault={() => {
						chapterId = chapter.chapterId;
					}}
					class="details"
				>
					<div class="summary">{i + 1}. {chapter.title}</div>
				</button>
				<div class={`summary-content ${chapterId == chapter.chapterId ? 'open' : 'close'}`}>
					<ul>
						{#each chapter.anchors as anchor}
							<li>
								<button class="hover:underline" on:click={() => _scroll(anchor.href)}
									>{anchor.text}</button
								>
							</li>
						{/each}
					</ul>
				</div>
			{/each}
		</div>
	</aside>
	<div id="article">
		<Article>
			{#if videoURL}
				{#key videoURL}
					<!-- svelte-ignore a11y-media-has-caption -->
					<video
						class="w-full z-0 pt-5"
						oncontextmenu="return false;"
						id="my-video-player"
						controls
						controlsList="nodownload"
					>
						<source src={videoURL} />
					</video>
				{/key}
			{/if}
			{#if markdown}
				<MarkdownSection {markdown} />
			{:else}
				<div class="text-white">Loading....</div>
			{/if}
		</Article>
	</div>
</div>

<style lang="postcss">
	#pg {
		display: grid;
		gap: 10px;
		min-height: calc(100lvh);
		max-height: calc(100lvh);
		width: 100vw;
		@apply max-h-[100lvh];
	}
	label[for='show-chapters'] {
		background: color-mix(in srgb, blue 90%, transparent);
		@apply py-1 text-white text-center absolute bottom-0 left-0 z-20 w-full;
	}
	label[for='show-chapters']:active {
		background: color-mix(in srgb, blue 60%, transparent);
	}
	input#show-chapters:not(:checked) ~ aside#sidebar {
		transform: translateX(-100vw);
		position: absolute;
		top: 0;
	}
	input#show-chapters:not(:checked) ~ #article {
		grid-column-start: span 2;
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

	@media (min-width: 768px) {
		label[for='show-chapters'] {
			@apply hidden;
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
		@apply flex flex-col gap-1 sticky top-0 overflow-scroll max-h-[90lvh];
	}
	aside#sidebar::-webkit-scrollbar {
		display: none;
	}

	#article {
		@apply pb-20 overflow-y-scroll max-h-[90lvh];
	}

	#course-title {
		color: white;
		text-shadow: 0 0 1px purple, 0 0 3px purple, 0 0 5px purple;
		@apply px-2 py-5 font-bold text-xl;
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

	.close {
		transition: max-height 200ms linear, padding 200ms linear, opacity 200ms linear;
		max-height: 0;
		opacity: 0;
		overflow: hidden;
	}
	.open:has(ul li) {
		transition: max-height 600ms ease, opacity 500ms ease, padding 400ms ease;
		opacity: 1;
		max-height: 100%;
		@apply py-3;
	}

	li {
		list-style: disc;
	}

	.summary-content {
		background: rgba(255, 255, 255, 0.2);
		@apply pl-5 text-white;
	}

	.summary {
		color: black;
		background: white;
		@apply py-5 pl-5 cursor-pointer;
	}

	button.details:has(+ .summary-content.open) > .summary {
		background: linear-gradient(70deg, whitesmoke 90%, #eb6a9f 90%, #a9295e);
	}

	.summary-content button {
		@apply text-white italic text-left text-sm py-1 font-thin font-sans;
	}
</style>
