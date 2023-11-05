<script lang="ts">
	import { getAllChapters, getChapter, getCourse, postCourse, type Course } from '$lib/articles';
	import { toastErrorCatch, toastMsg } from '$lib/toast';
	import { onMount } from 'svelte';

	onMount(() => {
		getAllChapters('lashes').then((allChapters) => console.log({ allChapters }));
		getCourse('lashes').then((course) => console.log({ course }));
		getChapter('lashes', '2YzscsLXatdgDj1N0Eaj').then((chapter) => console.log({ chapter }));
	});

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
				e.currentTarget.reset();
			})
			.catch(toastErrorCatch);
	};
</script>

<div class="text-blue-50 text-3xl">hello</div>

<form on:submit|preventDefault={_createCourse} class="text-white bg-black flex flex-col">
	<input placeholder="courseId" id="courseId" name="courseId" type="text" required pattern="\S+" />
	<input placeholder="title" id="title" name="title" type="text" required pattern="\S+" />
	<textarea placeholder="markdown" id="markdown" name="markdown" cols={20} rows={50} required />
	<button type="submit">Save</button>
</form>

<style lang="postcss">
	form * {
		@apply bg-black text-white;
	}
</style>
