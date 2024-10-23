<script>
	let username = '';
	let email = '';
	let password = '';
	let confirmPassword = '';

	const handleSubmit = async (e) => {
		e.preventDefault();

		const data = {
			username,
			email,
			password,
			confirmPassword
		};

		try {
			// Send the data to the backend and store in database
			const response = await fetch('http://localhost:3000/api/user/signup', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(data)
			});

			//For Password check
			if (password === confirmPassword) {
				alert('Account Created Sucessfully');
			} else {
				alert('Password and Confirm Password does not match');
			}

			//response check
			if (response.ok) {
				console.log('Your message has been sent successfully!');
			} else {
				console.log('Failed to send the message. Please try again.');
			}
		} catch (error) {
			console.error('Error submitting the form:', error);
			console.log('An error occurred. Please try again later.');
		}
	};

	export let open = false;
	export let togglemodal;

	const toggleye = (id) => {
		let eye = document.getElementById(id);
		if (eye.type === 'password') {
			eye.type = 'text';
		} else {
			eye.type = 'password';
		}
	};
</script>

{#if open}
	<div
		class="w-dvw h-dvh absolute bg-[rgba(0,0,0,0.7)] justify-center items-start md:items-center p-2 py-14 sm:py-0 z-30 flex"
	>
		<div class="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
			<button
				class="fa-solid fa-xmark text-2xl -mt-3 float-right cursor-pointer"
				on:click={togglemodal}
			></button>
			<h2 class="text-2xl font-bold text-center my-6">Sign Up</h2>
			<form on:submit={handleSubmit}>
				<div class="mb-4">
					<label class="block text-gray-700 text-sm font-bold mb-2" for="name">Username</label>
					<input
						type="text"
						id="name"
						bind:value={username}
						required
						class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					/>
				</div>
				<div class="mb-4">
					<label class="block text-gray-700 text-sm font-bold mb-2" for="email">Email</label>
					<input
						type="email"
						id="email"
						bind:value={email}
						required
						class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					/>
				</div>
				<div class="mb-4 relative">
					<label class="block text-gray-700 text-sm font-bold mb-2" for="password">Password</label>

					<input
						type="password"
						id="password"
						bind:value={password}
						required
						class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					/>
					<button
						class="fa-solid fa-eye absolute top-10 right-4 cursor-pointer"
						on:click={() => toggleye('password')}
					></button>
				</div>
				<div class="mb-4 relative">
					<label class="block text-gray-700 text-sm font-bold mb-2" for="confirmPassword"
						>Confirm Password</label
					>
					<input
						type="password"
						id="confirmPassword"
						bind:value={confirmPassword}
						required
						class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					/>
					<button
						class="fa-solid fa-eye-slash absolute top-10 right-4 cursor-pointer"
						on:click={() => toggleye('confirmPassword')}
					></button>
				</div>
				<div class="flex items-center justify-between">
					<button
						type="submit"
						class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
					>
						Sign Up
					</button>
				</div>
			</form>
		</div>
	</div>
{/if}
