<script lang="ts">
	import PreviewPage from '$components/preview-page.svelte';
	import { getAllChapters, getCourse, postCourse, type Course } from '$lib/articles';
	import { toastErrorCatch, toastMsg } from '$lib/toast';
	import Icon from '@iconify/svelte';
	import { onMount } from 'svelte';

	onMount(() => {
		getAllChapters('lashes').then((allChapters) => console.log({ allChapters }));
		getCourse('lashes').then((course) => console.log({ course }));
	});

	let preview = false;

	$: _createCourse = (
		e: Event & {
			readonly submitter: HTMLElement | null;
		} & {
			currentTarget: EventTarget & HTMLFormElement;
		}
	) => {
		const formdata = new FormData(e.currentTarget);

		const course: Course = {
			title: formdata.get('title') as string,
			markdown: formdata.get('markdown') as string,
			courseId: formdata.get('courseId') as string
		};
		postCourse(course)
			.then(() => {
				toastMsg(`Course ${course.courseId} created`);
				(e.target as HTMLFormElement).reset();
			})
			.catch(toastErrorCatch);
	};
</script>

<div class="text-blue-50 text-3xl">hello</div>

<form on:submit|preventDefault={_createCourse}>
	<div class="label-input">
		<label for="courseId">Course ID</label>
		<div class="flex flex-row">
			<input id="courseId" name="courseId" type="text" required pattern="^[^\s]+.*$" />
			<button
				class="icon-button"
				type="button"
				on:click={() => {
					preview = true;
					console.log({ preview });
				}}
			>
				<Icon icon="fad:random-1dice" style="font-size:x-large" />
			</button>
		</div>
	</div>
	<div class="label-input">
		<label for="title">Title</label>
		<input id="title" name="title" type="text" required pattern="^[^\s]+.*$" />
	</div>
	<div class="label-input">
		<label for="markdown">Summary</label>
		<textarea id="markdown" name="markdown" cols={20} rows={30} required />
	</div>
	<button type="submit">Save</button>
</form>

{#if preview}
	<PreviewPage open={preview} toggle={() => (preview = !preview)}>
		<div>This is preview stuff!</div>
	</PreviewPage>
{/if}

<style lang="postcss">
	form {
		@apply max-w-sm m-auto gap-1 text-white bg-black flex flex-col;
	}
	form input,
	form > button {
		@apply border border-white rounded bg-black text-white pl-1;
	}

	.label-input {
		@apply flex flex-col;
	}

	.icon-button {
		@apply flex justify-center items-center;
	}
</style>
