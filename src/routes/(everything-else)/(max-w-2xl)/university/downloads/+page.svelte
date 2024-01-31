<script>
	import FileDownload from '$components/file-download.svelte';
</script>

<div class="flex flex-col gap-10">
	<div class=" text-white flex flex-col">
		<div class="text-4xl sm:text-6xl font-serif text-center font-extralight">Lash University</div>
		<div class="text-xl text-center">File Downloads</div>
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
