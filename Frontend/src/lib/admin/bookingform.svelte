<script>
	export let booking;
	export let bookingPageSelectedTitle = "";
	export let bookingToggle;
	let customItem  = false
	
	let images = []
	let title = ''
	let description = ''
	let price = 0
	let discount = 0
	let inclusion = []

	let cust_id = 0
	let cust_image = ''
	let cust_title = ''
	let cust_desc = ''
	let cust_price = 0
	let customization =[]

	function customizationForm() {
		customItem = !customItem;
	}

	//inclusion input add
	function addInputBox() {
		const inputBox = document.createElement('input');
		inputBox.type = 'text';
		inputBox.placeholder = "Enter Inclusion...";
		inputBox.className = 'mt-1 border w-full border-gray-300 rounded-md p-2 inclusion-input';
		inputBox.required = true;
		
		// Select the inclusion container div and insert the new input box before the confirm button
		const form = document.querySelector('form');
		const confirmButton = form.querySelector('.confirm-button');
		form.insertBefore(inputBox, confirmButton);
	}
	
	//inclusion input delete
	function deleteInputBox() {
		const inputBoxes = document.querySelectorAll('.inclusion-input');
		if (inputBoxes.length > 1) {
			inputBoxes[inputBoxes.length - 1].remove();
		}
	}

	//customization item add
	function addCustomizationItem() {
		if (cust_title && cust_desc && cust_price) {
			customization = [
				...customization,
				{
					cust_id : customization.length + 1,
					cust_title: cust_title,
					cust_desc: cust_desc,
					cust_price: cust_price
				}
			];
			// Clear form fields after adding the item
			cust_image = '';
			cust_title = '';
			cust_desc = '';
			cust_price = 0;
		}
	}

	//customization item delete
	function deleteCustomization(id){
		customization = customization.filter(item => item.cust_id !== id);
	}		

	async function handleBookingForm() {
		
		// Handle form submission logic here
	}


</script>

