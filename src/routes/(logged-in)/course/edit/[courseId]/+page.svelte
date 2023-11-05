<script lang="ts">
	import { page } from '$app/stores';
	import Article from '$components/article.svelte';
	import EditMarkdown from '$components/edit-markdown.svelte';
	import EditorToolbar from '$components/editor-toolbar.svelte';
	import ImageSheet from '$components/image-sheet.svelte';
	import MarkdownSection from '$components/markdown-section.svelte';
	import { createAlbum } from '$lib/imgur-apis.ts';
	import { courseMarkdown } from '../../../../../stores/course.ts';
	import { editPreview } from '../../../../../stores/editor.ts';

	let courseId = $page.params.courseId;
	console.log({ courseId });
	let imageSelectorOpen = true;

	let article: string = `># This title is bold!

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Faucibus turpis in eu mi. Sit amet consectetur adipiscing elit ut aliquam. Et molestie ac feugiat sed lectus. At __augue eget__ arcu dictum varius duis. Faucibus et molestie ac feugiat. Tellus id interdum velit laoreet id donec ultrices tincidunt arcu. Scelerisque varius morbi enim nunc. Ac auctor augue mauris augue neque gravida in fermentum et. Aliquam purus sit amet luctus venenatis lectus magna fringilla. Sapien eget mi proin sed libero enim. Sit amet dictum sit amet justo donec enim. Ut venenatis tellus in metus vulputate eu scelerisque felis imperdiet.

1. one
2. two
3. three


- bullet
- bullet 2
- bullet 3
    - inner 1
    - inner 2
    - inner 3

   
>Q: What's the proper temperature for cooked pork? : 165℉

LoLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tristique senectus et netus et. Mus mauris vitae ultricies leo. Arcu dui vivamus arcu felis bibendum ut. Etiam erat velit scelerisque in. Quis eleifend quam adipiscing vitae proin sagittis nisl rhoncus mattis. Tincidunt vitae semper quis lectus nulla at volutpat. Aenean sed adipiscing diam donec adipiscing tristique risus nec. At elementum eu facilisis sed odio. Felis imperdiet proin fermentum leo vel. Blandit turpis cursus in hac habitasse platea dictumst quisque. Amet massa vitae tortor condimentum lacinia quis. Risus ultricies tristique nulla aliquet enim tortor at auctor. Nulla malesuada pellentesque elit eget gravida cum sociis. Mi tempus imperdiet nulla malesuada. Laoreet suspendisse interdum consectetur libero id faucibus nisl. Sem viverra aliquet eget sit amet. Tincidunt lobortis feugiat vivamus at augue. Nunc sed augue lacus viverra vitae congue eu consequat. Malesuada proin libero nunc consequat interdum varius.

Aenean sed adipiscing diam donec adipiscing. Pulvinar pellentesque habitant morbi tristique. Quis lectus nulla at volutpat diam ut venenatis tellus in. Pellentesque habitant morbi tristique senectus. Condimentum id venenatis a condimentum vitae sapien pellentesque. Sagittis aliquam malesuada bibendum arcu vitae. Ipsum nunc aliquet bibendum enim facilisis. Orci dapibus ultrices in iaculis nunc. Justo laoreet sit amet cursus sit amet. Ut venenatis tellus in metus vulputate eu. Scelerisque mauris pellentesque pulvinar pellentesque habitant morbi tristique senectus.

Pellentesque nec nam aliquam sem et. In fermentum et sollicitudin ac orci **phasellus**. Egestas integer eget aliquet nibh praesent tristique. Arcu dui vivamus arcu felis bibendum ut tristique. Arcu cursus vitae congue mauris rhoncus aenean vel. Non enim praesent elementum facilisis leo vel fringilla. Faucibus scelerisque eleifend donec pretium vulputate sapien nec sagittis. Pretium nibh ipsum consequat nisl vel pretium lectus. Tortor pretium viverra suspendisse potenti nullam ac tortor vitae. Auctor eu augue ut lectus arcu bibendum at varius. Id diam vel quam elementum pulvinar etiam non quam lacus. Lectus nulla at volutpat diam ut venenatis tellus in metus. Ac orci phasellus egestas tellus rutrum tellus pellentesque eu tincidunt. At augue eget arcu dictum varius duis at consectetur lorem.

Lobortis feugiat vivamus at augue. Posuere urna nec tincidunt praesent. Tincidunt tortor aliquam nulla facilisi cras fermentum odio eu feugiat. Amet consectetur adipiscing elit duis tristique sollicitudin nibh sit amet. Velit scelerisque in dictum non consectetur. Accumsan lacus vel facilisis volutpat. Ac turpis egestas integer eget aliquet nibh praesent tristique magna. Suspendisse ultrices gravida dictum fusce ut placerat orci nulla pellentesque. Nunc faucibus a pellentesque sit amet porttitor eget dolor morbi. Interdum consectetur libero id faucibus. Nullam eget felis eget nunc lobortis.

Lacus suspendisse faucibus interdum posuere lorem ipsum dolor sit amet. Rhoncus mattis rhoncus urna neque viverra. Quam viverra orci sagittis eu volutpat. Magna eget est lorem ipsum dolor sit. Amet purus gravida quis blandit turpis cursus in hac. Netus et malesuada fames ac turpis egestas maecenas pharetra convallis. Massa tincidunt nunc pulvinar sapien et ligula ullamcorper malesuada proin. Sed risus pretium quam vulputate. Quis enim lobortis scelerisque fermentum dui. Tempor orci eu lobortis elementum. Sem integer vitae justo eget. Eros in cursus turpis massa tincidunt dui ut. Pulvinar elementum integer enim neque volutpat ac. Dignissim enim sit amet venenatis urna cursus eget. Ut sem nulla pharetra diam sit amet. Habitant morbi tristique senectus et netus et malesuada. Sed viverra ipsum nunc aliquet bibendum enim facilisis.

![img](https://i.imgur.com/IL3lkkB.jpg "an image")`;

	$: {
		console.log('course markdown updated');
		$courseMarkdown = JSON.stringify(article);
	}

	function updateArticle(newArticle: string) {
		article = newArticle;
	}
</script>

<div class="relative">
	<div id="pg" class="p-5">
		<Article>
			{#if !$editPreview}
				<EditMarkdown
					markdown={article}
					onblur={(modifiedArticle) => {
						updateArticle(modifiedArticle);
					}}
				/>
			{:else}
				<MarkdownSection markdown={article} />
			{/if}
		</Article>
	</div>
	<ImageSheet open={imageSelectorOpen && !$editPreview} />
</div>
<button class="bg-black text-white" on:click={createAlbum}>create album</button>
<EditorToolbar showImages={() => (imageSelectorOpen = !imageSelectorOpen)} />

<div class="py-[200px]" />

<style lang="postcss">
</style>
