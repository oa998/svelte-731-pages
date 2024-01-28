<script lang="ts">
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import type { Course } from '$lib/courses';
	import { session } from '$stores/session';
	import { onMount } from 'svelte';

	export let course: Course;
	export let previewMode = false;
	let modalRef: HTMLDialogElement;

	onMount(() => {
		if (modalRef) {
			const closeModal: (e: MouseEvent) => void = (e) => {
				const dialogDimensions = modalRef.getBoundingClientRect();
				if (
					e.clientX < dialogDimensions.left ||
					e.clientX > dialogDimensions.right ||
					e.clientY < dialogDimensions.top ||
					e.clientY > dialogDimensions.bottom
				) {
					modalRef.close();
				}
			};

			modalRef.addEventListener('click', closeModal);

			return () => {
				modalRef.removeEventListener('click', closeModal);
			};
		}
	});
</script>

<button class="outer" on:click={() => modalRef.showModal()}>
	<div class="bg-img" style={`background-image: url(${course.image});`} />
	<img
		alt="img"
		src={course.image}
		class="object-contain object-center w-full h-auto absolute top-1/2 -translate-y-1/2"
	/>
	<!-- <div class="bg-image" style={`background-image: url(${course.image});`} /> -->
	<h1>{course.title}</h1>
</button>

<dialog
	bind:this={modalRef}
	class="z-10 rounded-xl bg-black bg-opacity-90 text-white max-h-[80lvh] overflow-scroll"
>
	<div class="m-auto max-w-md">
		<div class="w-full text-center text-3xl font-sans font-thin py-3" tabindex="-1">
			{course.title}
		</div>
		<div class="font-serif font-thin whitespace-pre-wrap">{course.summary}</div>
		<br />
		<div class="flex items-start justify-between gap-3">
			<form method="dialog">
				<button>Close</button>
			</form>
			<div class="flex flex-col text-right items-end">
				<button
					on:click={() => {
						if (previewMode) return;
						goto(`${base}/course/${course.courseId}`);
					}}
					disabled={!$session.courses.includes(course.courseId)}
					class="bg-blue-800 disabled:bg-gray-700 disabled:text-gray-500 disabled:cursor-not-allowed max-w-fit"
					>View</button
				>
				{#if !$session.courses.includes(course.courseId)}
					<span class="text-white text-xs bg-green-800 px-3"
						>Work with your instructor for access to this course.</span
					>
				{/if}
			</div>
		</div>
	</div>
</dialog>

<style lang="postcss">
	.outer {
		aspect-ratio: 1 / 1;
		max-height: 50lvh;
		@apply max-w-sm w-full rounded-lg relative overflow-hidden shadow-md shadow-black active:shadow-sm;
	}

	.bg-img {
		@apply w-full h-full absolute top-0 blur-sm bg-cover bg-no-repeat bg-center brightness-50;
	}

	.outer h1 {
		color: var(--lemon-chiffon);
		text-shadow: 0 0 5px black, 0 0 3px black, 0 0 1px black;
		@apply text-3xl w-full text-center py-2 z-10 absolute bottom-1 font-sans font-thin;
	}
	dialog div button {
		@apply border border-white py-1 px-4 rounded;
	}
	dialog::backdrop {
		@apply bg-pink-900 bg-opacity-50 overflow-hidden;
	}
</style>
