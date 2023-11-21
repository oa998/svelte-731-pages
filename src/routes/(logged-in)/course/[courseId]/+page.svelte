<script lang="ts">
	import { page } from '$app/stores';
	import Article from '$components/article.svelte';
	import Header from '$components/header.svelte';
	import MarkdownSection from '$components/markdown-section.svelte';
	import { getAllChapters, getCourse, type Chapter, type Course } from '$lib/articles';
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
			chapters = _chapters.map((c) => {
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
			});
			chapters = chapters;
			chapterId = _chapters[0].chapterId;
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
		<Header />
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
					{#each chapter.anchors as anchor}
						<div>
							<button on:click={() => _scroll(anchor.href)}>{anchor.text}</button>
						</div>
					{/each}
				</div>
			{/each}
		</div>
	</aside>
	<div id="article">
		<Article>
			<!-- svelte-ignore a11y-media-has-caption -->
			<div>{videoURL || 'no video url'}</div>
			<video
				class="w-full z-0"
				oncontextmenu="return false;"
				id="my-video-player"
				controls
				controlsList="nodownload"
			>
				<source src={videoURL} />
			</video>
			{#if markdown}
				<MarkdownSection {markdown} />
			{:else}
				<div class="text-white">Loading....</div>
			{/if}
		</Article>
	</div>
</div>
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
		max-height: 100dvh;
		@apply flex flex-col gap-1 sticky top-0 overflow-scroll;
	}
	aside#sidebar::-webkit-scrollbar {
		display: none;
	}

	#article {
		@apply pb-20 overflow-y-scroll max-h-[100dvh];
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
	.open {
		transition: max-height 600ms ease, opacity 500ms ease, padding 400ms ease;
		opacity: 1;
		max-height: 100%;
		@apply py-3;
	}

	.summary-content {
		background: rgba(255, 255, 255, 0.2);
		@apply pl-5 text-white;
	}

	.summary {
		list-style: none;
		color: black;
		background: white;
		@apply py-5 pl-5 cursor-pointer;
	}

	button.details:has(+ .summary-content.open) > .summary {
		background: linear-gradient(70deg, whitesmoke 90%, #eb6a9f 90%, #a9295e);
	}

	.summary::-webkit-details-marker {
		display: none;
	}

	.summary-content button {
		@apply underline text-blue-100 italic;
	}
</style>
