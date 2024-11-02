<script>
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
		<div class="navbar flex  gap-4 justify-between items-center py-4">
			<a href="/home" class="text-3xl md:text-4xl font-semibold">Occasion</a>
			<!-- icon -->

			<ul
				class={`bg-[#1c2541]   justify-center items-center list-none`}
			>
				<li>
                    <button class="fa-solid fa-right-from-bracket text-2xl "  on:click={logout}></button>
				</li>
			</ul>
		</div>
	</div>
</div>
