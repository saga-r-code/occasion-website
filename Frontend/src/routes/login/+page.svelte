<script>
	import Navbar from "$lib/navbar.svelte";

	let email = '';
	let password = '';
	let errorMessage = '';

	function clearForm() {
		email = '';
		password = '';
	}

	const handleSubmit = async () => {
		// e.preventDefault(); // Prevent default form submission
		const data = {
			email,
			password
		};

		// Check if email and password are provided
		if (!email || !password) {
			alert('please fill up the login page');
		}

		try {
			const response = await fetch('http://localhost:3000/api/user/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(data)
			});

			const result = await response.json();
			console.log(result);

			if (response.ok) {
				alert('Login successful!');
				window.location.href = 'http://localhost:5173/';
				clearForm();
			} else {
				alert('Invalid email or password');
			}
		} catch (error) {
			console.error('Error submitting the form:', error);
			console.log('An error occurred. Please try again later.');
		}
	};
</script>

<Navbar />
<div
	class="w-dvw h-[100vh] fixed top-0  justify-center items-start md:items-center p-2 py-14 sm:py-0 z-30 flex"
>
	<div class="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
		<button class="fa-solid fa-xmark text-2xl -mt-3 float-right cursor-pointer" on:click={clearForm}
		></button>
		<h2 class="text-2xl font-bold text-center my-6">Login</h2>
		{#if errorMessage}
			<div class="text-red-500 text-center mb-4">{errorMessage}</div>
		{/if}
		<form on:submit={handleSubmit}>
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
				<button class="fa-solid absolute top-10 right-4 cursor-pointer"></button>
			</div>
			<div class="flex items-center justify-between">
				<button
					type="submit"
					class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
				>
					Login
				</button>
				<a href="/signup" class="underline text-blue-700">Signup &rarr;</a>
			</div>
		</form>
	</div>
</div>
