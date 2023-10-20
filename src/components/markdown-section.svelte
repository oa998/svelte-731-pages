<script lang="ts">
	import { browser } from '$app/environment';
	import { marked } from 'marked';
	import { writable } from 'svelte/store';
	export let markdown: string = '';
	export let onblur: (textContent: string) => void = () => {};
	let focused = false;
	export let editable = false;
	const value = writable(markdown);

	$: $value = markdown.replaceAll(/\n{2,}/g, '\n\n').trim();

	if (browser)
		marked.use({
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
						)}</summary><span>${this.parser.parseInline(token.dd)}</span>`;
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
</script>

{#if focused}
	<!-- svelte-ignore a11y-autofocus -->
	<div
		autofocus
		contenteditable
		bind:innerText={$value}
		on:focus={() => (focused = true)}
		on:blur={(e) => {
			onblur($value);
			focused = false;
		}}
		class={`whitespace-pre-wrap focus:outline-dotted`}
	>
		{$value}
	</div>
{:else}
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div class="grid w-full">
		<div class={`${$$props.class} outside-md`} on:click={() => (focused = editable)}>
			{@html marked.parse(markdown)}
		</div>
	</div>
{/if}

<style lang="postcss">
	:global(*) {
		font-family: 'Kanit', sans-serif;
	}

	:global(
			.outside-md > p:not(:first-child),
			.outside-md > ol:not(:first-child),
			.outside-md > ul:not(:first-child),
			.outside-md > blockquote:not(:first-child)
		) {
		@apply pt-6;
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
		@apply pl-5;
	}

	:global(.outside-md code) {
		@apply p-3 bg-slate-900 text-white font-mono rounded-md;
	}

	:global(.outside-md pre) {
		@apply my-10;
	}

	:global(.outside-md blockquote) {
		@apply text-center place-self-center;
	}

	:global(.outside-md h1, .outside-md h2, .outside-md h3, .outside-md h4, .outside-md h5) {
		@apply font-extrabold py-5;
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
</style>
