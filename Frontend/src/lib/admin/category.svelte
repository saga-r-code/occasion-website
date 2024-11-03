<script>
	import Headline from '$lib/headline.svelte';
	import { onMount } from 'svelte';

	let categories = []; // Categories array
	let venue = [];
	let selectedCategory = ''; // Bind selected category value
	let image = ''; // Image file
	let title = '';
	let location = '';
	let rating = 0;
	let old_price = 0;
	let new_price = 0;

	let modal = false;

	function toggle() {
		modal = !modal;
	}

	const fetchCategory = async () => {
		try {
			const response = await fetch('http://localhost:3000/api/admin/category');
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			const fetchedCategories = await response.json();
			const result = Array.isArray(fetchedCategories) ? fetchedCategories : [];
			categories = result;
		} catch (error) {
			console.error('Error fetching categories:', error);
		}
	};

	async function handleSubmit(e) {
		e.preventDefault();

		// Create FormData
		const formData = new FormData();
		formData.append('image', image); // Append the image file
		formData.append('category_name', selectedCategory); // Add category_id from selectedCategory
		formData.append('title', title);
		formData.append('location', location);
		formData.append('rating', rating);
		formData.append('old_price', old_price);
		formData.append('new_price', new_price);

		console.log('Submitting data:', {
			category_name: selectedCategory,
			title,
			location,
			rating,
			old_price: old_price,
			new_price: new_price,
			image
		});

		try {
			const response = await fetch('http://localhost:3000/api/admin/category_management', {
				method: 'POST',
				body: formData
			});
			// Check response status
			if (response.ok) {
				console.log('Your message has been sent successfully!');

				const newsection = {
					image: URL.createObjectURL(image),
					category_name: selectedCategory,
					title: title,
					location: location,
					rating: rating,
					old_price: old_price,
					new_price: new_price
				};

				venue = [...venue, newsection];
			} else {
				console.log('Failed to send the message. Please try again.');
			}
		} catch (error) {
			console.error('Error submitting the form:', error);
			console.log('An error occurred. Please try again later.');
		}

		// Clear the form inputs after submission
		image = '';
		selectedCategory = ''; // Clear selected category
		title = '';
		location = '';
		rating = 0;
		old_price = 0.0;
		new_price = 0.0;
	}

	// Fetch categories when the component mounts
	onMount(() => {
		fetchCategory();
		venue = [
			{
				image: 'https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D',
				title: 'Test Venue',
				location: 'Test Location',
				rating: 4,
				old_price: 100,
				new_price: 80
			}
		];
	});
</script>

