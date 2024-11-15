<script>
	import Headline from '$lib/headline.svelte';
	import { onMount } from 'svelte';
	import Bookingform from './bookingform.svelte';

	let categories = []; // Categories array
	let venue = [];
	let selectedCategory = ''; // Bind selected category value
	let image = ''; // Image file
	let title = '';
	let location = '';
	let old_price = 0;
	let new_price = 0;
	let category_name = '';
	 let bookingPageSelectedTitle = ''

	let modal = false;
	let insertCategory = false;
	let booking = false;

	// Group venues by category
	
	$: groupedVenues = selectedCategory === 'All Venues' || !selectedCategory
    ? venue
    : venue.filter((item) => item.category_name === selectedCategory);



  // Get unique categories from the venue data
  $: categories = [
    ...new Set(venue.map((item) => item.category_name)),
  ];

  // Optionally add 'All Venues' at the end of the categories array
  $: categoriesWithAll = [...categories, 'All Venues'];

	function toggle() {
		modal = !modal;
	}

	function bookingToggle() {
		booking = !booking;
	}

	function categoryadd() {
		insertCategory = !insertCategory;
	}

	//category display in dropdown
	const fetchCategory = async () => {
		try {
			const response = await fetch('http://localhost:3000/api/admin/category');
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			const fetchedCategories = await response.json();
			// console.log(fetchedCategories)
			const result = Array.isArray(fetchedCategories) ? fetchedCategories : [];
			categories = result;
		} catch (error) {
			console.error('Error fetching categories:', error);
		}
	};

	//display card
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
					const base64toImage = btoa(String.fromCharCode(...new Uint8Array(item.image.data))); //0 to 255 binarycode then use Uint8Array means
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

	//Category_nameAdd
	async function handleAddcategory(e) {
		confirm('Add  new category');
		e.preventDefault();

		try {
			// Ensure category_name is defined and valid
			if (!category_name) {
				console.log('Category name cannot be empty.');
				return;
			}
			// Send the data to the backend and store in database
			const response = await fetch('http://localhost:3000/api/admin/category', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ category_name: category_name })
			});
			//response check
			if (response.ok) {
				console.log('Your message has been sent successfully!');
			} else {
				console.log('Failed to send the message. Please try again.');
			}
		} catch (error) {
			console.error('Error submitting the form:', error);
			console.log('An error occurred. Please try again later.');
		}

		category_name = '';
	}

	//form sumbition
	async function handleSubmit(e) {
		e.preventDefault();

		// Create FormData
		const formData = new FormData();
		formData.append('image', image); // Append the image file
		formData.append('category_name', selectedCategory); // Add category_id from selectedCategory
		formData.append('title', title);
		formData.append('location', location);

		formData.append('old_price', old_price);
		formData.append('new_price', new_price);

		console.log('Submitting data:', {
			category_name: selectedCategory,
			title,
			location,
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
		selectedCategory = '';
		title = '';
		location = '';
		old_price = 0;
		new_price = 0;
	}

	// delete cards
	async function handleDeleteItem(item_id) {
		const confirmed = confirm('Are you sure you want to delete this item?');

		if (confirmed) {
			try {
				const response = await fetch(`http://localhost:3000/api/admin/category_delete/${item_id}`, {
					method: 'DELETE'
				});

				if (response.ok) {
					const result = await response.json();
					alert(result.message);

					// Remove deleted item from the venue array in the frontend
					venue = venue.filter((item) => item.item_id !== item_id);
					venue = [...venue]; // Ensure reactivity
				} else {
					const error = await response.json();
					alert('Error' + error.message);

					// This fetches the latest data again from the server
					// fetchCategoryItem();
				}
			} catch (error) {
				console.error('Error deleting item:', error);
				alert('An error occurred while deleting the item.');
			}
		} else {
			alert('Item deletion canceled.');
		}
	}

	//selected Title for booking
	async function fetchTitle(itemId) {
        try {
            const response = await fetch(`http://localhost:3000/api/admin/category_fetch/${itemId}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const item = await response.json();
            bookingPageSelectedTitle = item.category_name; // Set selectedTitle and trigger reactivity
        } catch (error) {
            console.error('Error fetching title:', error);
            bookingPageSelectedTitle = 'Error loading title'; // Fallback title
        }
    }

    function openForm(itemId) {
        bookingPageSelectedTitle = ""; // Clear any previous title
        booking = true; // Show the booking form
        fetchTitle(itemId); // Fetch the title for the selected item
    }

	const handleClearForm = () => {
		image = '';
		selectedCategory = '';
		title = '';
		location = '';
		old_price = 0;
		new_price = 0;
	};

	// Fetch categories when the component mounts
	onMount(() => {
		fetchCategory();
		fetchCategoryItem();
	});
</script>

<div class={`conatiner h-auto`}>
	<div class="flex justify-between flex-wrap gap-5 mx-auto w-[80%] pt-10">
		<button
			on:click={toggle}
			class=" bg-red-500 text-white font-bold text-lg px-5 py-2 rounded-md hover:bg-red-600 mb-4"
		>
			Add Item
		</button>
		<div class="space-x-4 space-y-4 sm:space-y-0">
			<select
			  id="category"
			  name="category"
			  bind:value={selectedCategory}
			  required
			  class="rounded-lg w-full text-white font-semibold bg-white/10 tracking-wider text-[17px] border-slate-300 bg-opacity-30 backdrop-blur-lg border py-3 pr-10 pl-5 xl"
			>  
			  <option value="" disabled selected>Choose a category</option>
			  {#each categoriesWithAll as category}
				<option value={category}>{category}</option>
			  {/each}
			</select>
		</div>
	</div>

	{#if modal}
		<div class="w-full h-[100vh] fixed top-0 bg-[rgba(0,0,0,0.7)] z-40">
			<form
				on:submit={handleSubmit}
				enctype="multipart/form-data"
				class="max-w-md mx-auto top-32 rounded-lg border-2 shadow-lg p-6 flex flex-col gap-4 bg-white relative"
			>
				<button class="fa-solid fa-xmark absolute right-5 text-2xl font-bold" on:click={toggle}
				></button>
				<h2 class="text-xl font-semibold text-center mt-8 text-wrap">Add New Venue Form</h2>

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
					<div class="flex gap-3 justify-center items-center">
						<select
							id="category"
							name="category"
							bind:value={selectedCategory}
							required
							class="mt-1 block w-full border border-gray-300 rounded-md p-2"
						>
						<option value="" disabled selected>Choose a category</option>
						{#each categories as category}
						  <option value={category}>{category}</option>
						{/each}
						</select>
						<button
							class="bg-slate-500 flex justify-center items-center rounded-md"
							on:click={categoryadd}
						>
							<span class="fa-solid fa-plus text-white p-[.65rem]"></span>
						</button>
					</div>
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
				<div class="mt-4 flex gap-10">
					<button
						type="submit"
						class="w-full bg-blue-500 text-white font-bold py-2 rounded-md hover:bg-blue-600"
						on:click={(modal = false)}
					>
						Add Item
					</button>
					<button
						type="submit"
						class="w-full bg-green-500 text-white font-bold py-2 rounded-md hover:bg-green-600"
						on:click={handleClearForm}
					>
						Clear Form
					</button>
				</div>
			</form>
		</div>
	{/if}

	{#if insertCategory}
		<div class="w-full h-[100vh] fixed top-0 bg-[rgba(0,0,0,0.7)] z-50">
			<form
				on:submit={handleAddcategory}
				class="max-w-md mx-auto top-[42%] md:left-20 xl:left-72 rounded-lg border-2 shadow-lg p-6 flex flex-col gap-4 bg-white relative"
			>
				<button class="fa-solid fa-xmark absolute right-5 text-2xl font-bold" on:click={categoryadd}
				></button>
				<h2 class="text-xl font-semibold text-center mt-8">Add Category Form</h2>

				<!-- Text Inputs -->
				<div>
					<label for="title" class="block text-sm font-medium text-gray-700">Title:</label>
					<input
						type="text"
						id="title"
						bind:value={category_name}
						required
						placeholder="Enter title"
						class="mt-1 block w-full border border-gray-300 rounded-md p-2"
					/>
				</div>

				<!-- Submit Button -->
				<div class="mt-4">
					<button
						type="submit"
						class="w-full bg-blue-500 text-white font-bold py-2 rounded-md hover:bg-blue-600"
					>
						Add Category
					</button>
				</div>
			</form>
		</div>
	{/if}

	
<div class="w-[90%] mx-auto h-auto text-white mt-10">
	{#each categories as category}
	  <div class="category-section">
		<!-- Display category headline -->
		<Headline headline={category} no={groupedVenues.filter((item) => item.category_name === category).length} />
  
		<!-- Venue cards for this category -->
		<div class="venue-list flex flex-wrap justify-center sm:justify-start gap-y-10 md:gap-y-14 py-10 gap-x-10 md:gap-x-10">
		  {#each groupedVenues.filter((item) => item.category_name === category) as item}
			<div class="venue-container bg-white text-black shadow-lg shadow-gray-900  rounded-xl border-2 flex flex-col overflow-hidden gap-5 pb-5 justify-start items-start h-auto w-[15rem] lg:w-[22rem] md:w-[18rem]">
			  <div class="img-container relative">
				<div class="absolute z-20 left-5 top-5 text-white bg-red-500 rounded-md hover:bg-red-600 active:shadow-inner active:bg-red-500">
				  <button class="fa-solid fa-trash w-9 h-9 text-xl" on:click={() => handleDeleteItem(item.item_id)}></button>
				</div>
				<div class="venue-img overflow-hidden h-[15rem] w-[15rem] md:w-[20rem] md:h-[20rem] lg:w-[22rem] flex justify-center items-center">
				  <img src={item.image} alt={item.title} class="absolute top-0 left-0 border-b-2 border-gray-300 w-full h-full object-cover" />
				</div>
			  </div>
			  <div class="details px-4 text-lg md:text-xl flex flex-col gap-2">
				<h3>{item.title}<span class="font-bold">&nbsp; &nbsp;{item.location}</span></h3>
				<div class="flex gap-2 flex-wrap items-center py-2">
				  <span class="text-slate-500 line-through">{item.old_price > 0 ? `₹ ${item.old_price}` : ''}</span>
				  <button class="py-2 w-[7rem] rounded-full bg-green-200 shadow-md">₹ {item.new_price}</button>
				</div>
				<div class="my-2 bg-blue-500 shadow-xl px-4 rounded-xl text-white hover:shadow-inner hover:bg-blue-600 active:bg-blue-500 text-lg font-bold py-2 w-fit">
				  <button class="text-wrap" on:click={() => openForm(item.item_id)}>Add Booking Form</button>
				</div>
			  </div>
			</div>
		  {/each}
		</div>
	  </div>
	{/each}
  </div>


	{#if booking}
		<Bookingform {bookingPageSelectedTitle} {bookingToggle} {booking} />
	{/if}
</div>

<style>
	
</style>
