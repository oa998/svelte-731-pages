<script lang="ts">
	import { base } from '$app/paths';

	export let textSize: string = 'text-3xl';
	export let shimmer = false;
</script>

<a class:shimmer href={`${base || '/'}`} class={` ${$$props.class} ${textSize}`}>731 Vibes</a>

<style lang="postcss">
	a {
		color: var(--lemon-chiffon);
		display: inline-block;
		text-shadow: 1px 1px 4px var(--persian-indigo), 1px 1px 8px var(--persian-indigo);
		font-family: 'Lobster', sans-serif;
		background-color: white;
		@apply p-2 sm:p-5;
	}
	.shimmer {
		text-align: center;
		color: white;
		background: -webkit-gradient(
			linear,
			left top,
			right top,
			from(white),
			to(white),
			color-stop(0.5, #fff)
		);
		background: -moz-gradient(
			linear,
			left top,
			right top,
			from(#222),
			to(#222),
			color-stop(0.5, #fff)
		);
		background: gradient(linear, left top, right top, from(#222), to(#222), color-stop(0.5, #fff));
		-webkit-background-size: 125px 100%;
		-moz-background-size: 125px 100%;
		background-size: 125px 100%;
		-webkit-background-clip: text;
		-moz-background-clip: text;
		background-clip: text;
		-webkit-animation-name: shimmer;
		-moz-animation-name: shimmer;
		animation-name: shimmer;
		-webkit-animation-duration: 5s;
		-moz-animation-duration: 5s;
		animation-duration: 5s;
		-webkit-animation-iteration-count: 1;
		-moz-animation-iteration-count: 1;
		animation-iteration-count: 1;
		background-repeat: no-repeat;
		background-position: 0 0;
		background-color: #222;
	}
	@-moz-keyframes shimmer {
		0% {
			background-position: -4rem top; /*50px*/
		}

		70% {
			background-position: 12.5rem top; /*200px*/
		}

		100% {
			background-position: 12.5rem top; /*200px*/
		}
	}
	@-webkit-keyframes shimmer {
		0% {
			background-position: -4rem top; /*50px*/
		}

		70% {
			background-position: 12.5rem top; /*200px*/
		}

		100% {
			background-position: 12.5rem top; /*200px*/
		}
	}
	@-o-keyframes shimmer {
		0% {
			background-position: -4rem top; /*50px*/
		}

		70% {
			background-position: 12.5rem top; /*200px*/
		}

		100% {
			background-position: 12.5rem top; /*200px*/
		}
	}
	@keyframes shimmer {
		0% {
			background-position: -4rem top; /*50px*/
		}

		70% {
			background-position: 12.5rem top; /*200px*/
		}

		100% {
			background-position: 12.5rem top; /*200px*/
		}
	}
</style>
