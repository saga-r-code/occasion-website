<script>
	let open = false;
	function toggleMode() {
		open = !open;
	}

	let login = true;

	function handleLogout () {
		login = !login;
	}

	const logout = async () => {
    try {
        const response = await fetch('http://localhost:3000/api/user/logout', {
            method: 'POST',
            credentials: 'include',  // Include cookies in the request
        });

        const result = await response.json();
        if (response.ok) {
            alert('Logout successful!');
            window.location.href = '/'; // Redirect to login page
        } else {
            alert(result.message || 'Logout failed');
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
			<div class="flex justify-center items-end flex-wrap gap-5">
			<a href="/venue" class="text-3xl md:text-4xl font-semibold">Occasion</a>
			<i class="fa-solid fa-phone flex justify-center items-center gap-2 text-sm"><p class="underline-offset-4 underline">9324847376</p></i>
			</div>
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

				<!-- <li class="hover:underline hover:underline-offset-8"><a href="/home">Home</a></li> -->
				<li class="hover:underline hover:underline-offset-8"><a href="/venue">Venue</a></li>
				<li class="hover:underline hover:underline-offset-8"><a href="/services">Services</a></li>
				<li class="hover:underline hover:underline-offset-8"><a href="/about">About</a></li>
				<li class="hover:underline hover:underline-offset-8"><a href="/contact">Contact Us</a></li>
				
				<li>
					<button class="hover:underline hover:underline-offset-8 fa-solid fa-right-from-bracket text-xl" on:click={logout}></button>
				</li>
				
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
