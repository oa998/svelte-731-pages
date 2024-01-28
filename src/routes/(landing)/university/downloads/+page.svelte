<script>
	import CompanyName from '$components/company-name.svelte';
	import FileDownload from '$components/file-download.svelte';
</script>

<CompanyName />
<div class="max-w-2xl m-auto flex flex-col gap-10 py-10 px-5">
	<div class="flex flex-col">
		<div class="text-4xl text-white font-bold">Lash University</div>
		<div class="text-xl text-white">File Downloads</div>
	</div>

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
</style>
