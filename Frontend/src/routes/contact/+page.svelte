<script>
	import Category_2 from '$lib/categoryContainer/category-2.svelte';
	import Footer from '$lib/footer.svelte';
	import InfoContainer from '$lib/info-container.svelte';
	import Navbar from '$lib/navbar.svelte';

	let fullname = '';
	let contact = '';
	let email = '';
	let address = {
		flat_bldg: '',
		street_name: '',
		landmark: '',
		city: '',
		state: '',
		pincode: ''
	};
	let message = '';

	async function handlesubmit(e) {
		e.preventDefault(); // Prevent the default form submission

		const formData = {
			fullname,
			contact,
			email,
			flat_bldg: address.flat_bldg,
			street_name: address.street_name,
			landmark: address.landmark,
			city: address.city,
			state: address.state,
			pincode: address.pincode,
			message
		};

		try {
			// Send the data to the backend and store in database
			const response = await fetch('http://localhost:3000/api/user/booking', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(formData)
			});
			 //response check
			if (response.ok) {
				console.log('Your message has been sent successfully!');
			} else {
				console.log('Failed to send the message. Please try again.');
			}
		} 
		catch (error) {
			console.error('Error submitting the form:', error);
			console.log('An error occurred. Please try again later.');
		}

		// Clear the form after submission
		fullname = '';
		contact = '';
		email = '';
		address.flat_bldg = '';
		address.street_name = '';
		address.landmark = '';
		address.city = '';
		address.state = '';
		address.pincode = '';
		message = '';
	}
</script>

