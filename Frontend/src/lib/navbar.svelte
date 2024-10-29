<script>
	let open = false;
	function toggleMode() {
		open = !open;
	}

	const logout = async () => {
		try {
			const response = await fetch('http://localhost:3000/api/user/logout', {
				method: 'POST',
				credentials: 'include' // Send cookies with the request
			});

			if (response.ok) {
				alert('Logged out successfully!');
				window.location.href = 'http://localhost:5173/login'; // Redirect to login page
			} else {
				console.log('Logout failed:', response.statusText);
				alert('Logout failed. Please try again.');
			}
		} catch (error) {
			console.error('Error during logout:', error);
			alert('An error occurred. Please try again.');
		}
	};
</script>

<div class="bg-[#1c2541] text-white">
	<div class="w-[90%] m-auto">
		<div class="navbar flex flex-wrap gap-4 justify-between items-center py-5">
			<a href="/home" class="text-3xl md:text-4xl font-semibold">Occasion</a>
			<!-- icon -->
			<button
				class="fa-solid text-white text-xl hampburger cursor-pointer"
				class:fa-bars={!open}
				class:fa-xmark={open}
				on:click={toggleMode}
			></button>

			<ul
				class={`bg-[#1c2541] z-40 md:bg-transparent right-0 w-full   py-10 top-16 flex flex-col justify-center items-center list-none gap-10 md:w-fit md:py-0 md:gap-7 md:flex md:flex-row md:static md:text-lg`}
				class:absolute={open}
				class:hidden={!open}
			>
				<div class="md:hidden flex justify-center items-center gap-10 bg-[#50808e] px-3 rounded-md">
					<input
						type="text"
						name="search"
						id="search"
						placeholder="Search....."
						class="bg-transparent py-2 outline-none placeholder:text-white placeholder:font-semibold font-semibold text-white"
					/>
					<i class="fa-solid fa-magnifying-glass text-white"></i>
				</div>

				<li class="hover:underline hover:underline-offset-8"><a href="/home">Home</a></li>
				<li class="hover:underline hover:underline-offset-8"><a href="/venue">Venue</a></li>
				<li class="hover:underline hover:underline-offset-8"><a href="/services">Services</a></li>
				<li class="hover:underline hover:underline-offset-8"><a href="/about">About</a></li>
				<li class="hover:underline hover:underline-offset-8"><a href="/contact">Contact Us</a></li>
				<li><button class="hover:underline hover:underline-offset-8" on:click={logout}>Logout</button></li>
			</ul>
		</div>
	</div>
</div>

<style>
	.hampburger {
		@media (min-width: 768px) {
			display: none;
		}
	}
</style>
