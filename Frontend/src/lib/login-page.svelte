<script>
	import { onMount } from 'svelte';
	
	let email = '';
	let password = '';
	let showPassword = false;
	let isLogin = false;
	export let open = false;
  
	// Clear the form after submitting or closing modal
	function clearForm() {
	  email = '';
	  password = '';
	}
  
	// Toggle modal visibility
	function togglemodal() {
	  clearForm();
	  open = !open;
	}
  
	// Handle login form submission
	const handleSubmit = async () => {
	  if (!email || !password) {
		alert('Please fill up the login page');
		return;
	  }
  
	  try {
		const response = await fetch('http://localhost:3000/api/user/login', {
		  method: 'POST',
		  headers: { 'Content-Type': 'application/json' },
		  body: JSON.stringify({ email, password }),
		  credentials: 'include', // Include cookies
		});
  
		const result = await response.json();
  
		if (response.ok) {
		  if (result.message === 'User already logged in') {
			alert('You are already logged in!');
			isLogin = true; // User is logged in
			document.cookie = "isLogin=true; path=/";  // Store login state in cookie
			window.location.href = 'http://localhost:5173/venue'; // Redirect to home page
		  } else {
			alert('Login successful!');
			document.cookie = "isLogin=true; path=/";  // Store login state in cookie
			isLogin = true; // Update local state
			window.location.href = 'http://localhost:5173/venue'; // Redirect to home page
		  }
		} else {
		  alert(result.message || 'Login failed');
		}
	  } catch (error) {
		console.error('Error during login:', error);
		alert('An error occurred. Please try again.');
	  }
	};
  
	// Toggle password visibility
	const togglePasswordVisibility = () => {
	  showPassword = !showPassword;
	};
  
	// Check if user is logged in on page load (check cookies)
	onMount(() => {
	  const cookies = document.cookie.split('; ');
	  const isLoginCookie = cookies.find(cookie => cookie.startsWith('isLogin='));
	  
	  if (isLoginCookie) {
		const isLoginValue = isLoginCookie.split('=')[1];
		isLogin = isLoginValue === 'true';
	  }
  
	  // If user is logged in, don't show the modal
	//   open = !isLogin;  // Open modal only if not logged in
	});
  </script>
  
  {#if open && !isLogin} <!-- Show modal only when open is true and user is not logged in -->
	<div class="w-dvw h-[100vh] fixed top-0 bg-[rgba(0,0,0,0.7)] justify-center items-start md:items-center p-2 py-14 sm:py-0 z-50 flex">
	  <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
		<button
		  class="fa-solid fa-xmark text-2xl -mt-3 float-right cursor-pointer"
		  on:click={togglemodal}
		></button>
  
		<h2 class="text-2xl font-bold text-center my-6">Login</h2>
  
		<form on:submit|preventDefault={handleSubmit}>
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
			<label class="block text-gray-700 text-sm font-bold mb-2" for="password">Password</label>
			<input
			  type='password'
			  id="password"
			  bind:value={password}
			  required
			  placeholder="Enter Your Password"
			  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
			/>
			<button
			  type="button"
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
			<a href="/" class="underline text-blue-700">Signup &rarr;</a>
		  </div>
		</form>
	  </div>
	</div>
  {/if}
  