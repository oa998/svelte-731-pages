<script lang="ts">
	import { browser } from '$app/environment';
	import { marked } from 'marked';

	let markdown: string = `

  # *Header 1*

this is code

## header 2

## header 2+

**bold**

__italics?__

pargraph

~~underlined~~

this should have underlined[[ __This is underlined text__]] text __bet ween__ brackets

<br/>
<br/>
<br/>

>>Q:  Checkpoint - __How many are there?__  :  Twelve!!

Q: **Topic 2**  :  something else

### The end head 3

1. this is one
1. this is one
1. this is one
1. this is one
1. this is one
1. inside
1. inside again

## here's some more!

- First item
- Second item
- Third item
- Indented item
- Indented item
    - Indented item
    - Indented item
- Fourth item 2

`;

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
				},
				{
					name: 'centered',
					level: 'block', // Is this a block-level or inline-level tokenizer?
					start(src) {
						return src.match(/>>/)?.index;
					},
					tokenizer(src, tokens) {
						const rule = /^>>([^\n]+?)(?:\n)/; // Regex for the complete token, anchor to string start
						const match = rule.exec(src);
						if (match) {
							return {
								// Token to generate
								type: 'centered',
								raw: match[0],
								u: this.lexer.blockTokens(match[1])
							};
						}
					},
					renderer(token) {
						return `<span class='centered'>${this.parser.parse(token.u)}</span>`;
					},
					childTokens: [] // Any child tokens to be visited by walkTokens
				}
			]
		});

	marked.use();
</script>

<div class="text-5xl">Welcome to SvelteKit</div>

<div class="flex flex-col min-w-max gap-2 p-2 text-white">
	<button
		class="bg-red-400 w-full p-5"
		on:click={() => {
			const email = 'bbb@bbb.com';
			const password = 'bbbbbb';
			fetch('https://nginx-anything-storage-glovbogi2a-uc.a.run.app/auth/login', {
				method: 'POST',
				headers: {
					accept: 'application/json',
					['content-type']: 'application/json'
				},
				body: JSON.stringify({
					email,
					password
				}),
				credentials: 'include'
			});
		}}>LOG IN (form-data-nginx)</button
	>
	<button
		class="w-full bg-blue-400 p-5"
		on:click={() => {
			console.log('getit');
			fetch('https://nginx-anything-storage-glovbogi2a-uc.a.run.app/app', {
				method: 'GET',
				credentials: 'include'
			})
				.then((r) => r.text().then(console.log))
				.catch((e) => console.log('errorrrrr', e))
				.then(() => console.log('called /'));
		}}>Get It</button
	>
</div>

<textarea bind:value={markdown} rows={20} cols={100} class="ml-2 pl-2 border border-gray-200" />

<div>
	<span>Preview:</span>
	<div class="border-black border m-1 p-1 bg-slate-50">
		{@html marked.parse(markdown)}
	</div>
</div>

<div>
	<span>raw:</span>
	<div>{marked.parse(markdown)}</div>
</div>

<!-- <svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="true" />
	<link
		href="https://fonts.googleapis.com/css2?family=Kanit:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
		rel="stylesheet"
	/>
</svelte:head> -->

<style lang="postcss">
	:global(p) {
		@apply pt-3;
	}

	:global(b, strong) {
		font-family: Gelasio;
		@apply font-bold;
	}

	:global(h1, h2, h3, h4, h5) {
		@apply font-extrabold my-5;
	}

	:global(h1) {
		@apply text-5xl;
	}
	:global(h2) {
		@apply text-4xl;
	}
	:global(h3) {
		@apply text-3xl;
	}
	:global(h2) {
		@apply text-2xl;
	}
	:global(h5) {
		@apply text-xl;
	}

	:global(ol, ul) {
		@apply pt-2 pl-5;
	}

	:global(ol) {
		@apply list-decimal;
	}
	:global(ul) {
		@apply list-disc pl-7;
	}

	:global(ul ul) {
		list-style-type: circle;
	}

	:global(code) {
		@apply p-3 bg-slate-900 text-white font-mono rounded-md;
	}
	:global(pre) {
		@apply my-10;
	}
	:global(u) {
		@apply underline;
	}
	:global(.centered) {
		@apply text-center;
	}
</style>
