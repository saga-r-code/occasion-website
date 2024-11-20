<script>
	const logout = async () => {
    try {
        const response = await fetch('http://localhost:3000/api/admin/logout', {
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

<div class="bg-[#1c2541] text-white shadow-xl border-b-white border-b-[1px] shadow-white">
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
