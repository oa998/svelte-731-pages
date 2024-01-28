<script>
	import CompanyName from '$components/company-name.svelte';
	import FileDownload from '$components/file-download.svelte';
</script>

<CompanyName />
<div class="max-w-2xl m-auto flex flex-col gap-10 py-10 px-5">
	<div class="text-4xl text-white">Lash University</div>
	<div class="text-2xl text-white underline">Downloads</div>

	<FileDownload
		filename="info.txt"
		downloadedName="lash-license-application.txt"
		title="Lash License Application"
		details="Earn your license. Print, fill out, and return to the salon."
	/>

	<FileDownload
		filename="info.txt"
		title="Instructor Application"
		downloadedName="instructor-application.txt"
		details="Earn all credentials needed to become an instructor. Print, fill out, and return to the
    salon."
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
