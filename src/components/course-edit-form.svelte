<script lang="ts">
	import { postCourse, type Course } from '$lib/articles';
	import { toastErrorCatch, toastMsg } from '$lib/toast';
	import Icon from '@iconify/svelte';
	import { createEventDispatcher } from 'svelte';
	import CourseSummary from './course-summary.svelte';

	export let course: Course;
	let preview = false;
	let saving = false;
	export let minimize = false;

	let courseId: string;
	let title: string;
	let summary: string;
	let image: string = 'https://i.imgur.com/ZgUXcG4.png';
	let dispatch = createEventDispatcher();

	$: if (course.courseId !== courseId) {
		courseId = course.courseId;
		title = course.title;
		summary = course.summary;
		image = course.image || 'https://i.imgur.com/ZgUXcG4.png';
	}

	$: _save = (
		e: Event & {
			readonly submitter: HTMLElement | null;
		} & {
			currentTarget: EventTarget & HTMLFormElement;
		}
	) => {
		saving = true;
		const course: Course = {
			title,
			summary,
			courseId,
			image
		};
		postCourse(course)
			.then(() => {
				toastMsg(`Course ${course.courseId} updated`);
				dispatch('course-updated', course);
			})
			.catch(toastErrorCatch)
			.then(() => (saving = false));
	};
</script>

<form on:submit|preventDefault={_save}>
	<div class="header">
		<h1>Course Data</h1>
		<button on:click|preventDefault={() => (minimize = !minimize)}
			><Icon
				icon={minimize ? 'solar:maximize-bold' : 'solar:minimize-bold'}
				style="font-size:small"
			/></button
		>
	</div>
	{#if !minimize}
		<div class="form-grid">
			<label for="courseId">ID</label>
			<div class="flex flex-row">
				<input id="courseId" name="courseId" type="text" bind:value={courseId} disabled />
				<span class="text-white px-2 italic text-sm self-center">(Not editable)</span>
			</div>

			<label for="title">Title</label>
			<input id="title" name="title" type="text" required pattern="^[^\s]+.*$" bind:value={title} />

			<label for="image">Image URL</label>
			<input id="image" name="image" required pattern="^[^\s]+.*$" bind:value={image} />

			<label for="summary">Summary</label>
			<textarea
				id="summary"
				name="summary"
				class="outline-none p-1"
				cols={20}
				rows={8}
				required
				on:paste={(v) =>
					setTimeout(() => {
						summary = summary.trim();
					})}
				bind:value={summary}
			/>
		</div>
		<div class="flex flex-row w-full justify-end gap-5 py-2 px-5">
			<button on:click|preventDefault={() => (preview = !preview)}>Preview</button>
			<button type="submit" disabled={saving}
				>Save {#if saving} <Icon icon="eos-icons:loading" /> {/if}</button
			>
		</div>
		{#if preview}
			<div class="preview">
				<CourseSummary
					course={{
						courseId,
						image,
						summary,
						title
					}}
				/>
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
		@apply m-auto flex justify-center pb-20;
	}
</style>
