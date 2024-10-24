<script>
	let open = false;
	function toggleMode() {
		open = !open;
	}
</script>

<div class="bg-[#1c2541] text-white">
	<div class="w-[90%] m-auto">
		<!-- <div
		class="top text-lg flex flex-wrap gap-4 md:gap-12 justify-end items-center md:py-5 font-medium"
	>
		<div class="hidden md:flex gap-3 md:gap-5">
			<button class="border-[#50808e] border-2 rounded-full px-3 py-1 md:px-5 ">LOGIN</button>
			<button class="bg-[#50808e] px-3 py-1 md:px-5  rounded-full active:bg-[#386370]"
				>SIGNUP</button
			>
		</div>
	</div> -->

		<div class="navbar flex flex-wrap gap-4 justify-between items-center py-5">
			<a href="/" class="text-3xl md:text-4xl font-semibold">Occasion</a>
			<!-- icon -->
			<button
				class="fa-solid text-white text-xl hampburger cursor-pointer"
				class:fa-bars={!open}
				class:fa-xmark={open}
				on:click={toggleMode}
			></button>

			<ul
				class={`bg-[#1c2541] z-40 md:bg-transparent right-0 w-full   py-10 top-16 flex flex-col justify-center items-center list-none gap-10 md:w-fit md:py-0 md:gap-8 md:flex md:flex-row md:static md:text-lg`}
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
				<li><a href="/">Home</a></li>
				<li><a href="/venue">Venue</a></li>
				<li><a href="/services">Services</a></li>
				<li><a href="/about">About</a></li>
				<li><a href="/contact">Contact Us</a></li>
				<li><a href="/signup">Sign Up</a></li>
				<div
					class="cursor-pointer hidden md:flex bg-[#50808e] rounded-full p-2 md:p-3 justify-center items-center"
				>
					<i class="fa-solid fa-magnifying-glass text-white"></i>
				</div>
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
