<script lang="ts">
	import { postChapter, type Chapter } from '$lib/articles';
	import { toastErrorCatch, toastMsg } from '$lib/toast';
	import Icon from '@iconify/svelte';
	import { createEventDispatcher } from 'svelte';
	import Article from './article.svelte';
	import MarkdownSection from './markdown-section.svelte';

	export let courseId: string;
	export let chapter: Chapter;
	let preview = false;
	let saving = false;
	export let minimize = false;

	let chapterId: string;
	let title: string;
	let markdown: string;
	let sequence: number;
	let videoURL: string;
	let dispatch = createEventDispatcher();

	$: if (chapter.chapterId !== chapterId) {
		chapterId = chapter.chapterId;
		title = chapter.title;
		markdown = chapter.markdown;
		sequence = chapter.sequence;
		videoURL = chapter.videoURL;
	}

	$: _save = (
		e: Event & {
			readonly submitter: HTMLElement | null;
		} & {
			currentTarget: EventTarget & HTMLFormElement;
		}
	) => {
		const chapter: Chapter = {
			chapterId,
			title,
			markdown,
			sequence,
			videoURL
		};
		saving = true;
		postChapter(courseId, chapter)
			.then(() => {
				toastMsg(`Chapter ${chapter.chapterId} updated`);
				dispatch('chapter-updated', chapter);
			})
			.catch(toastErrorCatch)
			.then(() => (saving = false));
	};
</script>

<form on:submit|preventDefault={_save}>
	<div class="header">
		<h1>Chapter Data</h1>
		<button on:click|preventDefault={() => (minimize = !minimize)}
			><Icon
				icon={minimize ? 'solar:maximize-bold' : 'solar:minimize-bold'}
				style="font-size:small"
			/></button
		>
	</div>
	{#if !minimize}
		<div class="form-grid">
			<label for="chapterId">ID</label>
			<div class="flex flex-row">
				<input id="chapterId" name="chapterId" type="text" bind:value={chapterId} disabled />
				<span class="text-white px-2 italic text-sm self-center">(Not editable)</span>
			</div>

			<label for="title">Title</label>
			<input id="title" name="title" type="text" required pattern="^[^\s]+.*$" bind:value={title} />

			<label for="sequence">Sequence</label>
			<input id="sequence" name="sequence" required type="number" min={0} bind:value={sequence} />

			<label for="videoURL">Video URL</label>
			<input id="videoURL" name="videoURL" type="text" pattern="^[^\s]+.*$" bind:value={videoURL} />

			<label for="markdown">Markdown</label>
			<textarea
				id="markdown"
				name="markdown"
				class="outline-none p-1"
				cols={20}
				rows={16}
				required
				on:paste={(v) =>
					setTimeout(() => {
						markdown = markdown.trim();
					})}
				bind:value={markdown}
			/>
		</div>
		<div class="flex flex-row w-full justify-end gap-5 py-2 px-5">
			<button on:click|preventDefault={() => (preview = !preview)}>Preview</button>
			<button type="submit" disabled={saving}
				>Save {#if saving} <Icon icon="eos-icons:loading" style="font-size: small" /> {/if}</button
			>
		</div>
		{#if preview}
			<div class="preview">
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
					<MarkdownSection {markdown} />
				</Article>
			</div>
		{/if}
	{/if}
</form>

<style lang="postcss">
	form {
		background: color-mix(in srgb, var(--rich-black) 30%, transparent);
		max-height: 95lvh;
		@apply max-w-4xl overflow-y-scroll;
	}

	.header {
		background: linear-gradient(to right, var(--rich-black), transparent);
		@apply flex flex-row justify-between sticky top-0 z-30;
	}

	.header h1 {
		text-shadow: 0 0 1px purple, 0 0 3px purple, 0 0 5px purple;
		@apply text-sm font-thin italic text-white pl-5 flex flex-row justify-between;
	}

	.header button {
		@apply bg-transparent text-white bg-black;
	}

	label {
		@apply px-4 text-right text-white;
	}

	.form-grid {
		grid-template-columns: max-content 3fr;
		@apply grid gap-2 py-2 px-5;
	}

	button {
		@apply px-2 bg-blue-400 rounded flex flex-row gap-2 flex-nowrap items-center;
	}

	button[type='submit'] {
		@apply bg-green-400;
	}

	button:disabled {
		@apply bg-opacity-80 text-gray-500;
	}

	.preview {
		@apply m-auto flex justify-center border border-white pb-20;
	}
</style>
