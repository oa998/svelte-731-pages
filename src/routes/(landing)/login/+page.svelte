<script lang="ts">
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import CompanyName from '$components/company-name.svelte';
	import { login, passwordReset } from '$lib/auth';
	import { toastErrorMsg, toastMsg } from '$lib/toast';
	import { session } from '$stores/session';

	let loading = false;
	let formDirty = false;
	let showLoginForm = true;

	$: if ($session.auth) {
		toastMsg('Logged in');
		goto(`${base == '/' ? '' : base}/courses`);
	}

	$: _login = (email: string, password: string) => {
		loading = true;
		return login(email, password).then(() => (loading = false));
	};

	$: _passwordReset = (email: string) => {
		loading = true;
		return passwordReset(email)
			.then(() => document.querySelector('form')?.reset())
			.catch(() => toastErrorMsg('Password reset failed. Try again.'))
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
	<div class="bg-img-blur">
		<img class="bg-img-full" src={`${base == '/' ? '' : base}/login-hair.png`} alt="login" />
	</div>
	<input bind:checked={formDirty} hidden type="checkbox" />
	<form
		on:submit|preventDefault={onSubmit}
		on:focusin={() => {
			formDirty = true;
		}}
		class=""
	>
		<div class="form-container">
			<input
				type="text"
				name="email"
				id="email"
				pattern=".+@.+\..+"
				title="Valid email address"
				placeholder="Email"
				required
			/>
			{#if showLoginForm}
				<input
					type="password"
					name="password"
					id="password"
					pattern=".+"
					required
					title="Password"
					placeholder="Password"
				/>

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

	input {
		background: linear-gradient(180deg, rgba(0, 0, 0, 0.8) 100%, rgba(17, 130, 153, 0) 0%);
		@apply text-white font-sans;
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

	.bg-img-blur {
		position: absolute;
		top: 0;
		left: 0;
		background-image: url('/login-hair-small.png');
		background-size: cover;
		background-position: 0 30%;
		z-index: -1;
		@apply h-[100vh] w-full;
	}
	.bg-img-full {
		object-fit: cover;
		object-position: 0 30%;
		@apply h-[100vh] w-full;
	}
</style>
