<script lang="ts">
	import type { Course } from '$lib/courses';
	import { onMount } from 'svelte';

	export let course: Course;
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
		<div class="flex justify-between gap-3">
			<form method="dialog">
				<button>Close</button>
			</form>
			<button class="bg-blue-800">Enroll</button>
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
		@apply w-full h-full absolute top-0 blur-sm bg-cover bg-no-repeat bg-center;
	}

	.outer h1 {
		color: var(--lemon-chiffon);
		@apply text-3xl w-full text-center py-2 z-10 absolute bottom-1 font-sans font-thin;
	}
	dialog div button {
		@apply border border-white py-1 px-4 rounded;
	}
	dialog::backdrop {
		@apply bg-pink-900 bg-opacity-50;
	}
</style>
