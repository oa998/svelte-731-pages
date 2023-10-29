<script lang="ts">
	import CompanyName from '$components/company-name.svelte';
	import { login } from '$lib/auth';
	// @ts-ignore
	import { toast } from '@zerodevx/svelte-toast';

	let email = '';
	let password = '';
	let loading = false;

	$: _login = () => {
		loading = true;
		login(email, password)
			.then(() => {
				toast.push('Logged in');
			})
			.catch((e) => {
				toast.push('Login failed. Try again.', {
					theme: {
						'--toastBackground': 'RGBA(220, 20, 60, 0.7)'
					}
				});
			})
			.then(() => (loading = false));
	};
</script>

<div class="relative">
	<CompanyName class="text-6xl absolute top-0 left-0" />
	<div class="bg-img" />
	<form
		on:submit|preventDefault={() => {}}
		class="flex flex-col max-w-xs whitespace-nowrap m-auto h-[100vh] focus-within:h-[50vh] sm:focus-within:h-[100vh] justify-center"
	>
		<div class="form-container flex flex-col py-5 px-2 rounded-lg gap-2">
			<div class="form-label">
				<label for="email">Email:</label>
				<input type="text" class="border-b border-black px-2" id="email" bind:value={email} />
			</div>
			<div class="form-label">
				<label for="password">Password:</label>
				<input type="text" class="border-b border-black px-2" id="password" bind:value={password} />
			</div>

			<button
				id="login"
				class="border border-black py-1 px-5 rounded text-white disabled:bg-opacity-5 disabled:text-opacity-20"
				style=""
				disabled={loading}
				on:click={_login}>LOG IN</button
			>
			<button
				class="mt-5 underline py-1 rounded text-white text-xs italic w-min"
				style="text-shadow: 1px 1px 4px black; align-self: end;"
				on:click={() => {}}
			>
				Forgot my login
			</button>
		</div>
	</form>
</div>

<style lang="postcss">
	form {
		transition: all 1s;
	}
	button:first-of-type {
		@apply mt-3;
	}
	#login:not(:disabled) {
		background: rgb(17 130 153);
	}
	.form-label {
		display: grid;
		grid-template-columns: 80px 1fr;
		@apply text-sm italic font-serif;
	}

	input {
		background: linear-gradient(180deg, rgba(0, 0, 0, 0.8) 100%, rgba(17, 130, 153, 0) 0%);
		@apply text-white font-sans;
	}

	.form-label > label {
		text-shadow: 0 0 1px white;
		@apply text-right pr-2;
	}

	.form-container {
		/* background: linear-gradient(180deg, rgb(17 130 153) 0%, rgba(221, 23, 116, 0) 100%); */
		background: linear-gradient(
			180deg,
			var(--bondi-blue) 0%,
			/* rgba(221, 23, 116, 0.5) 70%, */ rgba(221, 23, 116, 0) 90%
		);
		@apply w-full;
	}

	.bg-img {
		position: absolute;
		top: 0;
		left: 0;
		background-image: url('https://cdn.discordapp.com/attachments/1030661591638745179/1167618963480526990/oa998_wavy_hair_svg_vector_colorful_full_screen_bright_abstract_99a2691b-4100-48ea-9c8a-a891ac516804.png?ex=654ec8e6&is=653c53e6&hm=ff14ebcac829cdc5aa20853ada2469bb75c21e8ae9874f9085859d4b5b11908d&');
		background-size: cover;
		background-position-y: 30%;
		z-index: -1;
		@apply h-[100vh] w-full;
	}

	/* :global(svg#wave) {
		display: none;
	}

	:global(header#company-name) {
		font-size: 4em;
		padding: 3rem 0 0 3rem;
		background: transparent;
	} */
</style>
