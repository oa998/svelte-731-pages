<script>
	import CompanyName from '$components/company-name.svelte';
	import FileDownload from '$components/file-download.svelte';
</script>

<CompanyName />
<div class="max-w-2xl m-auto flex flex-col gap-10 py-10 px-5">
	<div class="text-4xl text-white">Lash University</div>
	<div class="text-2xl text-white underline">Downloads</div>

	<FileDownload
		filename="instructor enrollment agreement.pdf"
		title="Student Enrollment Agreement"
		details="Lash Student Enrollment Agreement. Print, fill out, and return to the program administrator."
	/>

	<FileDownload
		filename="lash enrollment agreement.pdf"
		title="Instructor Enrollment Agreement"
		details="Instructor Student Enrollment Agreement. Print, fill out, and return to the
    program administrator."
	/>
</div>

<style lang="postcss">
	.card-shadow {
		transition: box-shadow 100ms linear;
		text-align: left;
		box-shadow: 6px 6px 5px 0 black;
		@apply active:shadow-sm active:shadow-black;
	}
	.areas {
		grid-template-areas:
			'header icon'
			'details icon';
	}
	.header {
		grid-area: header;
		@apply text-xl;
	}
	.icon {
		grid-area: icon;
		@apply w-full flex justify-end;
	}
	.details {
		grid-area: details;
	}
</style>