<div>
	{#if booking}
		<div class="w-full h-[100vh] fixed top-0 bg-[rgba(0,0,0,0.7)] z-50 overflow-scroll">
			<form
				on:submit|preventDefault={handleBookingForm}
				class="max-w-md mx-auto top-24 rounded-lg border-2 shadow-lg p-6 flex flex-col gap-4 bg-white relative"
				enctype="multipart/form-data"
			>
				<button
					class="fa-solid fa-xmark absolute right-5 text-2xl font-bold"
					on:click={bookingToggle}
				></button>
				<div class="text-center mt-8">
					<h2 class="text-xl font-semibold ">Add Booking Form</h2>
					<h1 class="text-lg font-bold">{bookingPageSelectedTitle ? bookingPageSelectedTitle : 'Loading...'}</h1>
				</div>

				<!-- Image Inputs -->
				<div>
					<label for="image" class="block text-sm font-medium text-gray-700">Upload Images:</label>
						<input
							type="file"
							id="image"
							bind:value={images}
							class="mt-1 border w-full border-gray-300 rounded-md p-2"
							required
							multiple
						/>
				</div>

				<!-- Title Input -->
				<div>
					<label for="title" class="block text-sm font-medium text-gray-700">Title:</label>
					<input
						type="text"
						id="title"
						bind:value={title}
						placeholder="Enter title"
						class="mt-1 block w-full border border-gray-300 rounded-md p-2"
						required
					/>
				</div>

				<!-- Description Input -->
				<div>
					<label for="description" class="block text-sm font-medium text-gray-700"
						>Description:</label
					>
					<textarea
						id="description"
						bind:value={description}
						placeholder="Enter description"
						class="mt-1 block w-full border border-gray-300 rounded-md p-2"
						rows="3"
						required
					></textarea>
				</div>

				<!--  Price Input -->
				<div>
					<label for="price" class="block text-sm font-medium text-gray-700">Price:</label>
					<input
						type="number"
						id="price"
						bind:value={price}
						class="mt-1 block w-full border border-gray-300 rounded-md p-2"
						required
					/>
				</div>

				<!--  Discound Input -->
				<div>
					<label for="price" class="block text-sm font-medium text-gray-700">Discount:</label>
					<input
						type="number"
						id="price"
						bind:value={discount}
						class="mt-1 block w-full border border-gray-300 rounded-md p-2"
						required
					/>
				</div>

				<!-- Inclusion Input -->
                <div>
					<label for="title" class="block text-sm font-medium text-gray-700">Inclusion:</label>
					<div class="flex gap-3 justify-center items-center mt-2">
						<button
							type="button"
							class="bg-red-600 rounded-md"
							on:click={deleteInputBox}
						>
							<span class="fa-solid fa-trash text-white flex justify-center items-center w-9 h-9"></span>
						</button>
						<input
							type="text"
							id="inclusion"
							bind:value={inclusion}
							placeholder="Enter Inclusion..."
							class="inclusion-input mt-1 block w-full border border-gray-300 rounded-md p-2"
							required
						/>
						<button
							type="button"
							class="bg-green-600 rounded-md"
							on:click={addInputBox}
						>
							<span class="fa-solid fa-plus text-white flex justify-center items-center w-9 h-9"></span>
						</button>
					</div>
				</div>

				<!-- customizations -->
				<div class="mt-3 flex justify-between items-center gap-3">
					<label for="customization" class="block text-lg  font-bold text-gray-70">Customizations:</label>
					<button class="flex justify-center items-center text-blue-500 underline" on:click={customizationForm}><span>Go here &nbsp; </span><i class="fa-solid fa-arrow-right "></i></button>	
				</div>

				<!-- Submit Button -->
				<div class="mt-4 confirm-button">
					<button
						type="submit"
						class="w-full text-lg bg-blue-500 text-white font-bold py-2 rounded-md hover:bg-blue-600"
					>
						Confirm To Add
					</button>
				</div>
			</form>
		</div>
	{/if}


	{#if customItem}
	<div class="w-full h-[100vh] fixed top-0 bg-[rgba(0,0,0,0.7)] z-50 overflow-scroll ">
		<form class="max-w-md mx-auto top-16 md:left-20 xl:left-72 rounded-lg border-2  shadow-lg p-6 flex flex-col gap-4 bg-white relative"
		enctype="multipart/form-data"
		on:submit|preventDefault={addCustomizationItem}
		>
			
			<button
					class="fa-solid fa-xmark absolute right-5 text-2xl font-bold"
					on:click={customizationForm}>
				</button>
				
				<div class="text-center">
				<h2 class="text-xl font-semibold text-center mt-8">Add Customization Form</h2>
				<h1 class="text-lg font-bold">{bookingPageSelectedTitle ? bookingPageSelectedTitle : 'Loading...'}</h1>
				</div>

			<!-- Image Input -->
			<div>
				<label for="cust_image" class="block text-sm font-medium text-gray-700">Upload Images:</label>
					<input
						type="file"
						id="cust_image"
						bind:value={cust_image}
						class="mt-1 border w-full border-gray-300 rounded-md p-2"
						required
						
					/>
			</div>

			<!-- Title Input -->
			<div>
			<label for="cust_title" class="block text-sm font-medium text-gray-700">Title:</label>
			<input
				type="text"
				id="cust_title"
				bind:value={cust_title}
				placeholder="Enter title"
				class="mt-1 block w-full border border-gray-300 rounded-md p-2"
				required
			/>
			</div>

			<!-- Description Input -->
			<div>
			<label for="cust_description" class="block text-sm font-medium text-gray-700"
				>Description:</label
			>
			<textarea
				id="cust_description"
				bind:value={cust_desc}
				placeholder="Enter description"
				class="mt-1 block w-full border border-gray-300 rounded-md p-2"
				rows="3"
				required
			></textarea>
			</div>

			<!--  Price Input -->
			<div>
			<label for="cust_price" class="block text-sm font-medium text-gray-700">Price:</label>
			<input
				type="number"
				id="cust_price"
				bind:value={cust_price}
				placeholder="Enter price"
				class="mt-1 block w-full border border-gray-300 rounded-md p-2"
				required
			/>
			</div>


			<!--Add Item  -->
			<div class="mt-4 confirm-button">
				<button
					type="submit"
					class="w-full text-lg bg-blue-500 text-white font-bold py-2 rounded-md hover:bg-blue-600"
				>
					Add Custom Item
				</button>	
			</div>
			
			<!-- List Item -->
			<div class="my-3  ">
				<h2 class="text-lg font-semibold mb-4">List of Custom Items</h2>
				{#each customization as customItem (customItem.cust_id)}
				<div class="mb-5">
				<div class="flex justify-between">
					<div class="flex justify-center items-start gap-3">
						<button
						type="button"
						class="bg-red-600 rounded-md"
						on:click={deleteCustomization(customItem.cust_id)}
					>
						<span class="fa-solid fa-trash text-white flex justify-center items-center  p-2"></span>
					</button>
						<h2 class="font-bold text-lg">{customItem.cust_title}</h2>
					</div>
					<h3 class="font-bold   text-lg">₹ {customItem.cust_price}</h3>
				</div>
				<p class="mx-10">{customItem.cust_desc}</p>
			</div>
				{/each}
				
			</div>
		</form>
		</div>	
	{/if}
</div>
