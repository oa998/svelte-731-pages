<script lang="ts">
	import { getAllCourses, postCourse, type Course } from '$lib/courses';
	import Icon from '@iconify/svelte';
	import { onMount } from 'svelte';
	import { toastErrorCatch, toastErrorMsg } from './../../../../lib/toast.ts';

	let courses: Course[] = [];
	let loading = true;

	onMount(() => {
		getAllCourses()
			.then((_courses) => {
				courses = _courses as Course[];
			})
			.catch(toastErrorCatch)
			.then(() => (loading = false));
	});
</script>

<div class="text-white max-w-2xl m-auto flex flex-col">
	{#if loading}
		<div
			class="text-3xl font-sans flex flex-row text-white gap-6 w-full justify-center absolute top-1/2 bg-black items-center py-3"
		>
			Loading
			<Icon icon="eos-icons:loading" color="white" />
		</div>
	{:else}
		<div class="flex flex-col gap-10 pt-10">
			{#each courses as course}
				<div class="flex flex-col gap-3">
					<div class="font-bold">{course.title}</div>
					{#each course.users || ['bob', 'tim', 'tony'] as user}
						<div class="pl-3">
							<div class="flex flex-row gap-3 border border-white items-center">
								<button class="w-[100px] bg-red-500 text-black p-2 text-xs">Remove</button>
								<div>{user}</div>
							</div>
						</div>
					{/each}
					<div class="pl-3">
						<div class="flex flex-row gap-3 border border-white items-center">
							<button
								class="w-[100px] bg-green-500 text-black p-2 text-xs"
								on:click={() => {
									const name = document.getElementById(`add_name_${course.courseId}`).value;
									if (!name) {
										toastErrorMsg('No name provided');
										return;
									}
									const updatedCourse = {
										...course,
										users: [...new Set((course.users || []).concat(name))]
									};
									loading = true;
									postCourse(updatedCourse)
										.catch(toastErrorCatch)
										.then(() => (loading = false));
								}}>Add</button
							>
							<input type="text" id={`add_name_${course.courseId}`} class="text-black w-[300px]" />
						</div>
					</div>
				</div>
				<hr />
			{/each}
		</div>
	{/if}
</div>
