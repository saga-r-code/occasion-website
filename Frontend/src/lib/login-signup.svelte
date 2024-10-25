<script>
	import Signup from './signup-page.svelte';
	let email = '';
	let password = '';
    let showPassword = false;


	

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
				clearForm();
				window.location.href = 'http://localhost:5173/home';
			} else {
				alert('Invalid Credtional');
			}
		} catch (error) {
			console.error('Error submitting the form:', error);
			console.log('An error occurred. Please try again later.');
		}
	};

    const  togglePasswordVisibility = () => {
        showPassword = !showPassword;
        }
</script>

<div class="pages">
	<div class="container xl:w-[80%] h-[100vh] mx-auto">
		<h1 class="text-5xl p-5 font-bold text-center text-white">Occasion Event Mangement</h1>
		<div class="flex justify-around items-center flex-wrap p-2 gap-10 py-10 lg:py-20">
			<Signup />
			<div class="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
				<h2 class="text-2xl font-bold text-center my-6">Login</h2>

				<form on:submit={handleSubmit}>
					<div class="mb-4">
						<label class="block text-gray-700 text-sm font-bold mb-2" for="email">Email</label>
						<input
							type="email"
							id="email"
							bind:value={email}
							required
							placeholder="Enter Your Email"
							class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						/>
					</div>
					<div class="mb-4 relative">
						<label class="block text-gray-700 text-sm font-bold mb-2" for="password">Password</label
						>
						<input
							type="password"
							id="password"
                            bind:value={password}
							required
							placeholder="Enter Your Password"
							class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						/>
						<button
							class="fa-solid absolute top-10 right-4 cursor-pointer"
							on:click={togglePasswordVisibility}
							class:fa-eye={showPassword}
							class:fa-eye-slash={!showPassword}
						></button>
					</div>
					<div class="flex items-center justify-between">
						<button
							type="submit"
							class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
						>
							Login
						</button>
					</div>
				</form>
			</div>
		</div>

		<a href="/home" class="px-5 pb-10 flex justify-end items-center gap-5 text-white"
			><h3 class="text-xl font-semibold tracking-widest underline underline-offset-4">Skip</h3>
			<i class="fa-solid fa-circle-arrow-right text-4xl"></i></a
		>
	</div>
</div>

<style>
	.pages,
	.container {
		background-image: linear-gradient(to bottom, #142b4e, #0a3656, #00405d, #004a62, #075466);
	}
</style>
