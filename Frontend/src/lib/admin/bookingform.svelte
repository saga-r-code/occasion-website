<script>
	let close = false;
	let customItem  = false

	function customizationAdd() {
		customItem = !customItem;
	}

	function bookingToggle() {
		close = !close;
	}

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

	function deleteInputBox() {
		const inputBoxes = document.querySelectorAll('.inclusion-input');
		if (inputBoxes.length > 1) {
			inputBoxes[inputBoxes.length - 1].remove();
		}
	}

	async function handleBookingForm(event) {
		event.preventDefault();
		// Handle form submission logic here
	}
</script>

<div>
	{#if !close}
		<div class="w-full h-[100vh] fixed top-0 bg-[rgba(0,0,0,0.7)] z-50 overflow-scroll">
			<form
				on:submit={handleBookingForm}
				class="max-w-md mx-auto top-24 rounded-lg border-2 shadow-lg p-6 flex flex-col gap-4 bg-white relative"
				enctype="multipart/form-data"
			>
				<button
					class="fa-solid fa-xmark absolute right-5 text-2xl font-bold"
					on:click={bookingToggle}
				></button>
				<h2 class="text-xl font-semibold text-center mt-8">Add Booking Form</h2>

				<!-- Image Inputs -->
				<div>
					<label for="image" class="block text-sm font-medium text-gray-700">Upload Images:</label>
						<input
							type="file"
							id="image"
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
						placeholder="Enter description"
						class="mt-1 block w-full border border-gray-300 rounded-md p-2"
						rows="3"
						required
					></textarea>
				</div>

				<!-- Old Price Input -->
				<div>
					<label for="old_price" class="block text-sm font-medium text-gray-700">Old Price:</label>
					<input
						type="number"
						id="old_price"
						placeholder="Enter old price"
						class="mt-1 block w-full border border-gray-300 rounded-md p-2"
						required
					/>
				</div>

				<!-- New Price Input -->
				<div>
					<label for="new_price" class="block text-sm font-medium text-gray-700">New Price:</label>
					<input
						type="number"
						id="new_price"
						placeholder="Enter new price"
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
					
					<button class="flex justify-center items-center text-blue-500 underline" on:click={customizationAdd}><span>Go here &nbsp; </span><i class="fa-solid fa-arrow-right "></i></button>	
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
	<div class="w-full h-[100vh] fixed top-0 bg-[rgba(0,0,0,0.7)] z-50">
		<form class="max-w-md mx-auto top-16 md:left-20 xl:left-72 rounded-lg border-2 shadow-lg p-6 flex flex-col gap-4 bg-white relative"
		enctype="multipart/form-data"
		>
			
			<button
					class="fa-solid fa-xmark absolute right-5 text-2xl font-bold"
					on:click={customizationAdd}
				></button>
				<h2 class="text-xl font-semibold text-center mt-8">Add Customization Form</h2>
			<div>
				<label for="cust_image" class="block text-sm font-medium text-gray-700">Upload Images:</label>
					<input
						type="file"
						id="cust_image"
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

		</form>
		</div>	
	{/if}
</div>