<Navbar />
<div class="contact">
	<Category_2 title="We Are Occasion" />
	<div class="form-conatiner w-[80%] mx-auto py-10 text-white">
		<h1 class="font-bold text-3xl pb-10">Say Hello !</h1>
		<div
			class="form-details items-center justify-center flex 2xl:gap-56 gap-20 flex-wrap 2xl:flex-nowrap"
		>
			<form on:submit={handlesubmit} class="flex flex-col gap-10">
				<div class="flex justify-center flex-col gap-2">
					<label class="font-bold text-xl" for="name">Full Name:</label>
					<input
						type="text"
						class="name placeholder:font-bold placeholder:text-lg w-fit py-2 sm:py-3 md:py-4 px-5 sm:pr-32 md:pr-48 rounded-lg placeholder:text-slate-300 bg-opacity-30 backdrop-blur-md bg-white shadow-md"
						placeholder="Enter Name"
						bind:value={fullname}
						required
					/>
				</div>
				<div class="flex justify-center flex-col gap-2">
					<label class="font-bold text-xl" for="no">Contact Number:</label>
					<input
						type="text"
						class="number placeholder:font-bold placeholder:text-lg w-fit py-2 sm:py-3 md:py-4 px-5 sm:pr-32 md:pr-48 rounded-lg placeholder:text-slate-300 bg-opacity-30 backdrop-blur-md bg-white shadow-md"
						placeholder="Enter Number"
						bind:value={contact}
						required
					/>
				</div>

				<div class="flex justify-center flex-col gap-2">
					<label class="font-bold text-xl" for="email">Email Address:</label>
					<input
						type="email"
						class="email placeholder:font-bold placeholder:text-lg w-fit py-2 sm:py-3 md:py-4 px-5 sm:pr-32 md:pr-48 rounded-lg placeholder:text-slate-300 bg-opacity-30 backdrop-blur-md bg-white shadow-md"
						placeholder="Enter Email"
						bind:value={email}
						required
					/>
				</div>
				<div class="flex justify-center flex-col gap-2">
					<label for="address" class="text-xl font-bold">Address:-</label>
					<div class="flex gap-5 flex-wrap">
						<input
							type="text"
							class="placeholder:font-bold placeholder:text-lg 2xl:w-34 py-2 px-2 rounded-lg placeholder:text-slate-300 bg-opacity-30 backdrop-blur-md bg-white shadow-md"
							placeholder="Flat No. & Bldg Name"
							bind:value={address.flat_bldg}
						/>
						<input
							type="text"
							class="placeholder:font-bold placeholder:text-lg 2xl:w-32 py-2 px-2 rounded-lg placeholder:text-slate-300 bg-opacity-30 backdrop-blur-md bg-white shadow-md"
							placeholder="Street Name"
							bind:value={address.street_name}
						/>
						<input
							type="text"
							class="placeholder:font-bold placeholder:text-lg 2xl:w-28 py-2 px-2 rounded-lg placeholder:text-slate-300 bg-opacity-30 backdrop-blur-md bg-white shadow-md"
							placeholder="Landmark"
							bind:value={address.landmark}
						/>
						<input
							type="text"
							class="placeholder:font-bold placeholder:text-lg 2xl:w-28 py-2 px-2 rounded-lg placeholder:text-slate-300 bg-opacity-30 backdrop-blur-md bg-white shadow-md"
							placeholder="City"
							bind:value={address.city}
						/>
						<input
							type="text"
							class="placeholder:font-bold placeholder:text-lg 2xl:w-28 py-2 px-2 rounded-lg placeholder:text-slate-300 bg-opacity-30 backdrop-blur-md bg-white shadow-md"
							placeholder="State"
							bind:value={address.state}
						/>
						<input
							type="number"
							class="placeholder:font-bold placeholder:text-lg 2xl:w-32 py-2 px-2 rounded-lg placeholder:text-slate-300 bg-opacity-30 backdrop-blur-md bg-white shadow-md"
							placeholder="PIN Code"
							bind:value={address.pincode}
						/>
					</div>
				</div>
				<div class="flex justify-center flex-col gap-2">
					<label class="font-bold text-xl" for="mess">Message:</label>
					<textarea
						name="message"
						placeholder="Enter Your Message"
						bind:value={message}
						class="p-5 rounded-xl max-h-72 min-h-44 placeholder:font-bold placeholder:text-lg placeholder:text-slate-300 bg-opacity-30 backdrop-blur-md bg-white shadow-md"
					></textarea>
				</div>

				<button
					class="bg-[#50808E] hover:bg-[#284e59] hover:shadow-black shadow-inner text-white font-bold text-xl py-3 rounded-xl"
					>Submit</button
				>
			</form>

			<div class="details flex justify-center items-center flex-col gap-10 text-white">
				<div class="flex flex-col gap-2">
					<h3 class="text-2xl font-bold">Vendor</h3>
					<p class="text-xl">
						If you are a registered vendor or a business looking to promote your brand on our
						portal, please send in your queries at
						<a href="/">vendors@comany.com</a>
					</p>
				</div>
				<div class="flex flex-col gap-2">
					<h3 class="text-2xl font-bold">Marketing Collaborations</h3>
					<p class="text-xl">
						For brand collaborations - sponsored content, social media activations etc., please
						write into
						<a href="/"> partnerships@comany.com</a>
					</p>
				</div>
				<div class="flex flex-col gap-2">
					<h3 class="text-2xl font-bold">Wedding Submissions</h3>
					<p class="text-xl">
						Occasion features wedding across cultures, styles and budgets. To submit your wedding,
						kindly email us 15-20 photos at
						<a href="/">submissions@comany.com</a>
					</p>
				</div>
				<div class="flex flex-col gap-2">
					<h3 class="text-2xl font-bold">Careers</h3>
					<p class="text-xl">
						We are a team of passionate young minds looking to reinvent the wedding space. Please
						check our careers page for current openings and email us at
						<a href="/">hr@comany.com</a>
					</p>
				</div>
				<div class="flex flex-col gap-2">
					<h3 class="text-2xl font-bold">Customers</h3>
					<p class="text-xl">
						We love to hear from our precious users. For any feedback or queries simply write in to
						<a href="/">info@comany.com</a>
					</p>
				</div>
			</div>
		</div>
		<InfoContainer />
	</div>

	<Footer />
</div>
