<script lang="ts">
	import CompanyName from '$components/company-name.svelte';
	import { login, passwordReset } from '$lib/auth';
	import { toastErrorMsg, toastMsg } from '$lib/toast';

	let loading = false;
	let formDirty = false;
	let showLoginForm = true;

	$: _login = (email: string, password: string) => {
		loading = true;
		return login(email, password)
			.then(() => toastMsg('Logged in'))
			.catch((e) => toastErrorMsg('Login failed. Try again.'))
			.then(() => (loading = false));
	};

	$: _passwordReset = (email: string) => {
		loading = true;
		return passwordReset(email)
			.then(() => {
				toastMsg(`Password reset sent for ${email}`);
				document.querySelector('form')?.reset();
			})
			.catch((e) => toastErrorMsg('sword reset failed. Try again.'))
			.then(() => (loading = false));
	};

	$: onSubmit = (
		e: Event & {
			readonly submitter: HTMLElement | null;
		} & {
			currentTarget: EventTarget & HTMLFormElement;
		}
	) => {
		const formData = new FormData(e.currentTarget);
		if (showLoginForm) _login(formData.get('email') as string, formData.get('password') as string);
		else {
			_passwordReset(formData.get('email') as string);
		}
	};
</script>

<div class="relative">
	<CompanyName class="text-6xl absolute top-0 left-0" />
	<div class="bg-img" />
	<input bind:checked={formDirty} hidden type="checkbox" />
	<form
		on:submit|preventDefault={onSubmit}
		on:focusin={() => {
			formDirty = true;
		}}
		class=""
	>
		<div class="form-container">
			<div class="form-label">
				<label for="email">Email:</label>
				<input
					type="text"
					name="email"
					id="email"
					pattern=".+@.+\..+"
					title="Valid email address"
					required
				/>
			</div>
			{#if showLoginForm}
				<div class="form-label">
					<label for="password">Password:</label>
					<input
						type="password"
						name="password"
						id="password"
						pattern=".+"
						required
						title="Password"
					/>
				</div>

				<button type="submit" id="login" disabled={loading}>LOG IN</button>
			{:else}
				<button type="submit" id="login" disabled={loading}>Send password reset</button>
			{/if}
			<label for="password-reset">{showLoginForm ? 'Forgot Password' : 'Return to login'}</label>
			<input
				type="checkbox"
				name="password-reset"
				bind:checked={showLoginForm}
				id="password-reset"
				hidden
			/>
		</div>
	</form>
</div>

<style lang="postcss">
	form {
		transition: all 200ms;
	}
	/*sm*/
	@media (max-width: 640px) {
		input[type='checkbox']:checked ~ form {
			height: 50vh;
		}
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
		text-shadow: 0 0 2px black;
		@apply text-right pr-2 text-white;
	}

	form {
		@apply flex flex-col max-w-xs whitespace-nowrap m-auto h-[100vh] justify-center;
	}

	.form-container {
		background: linear-gradient(180deg, var(--bondi-blue) 0%, rgba(221, 23, 116, 0) 90%);
		@apply w-full flex flex-col py-5 px-2 rounded-lg gap-2;
	}

	form input {
		@apply border-b border-black px-2;
	}

	button#login {
		@apply border border-black py-1 px-5 rounded text-white disabled:bg-opacity-5 disabled:text-opacity-20;
	}

	label[for='password-reset'] {
		text-shadow: 1px 1px 4px black;
		align-self: end;
		@apply mt-5 underline py-1 rounded text-white text-xs italic w-min;
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
</style>
