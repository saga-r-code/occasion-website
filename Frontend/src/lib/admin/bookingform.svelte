<script>

	export let booking;
	export let bookingPageSelectedTitle = "";
	export let bookingToggle;
	
	let title = ''
	let description = ''
	let price = 0
	let discount = 0
	let inclusion = []
	let images = []
	let imagesInput;
	let cust_id = 0
	let cust_image = null
	let cust_title = ''
	let cust_desc = ''
	let cust_price = 0
	let customization =[]


	//inclusion input add
	function addInputBox() {
		const inputBox = document.createElement('input');
		inputBox.type = 'text';
		inputBox.placeholder = "Enter Inclusion...";
		inputBox.className = 'mt-1 border w-full border-gray-300 rounded-md p-2 inclusion-input';
		inputBox.required = true;
		
		// Select the inclusion container div and insert the new input box before the confirm button
		const form = document.querySelector('form');
		const inclusionabove = form.querySelector('.customization');
		form.insertBefore(inputBox, inclusionabove);
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
			customization = [
				...customization,
				{
					cust_id : customization.length + 1,
					cust_title: cust_title,
					cust_desc: cust_desc,
					cust_price: cust_price
				}
			];

		cust_title = "";
		cust_desc = "";
		cust_price = 0;
		cust_image = null;
	}

	//customization item delete
	function deleteCustomization(id){
		customization = customization.filter(item => item.cust_id !== id);
	}		

	async function handleBookingForm() {
		const formData = new FormData();

		// Append primary booking form data
		formData.append('title', title);
		formData.append('description', description);
		formData.append('price', price);
		formData.append('discount', discount);
		console.log({title, description, price, discount})

		// Append inclusion as json string
		formData.append('inclusion', JSON.stringify(inclusion));

		// Append Images
		images.forEach((image, index) => {
			formData.append(`image_${index}`, image);
		});

		// Append customization item
		customization.forEach((custom, index) => {
			formData.append(`customization_${index}_title`, custom.cust_title);
			formData.append(`customization_${index}_desc`, custom.cust_desc);
			formData.append(`customization_${index}_price`, custom.cust_price);
		});
		
		
    try {
        const response = await fetch('http://localhost:3000/api/admin/booking_management', {
            method: 'POST',
            body: formData
        });

			if (response.ok) {
				const result = await response.json();
				const booking_id = result.booking_id;

				 // Send inclusions and images using separate requests with booking_id
				 await Promise.all([
					sumbitInclusion(booking_id),
					submitImages(booking_id),
					submitCustomization(booking_id)
				 ])

				alert("Booking Page Add Successfully");

			} else {
				const errorData = await response.json();
				console.log('Failed to sumbir booking. Error:', errorData);
			}
		} catch (error) {
			console.error('An error occurred while sending the request:', error);
		}
	}

	//child : for sumbit inclusions
	async function sumbitInclusion(booking_id) {
		const inclusionData = new FormData();
		inclusionData.append('booking_id', booking_id);
		inclusionData.append('inclusion_desc', JSON.stringify(inclusion))

		const response = await fetch('http://localhost:3000/api/admin/inclusions_table', {
			method: 'POST',
			body: inclusionData
		});

		if (!response.ok) {
			console.log('Failed to send the inclusions');
		} 
	}

	//child : for sumbit images
	async function submitImages(booking_id) {
		const imageData = new FormData();
		imageData.append('booking_id', booking_id);

		images.forEach((image, index) => {
			imageData.append(`image_${index}`, image);
		});

		const response = await fetch('http://localhost:3000/api/admin/images_table', {
			method: 'POST',
			body: imageData
		});

		if (!response.ok) {
			console.log('Failed to send the images');
		}
		
	}

	function handleImagesChange () {
		images = Array.from(imagesInput.files);
	}

	//child : for sumbit customizations
	async function submitCustomization(booking_id) {
		for (const item of customization) {
			const customizationData = new FormData();
			customizationData.append('booking_id', booking_id);
        	customizationData.append('custom_title', item.cust_title);
        	customizationData.append('custom_desc', item.cust_desc);
        	customizationData.append('custom_price', item.cust_price);

			if(item.custom_image){
				customizationData.append('custom_image', item.custom_image);
			}

			const response = await fetch('http://localhost:3000/api/admin/customization_table', {
				method: 'POST',
				body: customizationData
			});

			if (!response.ok) {
				console.log('Failed to send the customization');
			}
		}
	}


// Clear form
function clearForm(){
    title = '';
    description = '';
    price = 0;
    discount = 0;
    inclusion = [];
    images = [];
    customization = [];
}

</script>


{#if booking}
		<div class="w-full h-[100vh] fixed top-0 bg-[rgba(0,0,0,0.7)] z-50 overflow-scroll">
			<form
				on:submit|preventDefault={clearForm}
				class="max-w-md mx-auto top-24 rounded-lg border-2 shadow-lg p-6 flex h-auto flex-col gap-4 bg-white relative"
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
							bind:this={imagesInput}
							on:change={handleImagesChange}
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
						id="discount"
						bind:value={discount}
						class="mt-1 block w-full border border-gray-300 rounded-md p-2"
						required
					/>
				</div>

				
				<!-- Inclusion -->
                <div class="inclusions">
					<p class="text-right text-blue-600 hover:cursor-pointer hover:underline underline-offset-4">more &darr;</p>
					<h2 class="text-2xl font-semibold text-center ">Inclusions</h2>
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
			
				
				<!-- Customization -->
				<div class="customization">
					<p class="text-right text-blue-600 hover:cursor-pointer hover:underline underline-offset-4">more &darr;</p>
					<h2 class="text-2xl font-semibold text-center">Customization</h2>
					
					<!-- custom Image Input -->
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
		
					<!-- custom Title Input -->
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
		
					<!--custom Description Input -->
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
		
					<!--custom  Price Input -->
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
					
					<button class="text-lg text-white rounded-md mt-5 font-semibold px-3 py-1 bg-blue-600" on:click={addCustomizationItem}>Add Customization</button>
					
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
								on:click={deleteCustomization(customItem.cust_id)}>
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

					

				</div>

				<!-- Submit Button -->
				<div class="mt-4 ">
					<button
						type="submit"
						class="w-full text-lg bg-blue-500 text-white font-bold py-2 rounded-md hover:bg-blue-600"
						on:click|preventDefault={handleBookingForm}>
						Confirm To Add
					</button>
				</div>
			</form>
		</div>
{/if}
