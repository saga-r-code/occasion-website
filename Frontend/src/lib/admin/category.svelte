<script>
	import { onMount } from 'svelte';

	let categories = []; // Declare categories as a reactive variable
	let image = '';
	let title = '';
	let location = '';
	let rating = '';
	let oldPrice = '';
	let newPrice = '';

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

	const handleSubmit = (event) => {
		event.preventDefault(); // Prevent the default form submission
		alert('submit');
	};

	// Fetch categories when the component mounts
	onMount(() => {
		fetchCategory();
	});
</script>

<div>
	<div class="flex justify-center items-center py-10">
		<button
			on:click={() => (modal = !modal)}
			class=" bg-red-500 text-white font-bold text-lg px-5 py-2 rounded-md hover:bg-red-600 mb-4"
		>
			Add Item
		</button>
	</div>
	{#if modal}
		<div class="max-w-md mx-auto bg-white rounded-lg border-2 shadow-lg p-6">
			<h2 class="text-xl font-semibold text-center">Add Item</h2>
			<form on:submit={handleSubmit} class="flex flex-col gap-4">
				<div>
					<label for="image" class="block text-sm font-medium text-gray-700">Image URL:</label>
					<input
						type="file"
						id="image"
						bind:value={image}
						placeholder="Enter image URL"
						required
						class="mt-1 block w-full border border-gray-300 rounded-md p-2"
					/>
				</div>
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
					<label for="oldPrice" class="block text-sm font-medium text-gray-700">Old Price:</label>
					<input
						type="number"
						id="oldPrice"
						bind:value={oldPrice}
						placeholder="Enter old price"
						required
						class="mt-1 block w-full border border-gray-300 rounded-md p-2"
					/>
				</div>
				<div>
					<label for="newPrice" class="block text-sm font-medium text-gray-700">New Price:</label>
					<input
						type="number"
						id="newPrice"
						bind:value={newPrice}
						placeholder="Enter new price"
						required
						class="mt-1 block w-full border border-gray-300 rounded-md p-2"
					/>
				</div>
				<div>
					<label for="category" class="block text-sm font-medium text-gray-700"
						>Select Category:</label
					>
					<select
						id="category"
						name="category"
						required
						class="mt-1 block w-full border border-gray-300 rounded-md p-2"
					>
						<option value="" disabled selected>Choose a category</option>
						{#each categories as category}
							<option value={category.category_id}>{category.category_name}</option>
						{/each}
					</select>
				</div>
			</form>
			<div class="mt-4">
				<button
					on:click={handleSubmit}
					class="w-full bg-blue-500 text-white font-bold py-2 rounded-md hover:bg-blue-600"
					>Add Item</button
				>
			</div>
		</div>
	{/if}
</div>
