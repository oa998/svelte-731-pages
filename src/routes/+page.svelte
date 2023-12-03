<script lang="ts">
	import { base } from '$app/paths';
	import CompanyName from '$components/company-name.svelte';
	import Icon from '@iconify/svelte';
	let contentWidth: number;
	let bannerImgRef: HTMLImageElement;
	let titleRef: HTMLDivElement;
	let containerRef: HTMLDivElement;
	const scrollOffset = 125;

	$: if (contentWidth && bannerImgRef) {
		bannerImgRef.width = contentWidth * 0.9;
		bannerImgRef.style.opacity = '1';
	}

	$: _onscroll = () => {
		const curr = containerRef.getBoundingClientRect().top;
		titleRef.style.opacity = '1';
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
					class="banner-img opacity-0"
				/>
			</div>
			<div class="container" bind:this={containerRef}>
				<div class="container-731 text-[4rem] sm:text-[5rem] opacity-0" bind:this={titleRef}>
					<CompanyName textSize="" />
				</div>
			</div>
			<div class="spacer" />
		</div>
	</div>

	<div
		class="text-center w-full text-2xl sm:text-3xl font-extrathin font-sans font-thin text-white"
	>
		<div class="hidden sm:block">Your Professional Beauty Salon in Paris</div>
		<div class="block sm:hidden">
			Your Professional<br />Beauty Salon in Paris
		</div>
	</div>

	<div class="content">
		<div class="text-white max-w-2xl m-auto py-20 px-10 flex flex-col gap-28">
			<!-- Begin Excellence -->
			<div>
				<h1 class="pb-2 text-2xl sm:text-5xl font-sans font-thin">Exceptional Client Care</h1>
				<p class="text-base sm:text-lg font-extrathin dark-text-shadow font-serif font-thin">
					Our skilled team of professionals is dedicated to crafting personalized styles that <span
						class="text-lime-400 font-light">enhance your natural beauty</span
					>. Elevate your senses, transform your look, and experience the ultimate in local salon
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
				<div class="text-sm font-extrathin dark-text-shadow font-serif font-thin text-center">
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
				<h1 class="pb-2 text-2xl sm:text-5xl font-sans font-thin">Renewed Wellness</h1>
				<p class="text-base sm:text-lg font-extrathin dark-text-shadow font-serif font-thin">
					Take a moment to escape the chaos and invest in your well-being with one of our services.
					Make the conscious choice to prioritize your well-being, and let our exceptional services
					be your guide to a more balanced and blissful life. Embracing relaxation is not a mere
					indulgence; it's a commitment to <span class="text-lime-400 font-light"
						>your health and happiness.</span
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
				<h1 class="pb-2 text-2xl sm:text-5xl font-sans font-thin">Professional Growth</h1>
				<p class="text-base sm:text-lg font-extrathin dark-text-shadow font-serif font-thin">
					Our dynamic educational platform offers a flexible and accessible approach to acquiring
					new skills and knowledge. Our expert practitioners can guide your growth. Elevate your
					skill set and broaden your horizons by investing in your <span
						class="text-lime-400 font-light">personal and professional development</span
					>.
				</p>
				<br />
				<div class="flex flex-row justify-center gap-2 flex-wrap">
					<a
						href={`${base}/courses`}
						class=" text-xs rounded-lg p-4 bg-white bg-opacity-20 whitespace-nowrap font-serif font-thin"
						>View Available Courses</a
					>
					<a
						href={`${base}/login`}
						class="text-xs rounded-lg p-4 bg-violet-700 bg-opacity-70 whitespace-nowrap font-serif font-thin"
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
			<h1 class="pb-2 text-2xl sm:text-5xl font-sans font-thin text-center">Reach Us</h1>
			<div class="text-base sm:text-lg dark-text-shadow text-center font-serif font-thin">
				Open most days from <span class="text-lime-400 font-light">8am to 9pm</span>. Call to book
				an appointment or to ensure availability with your beautician.
			</div>
			<div class="flex flex-row justify-center gap-2 flex-wrap py-1">
				<a href="tel:+1-731-468-5505">
					<div
						class="flex flex-row justify-center gap-4 items-center rounded-lg p-4 bg-white bg-opacity-20 w-max"
					>
						<Icon icon="tabler:phone" style="font-size:x-large" color="yellow" />
						<span class="text-md font-serif font-thin">731-468-5505</span>
					</div>
				</a>
				<a href="https://g.page/731vibes?share">
					<div
						class="flex flex-row justify-center gap-4 items-center rounded-lg p-4 bg-white bg-opacity-20 w-max"
					>
						<Icon icon="uil:location-pin-alt" style="font-size:x-large" color="yellow" />
						<span class="text-md font-serif font-thin">3372 US 79 N - Paris, TN</span>
					</div>
				</a>
			</div>
		</div>
		<div>
			<div class="text-base sm:text-lg dark-text-shadow text-center font-serif font-thin">
				North on <span class="text-lime-400 font-light">HWY 76 / US-79</span>, on the right after
				Shady Grove Rd.
			</div>
			<img class="border border-white" src={`${base}/map.png`} alt="map" />
		</div>
	</div>
</div>
<div class="text-white bg-slate-800 py-12">
	<span class="text-xs m-auto block whitespace-nowrap w-fit font-serif font-light"
		>Visit our <span class="link">facebook</span> or <span class="link">instagram</span>
	</span>
</div>

<!-- </div>
</div> -->

<!--beauty | pamper, relax, indulge -->

<style lang="postcss">
	:root {
		--banner-height: calc(max(200px, 30lvh));
		--top-color: #e00b43;
		--bottom-color: #271c7d;
	}
	.poly {
		position: absolute;
		left: 0;
		top: 10lvh;
		height: var(--banner-height);
		transform: rotate(-2deg) translate(-5vw);
		min-height: 200px;
		width: 120vw;
		margin-top: 6lvh;
	}
	.poly-front {
		background: color-mix(in srgb, var(--bottom-color) 80%, black);
		z-index: 12;
		overflow: hidden;
		margin-top: 6.5lvh;
	}
	@media (max-width: 720px) {
		.poly-front {
			margin-top: 6lvh;
		}
	}
	.poly-behind {
		background: var(--bottom-color);
	}

	.svg-bg {
		background-color: #271c7d;
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 2000 1500'%3E%3Cdefs%3E%3CradialGradient id='a' cx='1000' cy='750' r='50.7%25' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%230059a3'/%3E%3Cstop offset='1' stop-color='%23271C7D'/%3E%3C/radialGradient%3E%3ClinearGradient id='b' gradientUnits='objectBoundingBox' x1='0' y1='0' x2='1' y2='0'%3E%3Cstop offset='0' stop-color='%23048AAF' /%3E%3Cstop offset='0.35' stop-color='%230059a3' stop-opacity='0.5'/%3E%3C/linearGradient%3E%3ClinearGradient id='b2' gradientUnits='objectBoundingBox' x1='1' y1='0' x2='0' y2='0'%3E%3Cstop offset='0' stop-color='%23048AAF'/%3E%3Cstop offset='0.35' stop-color='%230059a3' stop-opacity='0.5'/%3E%3C/linearGradient%3E%3ClinearGradient id='c' gradientUnits='objectBoundingBox' x1='0.5' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%23048AAF'/%3E%3Cstop offset='0.5' stop-color='%230059a3' stop-opacity='0.5'/%3E%3C/linearGradient%3E%3ClinearGradient id='c2' gradientUnits='objectBoundingBox' x1='0.5' y1='1' x2='1' y2='0'%3E%3Cstop offset='0' stop-color='%23048AAF'/%3E%3Cstop offset='0.5' stop-color='%230059a3' stop-opacity='0.5'/%3E%3C/linearGradient%3E%3CradialGradient id='d' cx='1000' cy='750' r='50.2%25' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0.5' stop-color='%23a00070' stop-opacity='0.5'/%3E%3Cstop offset='1' stop-color='%23E00B43'/%3E%3C/radialGradient%3E%3C/defs%3E%3Crect fill='url(%23a)' width='2000' height='1500'/%3E%3Cg fill-opacity='0.7'%3E%3Cpath fill='url(%23b)' d='M2035 1550h-950c0 0 202-1600 950-1600h0V1550z'/%3E%3Cpath fill='url(%23b2)' d='M-35 1550L-35 1550l0-1600h950C915-50 713 1550-35 1550z'/%3E%3Cpath fill='url(%23c)' d='M2035 1550L2035 1550l-2070 0V815.7C-35 815.7 2035 971.8 2035 1550z'/%3E%3Cpath fill='url(%23c2)' d='M2035-50v734.3c0 0-2070-156.1-2070-734.3v0H2035z'/%3E%3C/g%3E%3Crect fill-opacity='0.7' fill='url(%23d)' width='2000' height='1500'/%3E%3C/svg%3E");
		background-attachment: fixed;
		background-size: cover;

		background-position: center center;
		/* mask: linear-gradient(90deg, transparent, white 20%, white 80%, transparent); */
	}

	.bg {
		overflow: hidden;
		position: relative;
		/* min-height: 200lvh; */
		z-index: 10;
		min-height: calc(var(--banner-height) * 1.7);
		@apply max-w-2xl m-auto;
	}
	.bg-2 {
		position: absolute;
		width: 96%;
		height: 50%;
		background-color: #271c7d;
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 2000 1500'%3E%3Cdefs%3E%3CradialGradient id='a' cx='1000' cy='750' r='50.7%25' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%230059a3'/%3E%3Cstop offset='1' stop-color='%23271C7D'/%3E%3C/radialGradient%3E%3ClinearGradient id='b' gradientUnits='objectBoundingBox' x1='0' y1='0' x2='1' y2='0'%3E%3Cstop offset='0' stop-color='%23048AAF' /%3E%3Cstop offset='0.35' stop-color='%230059a3' stop-opacity='0.5'/%3E%3C/linearGradient%3E%3ClinearGradient id='b2' gradientUnits='objectBoundingBox' x1='1' y1='0' x2='0' y2='0'%3E%3Cstop offset='0' stop-color='%23048AAF'/%3E%3Cstop offset='0.35' stop-color='%230059a3' stop-opacity='0.5'/%3E%3C/linearGradient%3E%3ClinearGradient id='c' gradientUnits='objectBoundingBox' x1='0.5' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%23048AAF'/%3E%3Cstop offset='0.5' stop-color='%230059a3' stop-opacity='0.5'/%3E%3C/linearGradient%3E%3ClinearGradient id='c2' gradientUnits='objectBoundingBox' x1='0.5' y1='1' x2='1' y2='0'%3E%3Cstop offset='0' stop-color='%23048AAF'/%3E%3Cstop offset='0.5' stop-color='%230059a3' stop-opacity='0.5'/%3E%3C/linearGradient%3E%3CradialGradient id='d' cx='1000' cy='750' r='50.2%25' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0.5' stop-color='%23a00070' stop-opacity='0.5'/%3E%3Cstop offset='1' stop-color='%23E00B43'/%3E%3C/radialGradient%3E%3C/defs%3E%3Crect fill='url(%23a)' width='2000' height='1500'/%3E%3Cg fill-opacity='0.7'%3E%3Cpath fill='url(%23b)' d='M2035 1550h-950c0 0 202-1600 950-1600h0V1550z'/%3E%3Cpath fill='url(%23b2)' d='M-35 1550L-35 1550l0-1600h950C915-50 713 1550-35 1550z'/%3E%3Cpath fill='url(%23c)' d='M2035 1550L2035 1550l-2070 0V815.7C-35 815.7 2035 971.8 2035 1550z'/%3E%3Cpath fill='url(%23c2)' d='M2035-50v734.3c0 0-2070-156.1-2070-734.3v0H2035z'/%3E%3C/g%3E%3Crect fill-opacity='0.7' fill='url(%23d)' width='2000' height='1500'/%3E%3C/svg%3E");
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

	@media (max-height: 650px) {
		.container {
			z-index: 13;
		}
	}

	.spacer {
		min-height: calc(var(--banner-height) + 15lvh);
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
		text-shadow: 0 0 4px black, 0 0 6px black, 0 0 8px black;
	}
	.light-text-shadow {
		text-shadow: 0 0 4px lightpink, 0 0 4px white;
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

	.link {
		@apply underline text-blue-500 italic;
	}

	a {
		@apply font-light;
	}
</style>
