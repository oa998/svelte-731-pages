<script lang="ts">
	import FileDownload from '$components/file-download.svelte';
	import { studentApplicationUpload } from '$lib/api/open-fetch';
	import { writable } from 'svelte/store';
	import Modal from './../../../../../components/modal.svelte';
	import { toastErrorMsg } from './../../../../../lib/toast.ts';
	let sending = false;
	const studentFormUploaded = writable(false);
	const errors = writable<string[]>([]);
	let studentFormRef: HTMLFormElement;
	const uploadSuccess = writable(false);

	const submitForm = async (event: SubmitEvent) => {
		sending = true;
		const formData = new FormData(event.target as HTMLFormElement);
		studentApplicationUpload(formData)
			.then(async (r) => {
				if (r.status == 400) {
					const j = await r.json();
					$errors = j.errors;
				} else if (r.status == 201) {
					const bytes = await r.arrayBuffer();
					const blob = new Blob([bytes], { type: 'application/pdf' });
					const link = document.createElement('a');
					link.href = window.URL.createObjectURL(blob);
					const fileName = 'signed_application.pdf';
					link.download = fileName;
					link.click();
					studentFormRef.reset();
					$studentFormUploaded = false;
					$uploadSuccess = 'Application submitted. Thank You!';
				} else {
					toastErrorMsg(
						"Sorry, the file you uploaded doesn't match our application. Did you upload the wrong file?"
					);
				}
			})
			.finally(() => {
				sending = false;
			});
		sending = false;
	};

	const studentUpload = (e) => {
		$studentFormUploaded = !!e.target.value;
	};
</script>

<div class="flex flex-col gap-10">
	<div class=" text-white flex flex-col">
		<div class="text-4xl sm:text-6xl font-serif text-center font-extralight">Lash University</div>
		<div class="text-xl text-center">File Downloads</div>
	</div>

	<FileDownload
		filename="lash enrollment agreement.pdf"
		title="Student Enrollment Agreement"
		details={[
			'Click to download the Lash Student Enrollment Agreement.',
			'You can open it, fill it out, and then upload it at the bottom of the page.'
		]}
	/>

	<FileDownload
		filename="instructor enrollment agreement.pdf"
		title="Instructor Enrollment Agreement"
		details={[
			'Instructor Student Enrollment Agreement. Print, fill out, and return to the program administrator.'
		]}
	/>
	<hr />
	<div class="text-white text-xl text-center">File Uploads</div>
	<div class="rounded bg-gray-200 card-shadow shadow-black p-10">
		<div class="flex flex-col gap-2">
			<div class="font-bold text-xl">
				Upload <u>Student Enrollment Agreement</u>
			</div>
			<form
				bind:this={studentFormRef}
				on:submit|preventDefault={submitForm}
				class="flex flex-col gap-2"
			>
				<input on:change={studentUpload} disabled={sending} type="file" name="file" />
				<div
					class:hidden={!$studentFormUploaded}
					class="flex flex-col gap-2 border border-black p-1 rounded"
				>
					<div class="p-1">
						Your <b>digital signature</b> will be added to your application when you upload. A copy of
						your signed agreement will be provided for download immediately after upload.
					</div>
					<button
						disabled={sending}
						type="submit"
						class="border border-black p-2 w-full bg-green-200">Acknowledge and Submit</button
					>
				</div>
			</form>
		</div>
	</div>
	{#if $errors.length > 0}
		<Modal on:close={() => ($errors = [])} class="bg-red-200">
			<div
				class="flex flex-col text-xs sm:text-sm max-w-[80vw] border-2 border-red-700 bg-white p-3"
			>
				<div class="font-bold">Please fix the following issues with your upload:</div>
				<ul>
					{#each $errors as error}
						<li class="list-disc list-inside">{error}</li>
					{/each}
				</ul>
			</div>
		</Modal>
	{/if}
	{#if $uploadSuccess}
		<Modal on:close={() => ($uploadSuccess = false)} class="bg-green-200">
			<div
				class="flex flex-col text-xs sm:text-sm max-w-[80vw] border-2 border-green-700 bg-white p-3 text-center"
			>
				<div class="font-bold">Application submitted.</div>
				<div class="pt-3">Thank You!</div>
			</div>
		</Modal>
	{/if}
</div>

<style lang="postcss">
	.card-shadow {
		transition: box-shadow 100ms linear;
		text-align: left;
		box-shadow: 6px 6px 5px 0 black;
		@apply active:shadow-sm active:shadow-black;
	}
</style>
