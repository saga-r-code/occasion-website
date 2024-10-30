<script>
	let username = '';
	let email = '';
	let password = '';
	let confirmPassword = '';
	let showPassword = false;
	let showConfirmPassword = false;

	function clearForm() {
		username = '';
		email = '';
		password = '';
		confirmPassword = '';
	}

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
				body: JSON.stringify(data),
				credentials: 'include' // Include cookies in request
			});

			//For Password check
			if (data.password !== data.confirmPassword) {
				alert('Password and Confirm Password does not match');
				return;
			}

			if (data.password.length < 8) {
				alert('Password must be at least 8 characters long');
				return;
			}

			//For email check
			if (response.status === 409) {
				alert('Email already exists. Please use a different email.');
				return;
			}

			//response check
			if (response.ok) {
				alert('Account Created Successfully');
				clearForm();
				if (email === 'admin123@gmail.com') {
					window.location.href = 'http://localhost:5173/admin';
				} else {
					window.location.href = 'http://localhost:5173/home';
				}
			} else {
				console.log('Failed to send the message. Please try again.');
			}
		} catch (error) {
			console.error('Error submitting the form:', error);
			console.log('An error occurred. Please try again later.');
		}
	};

	const togglePasswordVisibility = () => {
		showPassword = !showPassword;
	};

	const toggleConfirmPasswordVisibility = () => {
		showConfirmPassword = !showConfirmPassword;
	};
</script>

<div class="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
	<h2 class="text-2xl font-bold text-center my-6">Sign Up</h2>
	<form on:submit={handleSubmit}>
		<div class="mb-4">
			<label class="block text-gray-700 text-sm font-bold mb-2" for="name">Username</label>
			<input
				type="text"
				id="name"
				bind:value={username}
				required
				placeholder="Enter Your Username"
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
				placeholder="Enter  Your Email"
				class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
			/>
		</div>
		<div class="mb-4 relative">
			<label class="block text-gray-700 text-sm font-bold mb-2" for="password">Password</label>

			<input
				type="password"
				id="passowrd"
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
		<div class="mb-4 relative">
			<label class="block text-gray-700 text-sm font-bold mb-2" for="confirmPassword"
				>Confirm Password</label
			>
			<input
				type="password"
				id="password"
				bind:value={confirmPassword}
				required
				placeholder="Confirm Your Password"
				class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
			/>
			<button
				class="fa-solid fa-eye-slash absolute top-10 right-4 cursor-pointer"
				on:click={toggleConfirmPasswordVisibility}
				class:fa-eye={showConfirmPassword}
				class:fa-eye-slash={!showConfirmPassword}
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
