<script lang="ts">
	import { browser } from '$app/environment';
	import { marked } from 'marked';
	import { onMount } from 'svelte';
	export let markdown: string = '';
	let html = '';
	onMount(() => {
		if (browser) {
			marked.use({
				hooks: {
					preprocess: (md) => md.replaceAll('`', ''), // removing back-ticks because I don't want to support code blocks,
					postprocess: (s) => s
				},
				extensions: [
					{
						name: 'descriptionList',
						level: 'block', // Is this a block-level or inline-level tokenizer?
						start(src) {
							return src.match(/Q:[^:\n]/)?.index;
						}, // Hint to Marked.js to stop and check for a match
						tokenizer(src, tokens) {
							const rule = /^(?:Q:[^:\n]+:[^:\n]*(?:\n|$))+/; // Regex for the complete token, anchor to string start
							const match = rule.exec(src);
							if (match) {
								const token = {
									// Token to generate
									type: 'descriptionList', // Should match "name" above
									raw: match[0], // Text to consume from the source
									text: match[0].trim(), // Additional custom properties
									tokens: [] // Array where child inline tokens will be generated
								};
								this.lexer.inline(token.text, token.tokens); // Queue this data to be processed for inline tokens
								return token;
							}
						},
						renderer(token) {
							return `<div><details>${this.parser.parseInline(token.tokens)}\n</details></div>`; // parseInline to turn child tokens into HTML
						}
					},
					{
						name: 'description',
						level: 'inline', // Is this a block-level or inline-level tokenizer?
						start(src) {
							return src.match(/:/)?.index;
						}, // Hint to Marked.js to stop and check for a match
						tokenizer(src, tokens) {
							const rule = /^Q:([^:\n]+):([^:\n]*)(?:\n|$)/; // Regex for the complete token, anchor to string start
							const match = rule.exec(src);
							if (match) {
								return {
									// Token to generate
									type: 'description', // Should match "name" above
									raw: match[0], // Text to consume from the source
									dt: this.lexer.inlineTokens(match[1].trim()), // Additional custom properties, including
									dd: this.lexer.inlineTokens(match[2].trim()) //   any further-nested inline tokens
								};
							}
						},
						renderer(token) {
							return `\n<summary>${this.parser.parseInline(
								token.dt
							)}</summary><div>${this.parser.parseInline(token.dd)}</div>`;
						},
						childTokens: [] // Any child tokens to be visited by walkTokens
					},
					{
						name: 'underliner',
						level: 'inline', // Is this a block-level or inline-level tokenizer?
						start(src) {
							return src.match(/__/)?.index;
						}, // Hint to Marked.js to stop and check for a match
						tokenizer(src, tokens) {
							const rule = /^__([^:\n]+?)__/; // Regex for the complete token, anchor to string start
							const match = rule.exec(src);
							if (match) {
								return {
									// Token to generate
									type: 'underliner', // Should match "name" above
									raw: match[0], // Text to consume from the source
									u: this.lexer.inlineTokens(match[1]), // Additional custom properties, including
									restOfLine: this.lexer.inlineTokens(match[2])
								};
							}
						},
						renderer(token) {
							return `<u>${this.parser.parseInline(token.u)}</u>${this.parser.parseInline(
								token.restOfLine
							)}`;
						},
						childTokens: [] // Any child tokens to be visited by walkTokens
					}
				]
			});
		}
		html = marked.parse(markdown);
	});
	$: if (html) {
		html = marked.parse(markdown);
	}
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="true" />
	<link
		href="https://fonts.googleapis.com/css2?family=Exo+2:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&family=Taviraj:ital,wght@0,200;0,400;0,600;0,700;1,200;1,400;1,600;1,700&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<div
	class={`md_wrapper
 ${$$props.class ?? ''}`}
>
	{@html html}
</div>

<style lang="postcss">
	:global(.md_wrapper) {
		overflow: scroll;
		@apply text-white;
	}
	:global(.md_wrapper *) {
		text-wrap: wrap;
	}
	:global(.md_wrapper p, .md_wrapper ul, .md_wrapper ol, .md_wrapper details) {
		font-family: 'Taviraj', serif;
		@apply text-xl font-light;
	}

	@media (max-width: 640px) {
		:global(.md_wrapper p, .md_wrapper ul, .md_wrapper ol, .md_wrapper details) {
			@apply text-lg;
		}
	}

	:global(.md_wrapper > p) {
		@apply w-full;
	}

	:global(.md_wrapper > :not(:first-child)) {
		@apply pt-8;
	}
	:global(.md_wrapper ol, .md_wrapper ul) {
		@apply pl-5;
	}
	:global(.md_wrapper ol) {
		@apply list-decimal;
	}
	:global(.md_wrapper ul) {
		@apply list-disc;
	}
	:global(.md_wrapper ul ul, .md_wrapper ol ol) {
		list-style-type: circle;
		@apply pl-5 text-left;
	}
	:global(.md_wrapper blockquote) {
		@apply whitespace-nowrap text-center place-self-center;
	}
	:global(.md_wrapper h1, .md_wrapper h2, .md_wrapper h3, .md_wrapper h4, .md_wrapper h5) {
		font-family: 'Lobster', sans-serif;
		@apply py-5 font-light;
	}
	:global(.md_wrapper h1) {
		@apply text-5xl;
	}
	:global(.md_wrapper h2) {
		@apply text-4xl;
	}
	:global(.md_wrapper h3) {
		@apply text-3xl;
	}
	:global(.md_wrapper h2) {
		@apply text-2xl;
	}
	:global(.md_wrapper h5) {
		@apply text-xl;
	}

	:global(.md_wrapper a) {
		@apply underline text-blue-700;
	}

	:global(.md_wrapper blockquote, .md_wrapper p:has(> img)) {
		@apply flex flex-row justify-center w-full;
	}

	:global(.md_wrapper img) {
		@apply max-w-full max-h-[70vh];
	}

	:global(.md_wrapper blockquote ul, .md_wrapper blockquote ol) {
		@apply text-left;
	}
	:global(.md_wrapper details) {
		@apply rounded border border-white cursor-pointer;
	}

	:global(.md_wrapper summary) {
		background-color: var(--bondi-blue);
		@apply py-5 text-center;
	}

	:global(.md_wrapper details[open] div) {
		@apply py-5 bg-opacity-80 text-center;
	}
</style>
