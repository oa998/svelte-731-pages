<script>
	import { env } from '$env/dynamic/public';
	import { toastMsg } from '$lib/toast';
	import Icon from '@iconify/svelte';

	let copied = false;
</script>

<h1 class="pb-2 text-white text-4xl sm:text-6xl font-serif text-center font-extralight">
	Services
</h1>
<div class="text-white py-20 flex flex-col gap-20">
	<div class="flex flex-col article">
		<h1 class="pb-2 text-2xl sm:text-5xl font-sans font-thin">Eyelash Extensions</h1>
		<p>
			Indulge in the allure of captivating beauty with our exquisite lash extensions at 731 Vibes.
			Elevate your natural lashes to new dimensions, framing your eyes with a touch of glamour that
			lasts. Immerse yourself in a world of lush, voluminous lashes that enhance your features and
			redefine your look. We excel at creating any look from natural lashes to dramatic lashes.
		</p>
		<a
			href="https://savannamartin.glossgenius.com/"
			target="_blank"
			class="my-3 inline-block text-base rounded-lg py-2 px-4 bg-blue-900 border border-white whitespace-nowrap font-sans cursor-pointer place-self-center"
			>Book Now with Savanna</a
		>
		<div class="text-white card">
			<div class="price-grid-double">
				<div class="hr">Full Sets</div>
				<div class="hr">Fills</div>

				<div class="type">Classic</div>
				<div class="price">$150</div>
				<div class="type">Classic</div>
				<div class="price">$60</div>

				<div class="type">Hybrid</div>
				<div class="price">$175</div>
				<div class="type">Hybrid</div>
				<div class="price">$70</div>

				<div class="type">Volume</div>
				<div class="price">$200</div>
				<div class="type">Volume</div>
				<div class="price">$80</div>
			</div>
		</div>
	</div>

	<hr />

	<div class="flex flex-col article">
		<h1 class="pb-2 text-2xl sm:text-5xl font-sans font-thin">Reiki</h1>
		<div class="flex flex-col gap-5">
			<p>
				Welcome to a realm of holistic healing and tranquility at 731 Vibes. Immerse yourself in the
				transformative energy of Reiki – a gentle, yet powerful, practice that harmonizes mind,
				body, and spirit. Our Reiki sessions offer a sacred space for relaxation, balance, and
				rejuvenation.
			</p>
			<p class="text-center emphasis">Why Book a Reiki Session with Us?</p>
			<p>Embark on a journey of self-discovery and wellness with our Reiki sessions:</p>

			<p>
				<span class="font-semibold pr-1">Energy Alignment:</span> Experience the subtle yet profound
				effects of energy alignment as our skilled Reiki practitioner channels healing energy to restore
				balance within your body.
			</p>

			<p>
				<span class="font-semibold pr-1">Stress Relief:</span> Let go of tension and stress as the soothing
				energy of Reiki envelops you, promoting a deep sense of relaxation and tranquility.
			</p>

			<p>
				<span class="font-semibold pr-1">Emotional Harmony:</span> Find emotional equilibrium as Reiki
				works to release blockages and promote a sense of inner peace, allowing you to navigate life's
				challenges with a centered mind.
			</p>

			<p>
				<span class="font-semibold pr-1">Physical Wellbeing:</span> Enhance your overall physical wellbeing
				as Reiki supports the body's natural healing processes, addressing imbalances and promoting a
				sense of vitality.
			</p>

			<p>
				<span class="font-semibold pr-1">Personalized Sessions:</span> Our experienced Reiki practitioners
				tailor each session to your unique needs, ensuring a personalized and meaningful experience that
				resonates with you.
			</p>

			<p>
				<span class="font-semibold pr-1">Safe and Nurturing Environment:</span> Relax in a safe and nurturing
				environment where the energy flows freely, creating a space for healing and self-discovery.
			</p>

			<p>
				<span
					>Take the first step towards holistic wellness – book a Reiki session at <span
						class="font-semibold">731 Vibes</span
					>. Allow the gentle touch of energy to guide you towards balance, harmony, and a renewed
					sense of well-being. Embrace the healing power of Reiki and unlock the potential for a
					healthier, more harmonious life.</span
				>
			</p>
			<a
				href={`tel:+1-${env.PUBLIC_JEN_PHONE}`}
				target="_blank"
				class="my-3 inline-block text-base rounded-lg py-2 px-4 bg-blue-900 border border-white whitespace-nowrap font-sans cursor-pointer place-self-center"
				>Book Now by calling or texting Jennifer</a
			>
			<div
				class="text-center font-thin flex flex-row items-center gap-3 place-self-center text-xs sm:text-base"
			>
				<span>Or email:</span>
				<span
					class:text-lime-300={copied}
					class="font-semibold text-sm sm:text-lg"
					style="transition: color 1s;">{env.PUBLIC_EMAIL731}</span
				>

				{#if copied}
					<Icon color="lime" icon="line-md:clipboard-check" style="font-size: xx-large;" />
				{:else}
					<button
						on:click={() => {
							navigator.clipboard.writeText(env.PUBLIC_EMAIL731);
							copied = true;
							setTimeout(() => (copied = false), 5000);
							toastMsg(`Copied to clipbard: ${env.PUBLIC_EMAIL731}`);
						}}
						class="border border-blue-600 rounded p-1 active:bg-blue-600 flex flex-row gap-2 items-center text-xs"
					>
						<span>copy</span>
						<Icon color="white" icon="ph:copy" style="font-size: large;" />
					</button>
				{/if}
			</div>
		</div>
	</div>

	<hr />

	<div class="flex flex-col article">
		<h1 class="pb-2 text-2xl sm:text-5xl font-sans font-thin">Teeth Whitening</h1>
		<div class="flex flex-col gap-5">
			<p>
				Illuminate your smile and boost your confidence with our professional teeth whitening
				sessions at 731 Vibes. Unveil a brighter, whiter, and more radiant smile in just one
				session. Discover the transformative power of our advanced teeth whitening techniques,
				tailored to enhance your natural beauty and leave you with a dazzling, radiant grin.
			</p>
			<p class="text-center emphasis">Why Book a Teeth Whitening Session with Us?</p>
			<p>
				Experience the radiance of a whiter smile with our specialized teeth whitening sessions:
			</p>

			<p>
				<span class="font-semibold pr-1">Professional Expertise:</span> Trust in the hands of our experienced
				professionals who utilize advanced techniques and industry-leading whitening products for safe
				and effective results.
			</p>

			<p>
				<span class="font-semibold pr-1">Customized Approach:</span> Our teeth whitening sessions are
				personalized to your unique dental needs and preferences, ensuring a customized treatment that
				delivers optimal results without compromising the health of your teeth.
			</p>

			<p>
				<span class="font-semibold pr-1">Quick and Convenient:</span> Achieve a brighter smile in just
				one session, saving you time and providing immediate results. Our efficient teeth whitening process
				fits seamlessly into your busy schedule.
			</p>

			<p>
				<span class="font-semibold pr-1">Safe and Gentle:</span> Rest easy knowing that our teeth whitening
				treatments are designed with your comfort in mind. We prioritize the health of your teeth and
				gums, delivering stunning results without sensitivity concerns.
			</p>

			<p>
				<span class="font-semibold pr-1">Confidence Boost:</span> Reveal a brighter, whiter smile that
				enhances your overall appearance and boosts your self-confidence. Smile with pride and let your
				newfound radiance shine.
			</p>

			<p>
				<span
					>Uncover the brilliance of a whiter smile at <span class="font-semibold">731 Vibes</span>.
					Book your teeth whitening session today and embark on a journey to a more vibrant,
					confident you. Radiate positivity with a luminous smile that leaves a lasting impression.</span
				>
			</p>

			<a
				href="https://savannamartin.glossgenius.com/"
				target="_blank"
				class="my-3 inline-block text-base rounded-lg py-2 px-4 bg-blue-900 border border-white whitespace-nowrap font-sans cursor-pointer place-self-center"
				>Book Now with Savanna</a
			>
		</div>
	</div>
	<hr />

	<div class="flex flex-col article">
		<h1 class="pb-2 text-2xl sm:text-5xl font-sans font-thin">Body Waxing</h1>
		<div class="flex flex-col gap-5">
			<p>
				Embrace smooth, silky skin and the confidence that comes with it by booking a body waxing
				session at 731 Vibes. Our skilled estheticians provide a meticulous and comfortable waxing
				experience, leaving you with impeccably smooth results that last. Say goodbye to unwanted
				hair and hello to a renewed sense of beauty and self-assurance.
			</p>
			<p class="text-center emphasis">Why Book a Body Waxing Session with Us?</p>
			<p>Discover the benefits of choosing our body waxing services:</p>

			<p>
				<span class="font-semibold pr-1">Professional Precision:</span> Trust in the expertise of our
				skilled estheticians who bring professionalism and precision to every waxing session, ensuring
				optimal results with minimal discomfort.
			</p>

			<p>
				<span class="font-semibold pr-1">Quality Waxing Products:</span> We use top-quality, gentle waxing
				products that cater to different skin types, providing a smooth and effective hair removal experience
				without compromising your skin's health.
			</p>

			<p>
				<span class="font-semibold pr-1">Lasting Smoothness:</span> Experience long-lasting smoothness
				as our body waxing technique removes hair from the root, delaying regrowth and leaving your skin
				silky and hair-free for an extended period.
			</p>

			<p>
				<span class="font-semibold pr-1">Customized Waxing Options:</span> Tailor your waxing experience
				to your preferences with our range of customized waxing options. From full-body waxing to specific
				areas, we offer flexibility to meet your unique grooming needs.
			</p>

			<p>
				<span class="font-semibold pr-1">Comfortable Environment:</span> Relax in a comfortable and hygienic
				environment designed to make your waxing experience as pleasant as possible. Our spa setting
				creates a serene atmosphere for a stress-free session.
			</p>

			<p>
				<span class="font-semibold pr-1">Efficiency and Time-Saving:</span> Our efficient waxing process
				ensures a quick and time-saving experience, perfect for those with busy schedules who want to
				achieve smooth, hair-free skin without sacrificing their valuable time.
			</p>

			<p>
				<span
					>Revel in the luxury of smooth skin and the confidence it brings. Book your body waxing
					session at <span class="font-semibold">731 Vibes</span> and step into a world where beauty
					meets precision. Unveil a more confident and radiant you with our expert body waxing services.</span
				>
			</p>

			<a
				href="https://savannamartin.glossgenius.com/"
				target="_blank"
				class="my-3 inline-block text-base rounded-lg py-2 px-4 bg-blue-900 border border-white whitespace-nowrap font-sans cursor-pointer place-self-center"
				>Book Now with Savanna</a
			>
		</div>
		<div class="text-white card">
			<div class="price-grid-double wax">
				<div class="type">Lip</div>
				<div class="price">$10</div>

				<div class="type">Lip and Brow</div>
				<div class="price">$15</div>

				<div class="type">Nose Wax</div>
				<div class="price">$5</div>

				<div class="type">Chin</div>
				<div class="price">$10</div>

				<div class="type">Full Face</div>
				<div class="price">$30</div>

				<div class="type">Arm Pit</div>
				<div class="price">$25</div>

				<div class="type">Half Arm</div>
				<div class="price">$20</div>

				<div class="type">Full Arm</div>
				<div class="price">$50</div>

				<div class="type">Chest</div>
				<div class="price">$30</div>

				<div class="type">Stomach</div>
				<div class="price">$25</div>

				<div class="type">Back</div>
				<div class="price">$40</div>

				<div class="type">Half Leg</div>
				<div class="price">$65</div>

				<div class="type">Full Leg</div>
				<div class="price">$85</div>

				<div class="type">Bikini</div>
				<div class="price">$30</div>

				<div class="type">Brazilian</div>
				<div class="price">$60</div>
			</div>
		</div>
	</div>
	<hr />
</div>

<!--

-->

<style lang="postcss">
	.price-grid-double {
		grid-template-columns: 1fr min-content 1fr min-content;
		@apply grid max-w-fit;
	}

	.price-grid-double:not(.wax) :nth-child(4n + 4) {
		/* @apply pr-20 bg-black; */
		@apply pr-20;
	}

	.price-grid-double.wax :nth-child(4n-2) {
		/* @apply pr-14 bg-blue-400; */
		@apply pr-14;
	}

	.price-grid-double.wax {
		@apply text-sm;
	}

	@media (min-width: 500px) {
		.price-grid-double.wax :nth-child(4n-2) {
			/* @apply pr-20 bg-blue-400; */
			@apply pr-20;
		}
		.price-grid-double.wax {
			@apply text-lg;
		}
	}

	.price-grid-double .type {
		@apply pr-2;
	}
	.hr {
		@apply font-bold underline;
		grid-column: span 2;
	}
	.card {
		@apply p-5 border-2 border-black flex flex-col items-center gap-5 rounded-lg bg-indigo-900 bg-opacity-70;
	}

	.article p {
		@apply text-base sm:text-lg font-serif font-light;
	}
	.article p.emphasis {
		@apply font-normal font-sans text-lg sm:text-2xl py-8;
	}
</style>
