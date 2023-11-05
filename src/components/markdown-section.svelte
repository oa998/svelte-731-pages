<script lang="ts">
	import { browser } from '$app/environment';
	import { marked } from 'marked';
	export let markdown: string = '';

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
						return `<details>${this.parser.parseInline(token.tokens)}\n</details>`; // parseInline to turn child tokens into HTML
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
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
	<link
		href="https://fonts.googleapis.com/css2?family=Exo+2:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&family=Taviraj:ital,wght@0,200;0,400;0,600;0,700;1,200;1,400;1,600;1,700&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<div class={`outside-md ${$$props.class ?? ''}`}>
	{@html marked.parse(markdown)}
</div>

<style lang="postcss">
	:global(.outside-md) {
		overflow: scroll;
		@apply text-white;
	}
	:global(.outside-md *) {
		text-wrap: wrap;
	}
	:global(.outside-md p, .outside-md ul, .outside-md ol, .outside-md details) {
		font-family: 'Taviraj', serif;
		@apply text-xl font-light;
	}

	@media (max-width: 640px) {
		:global(.outside-md p, .outside-md ul, .outside-md ol, .outside-md details) {
			@apply text-lg;
		}
	}

	:global(.outside-md > p) {
		@apply w-full;
	}

	:global(.outside-md > :not(:first-child)) {
		@apply pt-8;
	}
	:global(.outside-md ol, .outside-md ul) {
		@apply pl-5;
	}
	:global(.outside-md ol) {
		@apply list-decimal;
	}
	:global(.outside-md ul) {
		@apply list-disc;
	}
	:global(.outside-md ul ul, .outside-md ol ol) {
		list-style-type: circle;
		@apply pl-5 text-left;
	}
	:global(.outside-md blockquote) {
		@apply whitespace-nowrap text-center place-self-center;
	}
	:global(.outside-md h1, .outside-md h2, .outside-md h3, .outside-md h4, .outside-md h5) {
		font-family: 'Lobster', sans-serif;
		@apply py-5 font-light;
	}
	:global(.outside-md h1) {
		@apply text-5xl;
	}
	:global(.outside-md h2) {
		@apply text-4xl;
	}
	:global(.outside-md h3) {
		@apply text-3xl;
	}
	:global(.outside-md h2) {
		@apply text-2xl;
	}
	:global(.outside-md h5) {
		@apply text-xl;
	}

	:global(.outside-md a) {
		@apply underline text-blue-700;
	}

	:global(.outside-md blockquote, .outside-md p:has(> img)) {
		@apply flex flex-row justify-center w-full;
	}

	:global(.outside-md img) {
		@apply max-w-full max-h-[70vh];
	}

	:global(.outside-md blockquote ul, .outside-md blockquote ol) {
		@apply text-left;
	}
	:global(.outside-md details) {
		@apply rounded border border-white cursor-pointer;
	}

	:global(.outside-md summary) {
		background-color: var(--bondi-blue);
		@apply p-5;
	}

	:global(.outside-md details[open] div) {
		@apply py-5 bg-opacity-80;
	}
</style>
