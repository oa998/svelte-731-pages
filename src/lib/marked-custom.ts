import { marked } from 'marked';

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
marked.use({
	renderer: {
		heading(text, level) {
			const escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');

			return `
      <h${level}>
        <a name="${text}" class="anchor" href="#${escapedText}">
          <span class="header-link"></span>
        </a>
        ${text}
      </h${level}>`;
		}
	}
});

export const customMarked = marked;
