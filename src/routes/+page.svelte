<script lang="ts">
	import { base } from '$app/paths';
	import CompanyName from '$components/company-name.svelte';
	let contentWidth: number;
	let bannerImgRef: HTMLImageElement;
	let titleRef: HTMLDivElement;
	let containerRef: HTMLDivElement;
	const scrollOffset = 100;

	$: if (contentWidth && bannerImgRef) {
		bannerImgRef.width = contentWidth * 0.9;
	}

	$: _onscroll = () => {
		const curr = containerRef.getBoundingClientRect().top;
		if (curr > -scrollOffset) {
			titleRef.style.top = `0`;
			return;
		}
		const pos = Math.min(Math.floor((curr + scrollOffset) / 2), 0);
		titleRef.style.top = `${pos}px`;
	};

	$: if (titleRef && containerRef) {
		titleRef.style.position = 'fixed';
		_onscroll();
	}
</script>

<svelte:window on:scroll={_onscroll} />
<div class="fancy-bg">
	<div class="poly poly-behind" />
	<div class="bg fancy-bg" bind:clientWidth={contentWidth}>
		<div class="bg-2 fancy-bg" />
		<div class="poly poly-front">
			<img bind:this={bannerImgRef} src={`${base}/5standing.jpeg`} alt="ok" class="banner-img" />
		</div>
		<div class="container" bind:this={containerRef}>
			<div class="container-731" bind:this={titleRef}>
				<CompanyName textSize="text-[5rem] text-center" />
			</div>
			<div class="spacer" />
			<div class="content">
				<div>
					<h1 class="h-family">Beauty</h1>
					<p>
						Lorem, ipsum dolor sit amet consectetur adipisicing elit. Et nobis sapiente delectus.
						Aliquid maxime culpa quaerat voluptas recusandae dolore quos alias, nobis reprehenderit
						amet voluptates? Amet, voluptate? Dolor, quas animi?
					</p>
				</div>
				<div><h1 class="h-family">pamper</h1></div>
				<div><h1 class="h-family">relax</h1></div>
				<div><h1 class="h-family">refresh</h1></div>
			</div>
		</div>
	</div>
</div>

<!--beauty | pamper, relax, indulge -->