<div>
	<div class="flex justify-center items-center py-10">
		<button
			on:click={toggle}
			class=" bg-red-500 text-white font-bold text-lg px-5 py-2 rounded-md hover:bg-red-600 mb-4"
		>
			Add Item
		</button>
	</div>
	{#if modal}
		<div class="w-full h-[100vh] fixed top-0 bg-[rgba(0,0,0,0.7)] z-50">
			<form
				on:submit={handleSubmit}
				enctype="multipart/form-data"
				class="max-w-md mx-auto top-32 rounded-lg border-2 shadow-lg p-6 flex flex-col gap-4 bg-white relative"
			>
				<button class="fa-solid fa-xmark absolute right-5 text-2xl font-bold" on:click={toggle}
				></button>
				<h2 class="text-xl font-semibold text-center mt-10">Add Item</h2>

				<!-- Image Input -->
				<div>
					<label for="image" class="block text-sm font-medium text-gray-700">Image URL:</label>
					<input
						type="file"
						id="image"
						name="image"
						on:change={(e) => {
							image = e.target.files[0]; // Capture selected image file
							console.log('Selected image file:', image); // Log to verify file capture
						}}
						required
						class="mt-1 block w-full border border-gray-300 rounded-md p-2"
					/>
				</div>

				<!-- Category Select -->
				<div>
					<label for="category" class="block text-sm font-medium text-gray-700"
						>Select Category:</label
					>
					<select
						id="category"
						name="category"
						bind:value={selectedCategory}
						required
						class="mt-1 block w-full border border-gray-300 rounded-md p-2"
					>
						<option value="" disabled selected>Choose a category</option>
						{#each categories as category}
							<option value={category.category_name}>{category.category_name}</option>
						{/each}
					</select>
				</div>

				<!-- Text Inputs -->
				<div>
					<label for="title" class="block text-sm font-medium text-gray-700">Title:</label>
					<input
						type="text"
						id="title"
						bind:value={title}
						placeholder="Enter title"
						required
						class="mt-1 block w-full border border-gray-300 rounded-md p-2"
					/>
				</div>
				<div>
					<label for="location" class="block text-sm font-medium text-gray-700">Location:</label>
					<input
						type="text"
						id="location"
						bind:value={location}
						placeholder="Enter location"
						required
						class="mt-1 block w-full border border-gray-300 rounded-md p-2"
					/>
				</div>
				<div>
					<label for="rating" class="block text-sm font-medium text-gray-700">Rating:</label>
					<input
						type="number"
						id="rating"
						bind:value={rating}
						min="1"
						max="5"
						placeholder="Enter rating (1-5)"
						required
						class="mt-1 block w-full border border-gray-300 rounded-md p-2"
					/>
				</div>
				<div>
					<label for="old_price" class="block text-sm font-medium text-gray-700">Old Price:</label>
					<input
						type="number"
						id="old_price"
						bind:value={old_price}
						step="0.01"
						placeholder="Enter old price"
						required
						class="mt-1 block w-full border border-gray-300 rounded-md p-2"
					/>
				</div>
				<div>
					<label for="new_Price" class="block text-sm font-medium text-gray-700">New Price:</label>
					<input
						type="number"
						id="new_Price"
						bind:value={new_price}
						step="0.01"
						placeholder="Enter new price"
						required
						class="mt-1 block w-full border border-gray-300 rounded-md p-2"
					/>
				</div>

				<!-- Submit Button -->
				<div class="mt-4">
					<button
						type="submit"
						class="w-full bg-blue-500 text-white font-bold py-2 rounded-md hover:bg-blue-600"
						on:click={(modal = false)}
					>
						Add Item
					</button>
				</div>
			</form>
		</div>
	{/if}

	<div class="w-[90%] mx-auto">
		<div class="outdoor-venu py-10 relative text-white">
			<Headline headline="Outdoor Decoration" no={venue.length} />

			<!-- pagination -->
			{#if venue.length >= 1}
				<div class="pagination">
					<button
						class="flex absolute bg-[#50808e] w-10 h-10 md:w-[50px] md:h-[50px] rounded-full z-10 top-[40%] -left-3 justify-center items-center"
					>
						<i class="fa-solid fa-angles-left"></i>
					</button>

					<button
						class="flex absolute bg-[#50808e] w-10 h-10 md:w-[50px] md:h-[50px] rounded-full z-10 top-[40%] -right-5 justify-center items-center"
					>
						<i class="fa-solid fa-angles-right"></i>
					</button>
				</div>
			{/if}

			<!-- cards -->
			<div class="venue-list flex py-10 gap-x-3 md:gap-x-10 overflow-x-auto">
				{#each venue as venues, index}
					<div
						class="venue-card flex flex-col gap-5 pb-5 justify-start items-start h-auto w-[15rem] md:w-[22rem]"
					>
						<div class="border-2 rounded-xl overflow-hidden">
							<div class="img-container relative">
								<div
									class="absolute right-5 top-3 z-50 bg-red-600 flex justify-center items-center w-10 h-10 rounded-md"
								>
									<button class="fa-sharp fa-solid fa-trash text-lg z-10"></button>
								</div>
								<div
									class="venue-img h-[15rem] w-[15rem] md:w-[22rem] md:h-[20rem] flex justify-center items-center"
								>
									<img
										src={venues.image}
										alt={venues.title}
										class="absolute top-0 left-0 w-full h-full object-cover"
									/>
								</div>
							</div>
							<div class="details px-4 py-3 text-lg md:text-xl flex flex-col gap-2">
								<h3>
									{venues.title}<span class="font-bold">&nbsp; &nbsp;{venues.location}</span>
								</h3>

								<ul class="flex gap-1">
									{#each Array(venues.rating) as _}
										<li>★</li>
									{/each}
								</ul>

								<div class="flex gap-2 flex-wrap items-center pb-3">
									<span class="text-slate-400 line-through">₹ {venues.old_price}</span>
									<button class="py-2 w-[7rem] rounded-full bg-[#50808e]"
										>₹ {venues.new_price}</button
									>
								</div>
							</div>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</div>
