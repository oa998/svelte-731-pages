<script lang="ts">
	import { base } from '$app/paths';
	import CompanyName from '$components/company-name.svelte';
	import Icon from '@iconify/svelte';
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

	const images = [
		'https://i.imgur.com/SztZNZZ.jpg', // lash and brows
		'https://i.imgur.com/3b5fstC.png', // lashes
		'https://i.imgur.com/DF8chWz.jpg', // butterfly
		'https://i.imgur.com/3Y3MPEY.jpg', // tooth
		'https://i.imgur.com/tDUEIee.jpg', // black nails
		'https://i.imgur.com/iirNmz2.png', // microblading
		'https://i.imgur.com/MVBcGHG.jpg', // selfie
		'https://i.imgur.com/GPtM5fi.jpg' // 6 frame eyelashes
	];
</script>

<svelte:window on:scroll={_onscroll} />
<div class="svg-bg">
	<div class="pb-4 relative overflow-hidden">
		<div class="poly poly-behind" />
		<div class="bg" bind:clientWidth={contentWidth}>
			<div class="bg-2" />
			<div class="poly poly-front">
				<img
					bind:this={bannerImgRef}
					src={`${base}/5standing-cropped.webp`}
					alt="ok"
					class="banner-img"
				/>
			</div>
			<div class="container" bind:this={containerRef}>
				<div class="container-731 text-[4rem] sm:text-[5rem]" bind:this={titleRef}>
					<CompanyName textSize="" />
				</div>
				<div class="spacer" />
			</div>
		</div>
	</div>
	<div class="content">
		<div class="text-white max-w-2xl m-auto py-20 px-10 flex flex-col gap-28">
			<!-- Begin Excellence -->
			<div>
				<h1 class="pb-2 text-5xl dark-text-shadow" style="font-family: 'Smooch Sans';">
					Excellence
				</h1>
				<p
					class="text-xl font-semibold dark-text-shadow"
					style="font-family: 'Smooch Sans', sans-serif"
				>
					At your primere Parisan salon, our skilled team of professionals is dedicated to crafting
					personalized styles that <span class="text-lime-400">enhance your natural beauty</span>.
					Elevate your senses, transform your look, and experience the ultimate in local salon
					excellence with us.
				</p>
				<div class="max-w-lg relative w-full mt-10 h-[100vw] max-h-[600px] m-auto">
					<img
						src={`${base}/hair1.jpeg`}
						alt="one"
						class="border-4 border-[#0bc0e0] box-shadow"
						style={`position:absolute; top: 10px; left 10px; transform: rotate(-5deg);
            width: 60%; height: auto;
          `}
					/>
					<img
						src={`${base}/nails.jpeg`}
						alt="three"
						class="border-4 border-[#0bc0e0] box-shadow"
						style={`position:absolute; bottom: 0; left: 80px; transform: rotate(-89deg);
          width: 50%; height: auto;
        `}
					/>
					<img
						src={`${base}/lashes.png`}
						alt="two"
						class="border-4 border-[#0bc0e0] box-shadow"
						style={`position:absolute; top: 100px; right: 10px; transform: rotate(6deg);
          width: 50%; height: auto;
        `}
					/>
				</div>
				<div
					class="text-xl font-semibold dark-text-shadow text-center"
					style="font-family: 'Smooch Sans', sans-serif"
				>
					We love our friends and clients!

					<div class="img-carousel">
						{#each images as src, i (src)}
							<img
								{src}
								alt={`img_${i}`}
								style={`
            height: 100%;
            display: inline-block;
          `}
							/>
						{/each}
					</div>
				</div>
			</div>
			<!-- End Excellence -->

			<!-- Begin Relaxation -->
			<div class="text-right">
				<h1 class="pb-2 text-5xl dark-text-shadow" style="font-family: 'Smooch Sans';">
					Relaxation
				</h1>
				<p
					class="text-xl font-semibold dark-text-shadow"
					style="font-family: 'Smooch Sans', sans-serif"
				>
					Take a moment to escape the chaos and invest in your well-being with one of our services.
					Make the conscious choice to prioritize your well-being, and let our exceptional services
					be your guide to a more balanced and blissful life. Embracing relaxation is not a mere
					indulgence; it's a commitment to your <span class="text-lime-400">
						health and happiness.</span
					>
				</p>
				<br />
				<img
					src={`${base}/offer.png`}
					alt="one"
					class="w-full border-double border-8 border-[#0bc0e0]"
				/>
			</div>

			<!-- End Relaxation -->

			<!-- Begin Growth -->
			<div>
				<h1 class="pb-2 text-5xl dark-text-shadow" style="font-family: 'Smooch Sans';">Growth</h1>
				<p
					class="text-xl font-semibold dark-text-shadow"
					style="font-family: 'Smooch Sans', sans-serif"
				>
					Our dynamic educational platform offers a flexible and accessible approach to acquiring
					new skills and knowledge. Our expert practitioners can guide your growth. Elevate your
					skill set and broaden your horizons by investing in your <span class="text-lime-400"
						>personal and professional development</span
					>.
				</p>
				<br />
				<div class="flex flex-row content-between">
					<button class="m-auto rounded-lg p-4 bg-white bg-opacity-20">View Course Schedules</button
					>
					<a href={`${base}/login`} class="m-auto rounded-lg p-4 bg-violet-700 bg-opacity-70"
						>Student Login</a
					>
				</div>
			</div>
			<!-- End Growth -->
		</div>
	</div>

	<!-- outside column -->

	<hr class="border-white border-1" />
	<div class="text-white max-w-2xl m-auto py-20 px-10 flex flex-col gap-10">
		<div>
			<h1 class="pb-2 text-5xl dark-text-shadow" style="font-family: 'Smooch Sans';">Reach Us</h1>
			<div
				class="text-xl font-semibold dark-text-shadow text-center"
				style="font-family: 'Smooch Sans', sans-serif"
			>
				Open most days from <span class="text-lime-400">8am to 9pm</span>. Call to book an
				appointment or ensure availability.
			</div>
			<div class="flex flex-row justify-center gap-1 py-1">
				<a href="tel:+1-731-468-5505">
					<div
						class="flex flex-row justify-center gap-4 items-center rounded-lg p-4 bg-white bg-opacity-20 w-max"
					>
						<Icon icon="tabler:phone" style="font-size:x-large" color="yellow" />
						<span
							class="text-xl font-semibold dark-text-shadow"
							style="font-family: 'Smooch Sans', sans-serif">731-468-5505</span
						>
					</div>
				</a>
				<a href="https://g.page/731vibes?share">
					<div
						class="flex flex-row justify-center gap-4 items-center rounded-lg p-4 bg-white bg-opacity-20 w-max"
					>
						<Icon icon="uil:location-pin-alt" style="font-size:x-large" color="yellow" />
						<span
							class="text-xl font-semibold dark-text-shadow"
							style="font-family: 'Smooch Sans', sans-serif">3372 US 79 N - Paris, TN</span
						>
					</div>
				</a>
			</div>
		</div>
		<div>
			<div
				class="text-xl font-semibold dark-text-shadow text-center"
				style="font-family: 'Smooch Sans', sans-serif"
			>
				North on <span class="text-lime-400">HWY 76 / US-79</span>, on the right after Shady Grove
				Rd.
			</div>
			<img class="border border-white" src={`${base}/map.png`} alt="map" />
		</div>
	</div>
</div>
<div class="text-white bg-slate-800 py-12">
	<span class="text-xs m-auto block whitespace-nowrap w-fit">Visit our facebook or instagram </span>
	<div class="flex flex-row gap-2 m-auto flex-nowrap w-fit">
		<button><Icon icon="fe:facebook" color="white" style="font-size: large" /></button>
		<button
			><Icon icon="streamline:instagram-solid" color="white" style="font-size: large" /></button
		>
	</div>
</div>

<!-- </div>
</div> -->

<!--beauty | pamper, relax, indulge -->

<style lang="postcss">
	:root {
		--banner-height: calc(max(200px, 30dvh));
		--top-color: #e00b43;
		--bottom-color: #271c7d;
	}
	.poly {
		position: absolute;
		left: 0;
		top: 10dvh;
		height: var(--banner-height);
		transform: rotate(-2deg) translate(-5vw);
		min-height: 200px;
		width: 120vw;
		margin-top: 6dvh;
	}
	.poly-front {
		background: color-mix(in srgb, var(--bottom-color) 80%, black);
		z-index: 12;
		overflow: hidden;
		margin-top: 6.5dvh;
	}
	@media (max-width: 720px) {
		.poly-front {
			margin-top: 6dvh;
		}
	}
	.poly-behind {
		/* background: radial-gradient(var(--bottom-color), transparent); */
		background: var(--bottom-color);
	}

	.svg-bg {
		background-color: #f2eec5;
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1600 1000'%3E%3CradialGradient id='a' cx='.5' fx='0' cy='.4' r='.6' gradientTransform='skewX(40)'%3E%3Cstop offset='0' stop-color='%23F2EEC5' stop-opacity='1' /%3E%3Cstop offset='1' stop-color='%23F2EEC5' stop-opacity='0' /%3E%3C/radialGradient%3E%3CradialGradient id='b' cx='.5' cy='.4' fy='.4' r='.9' gradientTransform='skewY(50)'%3E%3Cstop offset='0' stop-color='%23E00B43' stop-opacity='1' /%3E%3Cstop offset='1' stop-color='%2300F' stop-opacity='1' /%3E%3C/radialGradient%3E%3CradialGradient id='c' cx='.9' fx='.9' cy='1.6' fy='.8' r='.8' gradientTransform='skewY(-30)'%3E%3Cstop offset='0' stop-color='%2300F' stop-opacity='1' /%3E%3Cstop offset='1' stop-color='%2300F' stop-opacity='0' /%3E%3C/radialGradient%3E%3CradialGradient id='d' cx='.7' fx='1.1' cy='.5' r='.6'%3E%3Cstop offset='0' stop-color='%23E00B43' stop-opacity='1' /%3E%3Cstop offset='1' stop-color='%23E00B43' stop-opacity='0' /%3E%3C/radialGradient%3E%3Cg %3E%3Crect fill='url(%23b)' width='100%25' height='100%25' /%3E%3Crect fill='url(%23a)' width='100%25' height='100%25' /%3E%3Crect fill='url(%23c)' width='100%25' height='100%25' /%3E%3Crect fill='url(%23d)' width='100%25' height='100%25' /%3E%3C/g%3E%3C/svg%3E");
		background-attachment: fixed;
		background-size: cover;
		background-position: center center;
		/* mask: linear-gradient(90deg, transparent, white 20%, white 80%, transparent); */
	}

	.bg {
		overflow: hidden;
		position: relative;
		/* min-height: 200dvh; */
		z-index: 10;
		min-height: calc(var(--banner-height) * 1.7);
		@apply max-w-2xl m-auto;
	}
	.bg-2 {
		position: absolute;
		width: 96%;
		height: 50%;
		/* background-color: var(--top-color); */
		background-color: #f2eec5;
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1600 1000'%3E%3CradialGradient id='a' cx='.5' fx='0' cy='.4' r='.6' gradientTransform='skewX(40)'%3E%3Cstop offset='0' stop-color='%23F2EEC5' stop-opacity='1' /%3E%3Cstop offset='1' stop-color='%23F2EEC5' stop-opacity='0' /%3E%3C/radialGradient%3E%3CradialGradient id='b' cx='.5' cy='.4' fy='.4' r='.9' gradientTransform='skewY(50)'%3E%3Cstop offset='0' stop-color='%23E00B43' stop-opacity='1' /%3E%3Cstop offset='1' stop-color='%2300F' stop-opacity='1' /%3E%3C/radialGradient%3E%3CradialGradient id='c' cx='.9' fx='.9' cy='1.6' fy='.8' r='.8' gradientTransform='skewY(-30)'%3E%3Cstop offset='0' stop-color='%2300F' stop-opacity='1' /%3E%3Cstop offset='1' stop-color='%2300F' stop-opacity='0' /%3E%3C/radialGradient%3E%3CradialGradient id='d' cx='.7' fx='1.1' cy='.5' r='.6'%3E%3Cstop offset='0' stop-color='%23E00B43' stop-opacity='1' /%3E%3Cstop offset='1' stop-color='%23E00B43' stop-opacity='0' /%3E%3C/radialGradient%3E%3Cg %3E%3Crect fill='url(%23b)' width='100%25' height='100%25' /%3E%3Crect fill='url(%23a)' width='100%25' height='100%25' /%3E%3Crect fill='url(%23c)' width='100%25' height='100%25' /%3E%3Crect fill='url(%23d)' width='100%25' height='100%25' /%3E%3C/g%3E%3C/svg%3E");
		background-attachment: fixed;
		background-size: cover;
		background-position: center center;
		z-index: 11;
		top: 0;
		left: 2%;
	}

	.container {
		position: relative;
		z-index: 11;
	}

	.spacer {
		min-height: calc(var(--banner-height) + 15dvh);
	}

	.banner-img {
		transform: rotate(2deg) translate(8vw, -3vh);
		height: 120%;
		object-fit: cover;
		object-position: top center;
		mask: linear-gradient(90deg, transparent, white 20%, white 80%, transparent);
	}

	.container-731 {
		text-shadow: 1px 1px 4px yellow, 1px 1px 8px yellow;
		position: fixed;
		top: 0;
		margin-left: 5%;
	}

	.dark-text-shadow {
		text-shadow: 1px 1px 4px black, 1px 1px 8px black;
	}

	.box-shadow {
		box-shadow: -3px 0 15px black;
	}

	.img-carousel {
		width: 100%;
		height: 150px;
		background-color: var(--bottom-color);
		mask: linear-gradient(90deg, transparent, white 20%, white 80%, transparent);
		overflow-x: scroll;
		border-top: white solid 3px;
		border-bottom: white solid 3px;
		@apply flex flex-row gap-3 px-5 sm:px-20;
	}
</style>
