<script lang="ts">
	import { page } from '$app/stores';
	import AddElement from '$components/add-element.svelte';
	import Article from '$components/article.svelte';
	import EditorToolbar from '$components/editor-toolbar.svelte';
	import MarkdownSection from '$components/markdown-section.svelte';
	import Menu from '$components/menu.svelte';
	import { courseMarkdown } from '../../../../../stores/course.ts';
	import { editPreview } from '../../../../../stores/editor.ts';

	let courseId = $page.params.courseId;
	console.log({ courseId });

	type Element = {
		id: string;
		content?: string;
		classes?: string;
	};

	let elements: Element[] = [
		{
			id: '489380',
			content: `># This title is bold!

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

![img](https://i.imgur.com/IL3lkkB.jpg "an image")`
		}
	];

	$: {
		console.log('course markdown updated');
		$courseMarkdown = JSON.stringify(elements);
	}

	function createElement(i: number) {
		elements = elements
			.slice(0, i)
			.concat({
				id: Math.floor(Math.random() * 9e10) + '',
				content: 'click to edit'
			})
			.concat(elements.slice(i));
	}

	function deleteElement(i: number) {
		elements.splice(i, 1);
		elements = elements;
	}

	function updateContent(i: number, content: string) {
		elements[i].content = content;
		elements = elements.slice(0);
	}
</script>

<div class="relative">
	<div id="pg" class="p-5">
		{#if !$editPreview}
			<AddElement on:click={() => createElement(0)} />
			<Article>
				{#each elements as { id, classes, content }, i}
					<div class="preview-row">
						<MarkdownSection
							editable
							class={classes}
							onblur={(textContent) => {
								updateContent(i, textContent);
							}}
							markdown={content}
						/>
						<div
							class="preview-button-container border border-gray-500 rounded-lg bg-slate-200 hover:bg-slate-600 hover:text-white absolute top-1 right-1 px-1"
						>
							<Menu
								actions={[
									{ text: `Add section below`, action: () => createElement(i + 1) },
									{ text: `Delete`, action: () => deleteElement(i) }
								]}
								icon="solar:menu-dots-bold"
							/>
						</div>
					</div>
				{/each}
			</Article>
			<AddElement on:click={() => createElement(elements.length)} />
		{:else}
			<Article>
				{#each elements as { id, classes, content } (id)}
					<MarkdownSection class={classes} markdown={content} />
				{/each}
			</Article>
		{/if}
	</div>
</div>

<EditorToolbar />

<!-- padding to scroll past toolbar -->
<div class="pt-[200px]" />

<style lang="postcss">
	.preview-row {
		@apply relative;
	}

	.preview-row:hover {
		@apply bg-slate-100;
	}

	:global(.preview-button-container:hover svg) {
		color: 'white';
	}

	:global(.max-width-200px) {
		@apply max-w-sm;
	}

	.bg-img {
		position: absolute;
		top: 0;
		left: 0;
		background-image: url('https://media.discordapp.net/attachments/1030661591638745179/1167849427105480764/oa998_wavy_lines_svg_vector_colorful_full_screen_calm_abstract__b435f311-e2de-4fa7-8883-5e6d6293b862.png?ex=654f9f89&is=653d2a89&hm=1385301ee14ff16cca2e447fb54baed4d0544e0fbf288afabe348c8f04947857&=&width=1786&height=1190');
		background-size: cover;
		background-position-y: bottom;
		z-index: -1;
		@apply h-[20vh] w-full;
	}
</style>