<style lang="postcss">
	:root {
		--banner-height: calc(max(300px, 30dvh));
	}
	.fancy-bg {
		position: relative;
		overflow: hidden;
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1600 900'%3E%3Cdefs%3E%3Cpath id='p' d='M89 17c71 35 1 79-39 50-64-45 23-103 86-37 52 54-49 93-86 60-27-23 17-72 51-49 35 24 2 108-69 63-67-43-19-125 57-87z' /%3E%3Ccircle id='a' r='3' %3E%3CanimateMotion dur='60s' repeatCount='11'%3E%3Cmpath href='%23p' /%3E%3C/animateMotion%3E%3C/circle%3E%3Ccircle id='b' r='3' %3E%3CanimateMotion begin='-10s' dur='60s' repeatCount='11' keyPoints='1%3B0' keyTimes='0%3B1' calcMode='linear'%3E%3Cmpath href='%23p' /%3E%3C/animateMotion%3E%3C/circle%3E%3Ccircle id='e' r='3' %3E%3CanimateMotion begin='-34s' dur='60s' repeatCount='11' keyPoints='1%3B0' keyTimes='0%3B1' calcMode='linear'%3E%3Cmpath href='%23p' /%3E%3C/animateMotion%3E%3C/circle%3E%3Ccircle id='c' r='3' %3E%3CanimateMotion begin='-20s' dur='60s' repeatCount='11' keyPoints='1%3B0' keyTimes='0%3B1' calcMode='linear'%3E%3Cmpath href='%23p' /%3E%3C/animateMotion%3E%3C/circle%3E%3Ccircle id='d' r='3' %3E%3CanimateMotion begin='-30s' dur='60s' repeatCount='11'%3E%3Cmpath href='%23p' /%3E%3C/animateMotion%3E%3C/circle%3E%3Ccircle id='f' r='3' %3E%3CanimateMotion begin='-15s' dur='60s' repeatCount='11'%3E%3Cmpath href='%23p' /%3E%3C/animateMotion%3E%3C/circle%3E%3C/defs%3E%3Cg fill='%23E00B43' %3E%3Cg stroke='%23FFF' stroke-width='0'%3E%3Cuse href='%23a' x='100' y='100'%3E%3C/use%3E%3Cuse href='%23b' x='300' y='300'%3E%3C/use%3E%3Cuse href='%23c' x='500' y='500'%3E%3C/use%3E%3Cuse href='%23d' x='700' y='700'%3E%3C/use%3E%3Cuse href='%23a' x='900' y='0'%3E%3C/use%3E%3Cuse href='%23b' x='1100' y='700'%3E%3C/use%3E%3Cuse href='%23c' x='1300' y='300'%3E%3C/use%3E%3Cuse href='%23d' x='1500' y='500'%3E%3C/use%3E%3Cuse href='%23a' x='200' y='400'%3E%3C/use%3E%3Cuse href='%23b' x='400' y='600'%3E%3C/use%3E%3Cuse href='%23f' x='600' y='800'%3E%3C/use%3E%3Cuse href='%23d' x='800' y='200'%3E%3C/use%3E%3Cuse href='%23b' x='1000' y='0'%3E%3C/use%3E%3Cuse href='%23a' x='1200' y='400'%3E%3C/use%3E%3Cuse href='%23c' x='1400' y='1000'%3E%3C/use%3E%3Cuse href='%23d' x='1600' y='200'%3E%3C/use%3E%3Cuse href='%23a' x='50' y='750'%3E%3C/use%3E%3Cuse href='%23b' x='150' y='600'%3E%3C/use%3E%3Cuse href='%23c' x='350' y='800'%3E%3C/use%3E%3Cuse href='%23d' x='450' y='150'%3E%3C/use%3E%3Cuse href='%23b' x='550' y='50'%3E%3C/use%3E%3Cuse href='%23a' x='750' y='600'%3E%3C/use%3E%3Cuse href='%23f' x='650' y='400'%3E%3C/use%3E%3Cuse href='%23c' x='950' y='200'%3E%3C/use%3E%3Cuse href='%23b' x='1350' y='700'%3E%3C/use%3E%3Cuse href='%23d' x='1250' y='400'%3E%3C/use%3E%3Cuse href='%23c' x='1050' y='550'%3E%3C/use%3E%3Cuse href='%23a' x='1450' y='50'%3E%3C/use%3E%3Cuse href='%23a' x='-100' y='0'%3E%3C/use%3E%3Cuse href='%23b' x='0' y='200'%3E%3C/use%3E%3Cuse href='%23c' x='-50' y='400'%3E%3C/use%3E%3Cuse href='%23d' x='50' y='600'%3E%3C/use%3E%3Cuse href='%23b' x='250' y='-50'%3E%3C/use%3E%3Cuse href='%23a' x='640' y='0'%3E%3C/use%3E%3Cuse href='%23f' x='390' y='-80'%3E%3C/use%3E%3Cuse href='%23e' x='450' y='300'%3E%3C/use%3E%3Cuse href='%23b' x='820' y='700'%3E%3C/use%3E%3Cuse href='%23d' x='970' y='400'%3E%3C/use%3E%3Cuse href='%23c' x='1150' y='-40'%3E%3C/use%3E%3Cuse href='%23a' x='1250' y='820'%3E%3C/use%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
		background-attachment: fixed;
		background-size: cover;
	}
	.poly {
		position: absolute;
		left: 0;
		top: 10dvh;
		background: rebeccapurple;
		height: var(--banner-height);
		transform: rotate(-2deg) translate(-5vw);
		min-height: 300px;
		width: 120vw;
	}
	.poly-front {
		background: color-mix(in srgb, rebeccapurple 90%, black);
		z-index: 12;
		overflow: hidden;
	}
	@media (min-width: 720px) and (max-width: 1024px) {
		.poly-front {
			margin-top: 10px;
		}
	}
	.poly-behind {
		background: linear-gradient(
			to right,
			var(--rich-black) 15%,
			rebeccapurple 30%,
			rebeccapurple 70%,
			var(--rich-black) 85%
		);
	}
	.content {
		width: 100%;
		@apply flex flex-col gap-3;
	}

	.content div {
		transform: rotate(-2deg);
		background: linear-gradient(to right, var(--rich-black), darkviolet);
		mask: linear-gradient(90deg, transparent, white 20%, white 80%, transparent);
		@apply p-2 bg-slate-200 text-white;
	}

	.content h1 {
		transform: rotate(2deg);
		@apply text-center text-3xl;
	}

	.content p {
		transform: rotate(2deg);
		@apply text-left px-20;
	}

	h1 {
		@apply text-white;
	}
	.bg {
		overflow: hidden;
		position: relative;
		min-height: 200dvh;
		z-index: 10;
		@apply max-w-2xl m-auto;
	}
	.bg-2 {
		position: absolute;
		width: 96%;
		height: 100%;
		background-color: var(--rich-black);
		z-index: 11;
		top: 0;
		left: 2%;
	}

	.container {
		position: relative;
		z-index: 12;
	}

	.spacer {
		min-height: calc(var(--banner-height) + 15dvh);
	}

	.banner-img {
		transform: rotate(2deg) translate(8vw, -3vh);
		height: 120%;
		object-fit: cover;
		mask: linear-gradient(90deg, transparent, white 20%, white 80%, transparent);
	}

	.container-731 {
		/* position: fixed;
		top: 0; */
	}
</style>
