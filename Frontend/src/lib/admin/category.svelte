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

	const fetchCategoryItem = async () => {
		try {
			const response = await fetch('http://localhost:3000/api/admin/category_item');
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			const fetchItem = await response.json();
			// console.log(fetchItem)

			// Convert Buffer data to Base64 for each item
			const result = fetchItem.map((item) => {
				if (item.image && item.image.data) {
					// Convert buffer data array to a Base64 string
					const base64toImage = btoa(String.fromCharCode(...new Uint8Array(item.image.data)));//0 to 255 binarycode then use Uint8Array means 
					// Prepend the data type for use in an <img> src attribute
					item.image = `data:image/jpeg;base64,${base64toImage}`;
				}
				return item;
			});

			venue = result;

			// const encodedData = window.btoa('Hello, world'); // encode a string
			// const decodedData = window.atob(encodedData); // decode the string

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

				const imageBuffer = await response.json();

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

	async function handleDeleteItem() {
		const confirmed = confirm('Are you sure you want to delete this item?');
	}

	// Fetch categories when the component mounts
	onMount(() => {
		fetchCategory();
		fetchCategoryItem();
	});
</script>

<div class="conatiner">
	<div class="flex justify-center items-center pt-10">
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
		<div class="wedding-item text-white py-10">
			<Headline headline="Ceremony Decorations" no={venue.length} />

			<!-- Venue cards -->
			<div
				class="venue-list flex flex-wrap justify-center sm:justify-start gap-y-10 md:gap-y-14 py-10 gap-x-10 md:gap-x-10"
			>
				{#each venue as item}
					<div
						class="venue-conatiner rounded-xl border-2 flex flex-col overflow-hidden gap-5 pb-5 justify-start items-start h-auto w-[15rem] lg:w-[22rem] md:w-[18rem]"
					>
						<div class="img-container relative">
							<div
								class="absolute z-20 right-5 top-5 bg-red-500 rounded-md hover:bg-red-600 active:shadow-inner active:bg-red-500"
							>
								<button class="fa-solid fa-trash w-9 h-9 text-xl" on:click={handleDeleteItem}
								></button>
							</div>
							<div
								class="venue-img overflow-hidden h-[15rem] w-[15rem] md:w-[20rem] md:h-[20rem] lg:w-[22rem] flex justify-center items-center"
							>
								<img
									src={item.image}
									alt={item.title}
									class="absolute top-0 left-0 w-full h-full object-cover"
								/>
							</div>
						</div>
						<div class="details px-4 text-lg md:text-xl flex flex-col gap-2">
							<h3>
								{item.title}<span class="font-bold">&nbsp; &nbsp;{item.location}</span>
							</h3>

							<!-- <ul class="flex gap-1">
								{#each Array(5) as _, index}
									<button
										class:active={index < item.rating}
										style="color: {index < item.rating ? 'gold' : 'gray'}"
									>
										★
									</button>
								{/each}
							</ul> -->
							<div class="flex gap-2 flex-wrap items-center py-2">
								<span class="text-slate-400 line-through">₹ {item.old_price}</span>
								<button class="py-2 w-[7rem] rounded-full bg-[#50808e]">₹ {item.new_price}</button>
							</div>
						</div>
					</div>
				{/each}
			</div>
			<!-- Venue List end -->
		</div>
	</div>
</div>

<style>
	.conatiner {
	background-image: linear-gradient(to bottom, #142b4e, #0a3656, #00405d, #004a62, #075466);
}
</style>
