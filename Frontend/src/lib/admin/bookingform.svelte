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
	let custom_image = null
	let custom_title = ''
	let custom_desc = ''
	let custom_price = 0
	let customization =[]

	let moreInfo = false
	let moreInfoCustomization = false

	function handleMoreInfo(){
		moreInfo = !moreInfo
	}

	function handleMoreInfoCustomization(){
		moreInfoCustomization = !moreInfoCustomization
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
					custom_id : customization.length + 1,
					custom_title: custom_title,
					custom_desc: custom_desc,
					custom_price: custom_price
				}
			];

	}

	//customization item delete
	function deleteCustomization(id){
		customization = customization.filter(item => item.cust_id !== id);
	}		

	async function handleBookingForm() {
    const formData = new FormData();

    // Log the values before appending to formData
    console.log('Preparing to send booking form with the following data:');
    console.log({ title, description, price, discount });

    // Append primary booking form data
    formData.append('title', title);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('discount', discount);

    // Append inclusion as json string
    formData.append('inclusion', JSON.stringify(inclusion));

    // Append Images
    images.forEach((image, index) => {
        formData.append(`image_${index}`, image);
    });

    // Append customization item
    customization.forEach((custom, index) => {
        formData.append(`customization_${index}_title`, custom.custom_title);
        formData.append(`customization_${index}_desc`, custom.custom_desc);
        formData.append(`customization_${index}_price`, custom.custom_price);

        if (custom.custom_image) {
            formData.append(`customization_${index}_image`, custom.custom_image);
        }
    });

    // Log the formData entries to see what is included
    for (const [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
    }

    try {
        const response = await fetch('http://localhost:3000/api/admin/booking_management', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            const result = await response.json();
            const booking_id = result.booking_id;
            console.log(result);

            // Send inclusions and images using separate requests with booking_id
            const responses = await Promise.all([
                sumbitInclusion(booking_id),
                submitImages(booking_id),
                submitCustomization(booking_id)
            ]);

            responses.forEach((result, index) => {
                if (result.status === 'rejected') {
                    console.error(`Request ${index + 1} failed:`, result.reason);
                }
            });

            alert("Booking Page Add Successfully");
        } else {
            const errorData = await response.json();
            console.log('Failed to submit booking. Error:', errorData);
        }
    } catch (error) {
        console.error('An error occurred while sending the request:', error);
    }
}

// Child: for submit images
async function submitImages(booking_id) {
    const imageData = new FormData();
    imageData.append('booking_id', booking_id);

    images.forEach((image) => {
        imageData.append('image', image); // Match backend key
    });

    try {
        const response = await fetch('http://localhost:3000/api/admin/images_table', {
            method: 'POST',
            body: imageData,
        });

        if (!response.ok) {
            throw new Error('Failed to send images');
        }

        console.log('Images submitted successfully!');
    } catch (error) {
        console.error('Error in submitImages:', error.message);
    }
}

function handleImagesChange() {
    images = Array.from(imagesInput.files);
}

// Child: for submit inclusions
async function sumbitInclusion(booking_id) {
    const inclusionData = new FormData();
    inclusionData.append('booking_id', booking_id);
    inclusionData.append('inclusion_desc', JSON.stringify(inclusion));
    console.log(inclusionData);

    const response = await fetch('http://localhost:3000/api/admin/inclusion_table', {
        method: 'POST',
        body: inclusionData
    });

    if (!response.ok) {
        console.log('Failed to send the inclusions');
    }

    console.log('Inclusions submitted successfully!');

    const inputBoxes = document.querySelectorAll('.inclusion-input');
    // inclusion = Array.from(inputBoxes).map(input => input.value.trim()).filter(value => value !== '');
}

// Child: for submit customizations
async function submitCustomization(booking_id) {
    for (let item of customization) {
        const customizationData = new FormData();
        customizationData.append('booking_id', booking_id);
        customizationData.append('custom_title', item.custom_title);
        customizationData.append('custom_desc', item.custom_desc);
        customizationData.append('custom_price', item.custom_price);
        console.log(customizationData);

        if (item.custom_image) {
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
				on:submit|preventDefault={handleBookingForm}
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
				<button class="text-right text-blue-600 hover:cursor-pointer hover:underline underline-offset-4" on:click={handleMoreInfo}>Add Inclusion &darr;</button>
				{#if moreInfo}
				<div class={`inclusions `}>
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
				<button class={`customization text-right customization text-blue-600 hover:cursor-pointer underline`} on:click={handleMoreInfoCustomization}>Add Customization &darr;</button>
				{/if}
              
			
				
				<!-- Customization -->
				 {#if moreInfoCustomization}
				 <form enctype="multipart/form-data">
					<h2 class="text-2xl font-semibold text-center">Customization</h2>
					
					<!-- custom Image Input -->
					<div>
						<label for="cust_image" class="block text-sm font-medium text-gray-700">Upload Images:</label>
							<input
								type="file"
								id="cust_image"
								bind:value={custom_image}
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
						bind:value={custom_title}
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
						bind:value={custom_desc}
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
						bind:value={custom_price}
						placeholder="Enter price"
						class="mt-1 block w-full border border-gray-300 rounded-md p-2"
						required
					/>
					</div>
					
					<button class="text-lg text-white rounded-md mt-5 font-semibold px-3 py-1 bg-blue-600" type="reset" on:click={addCustomizationItem}>Add Customization</button>
					
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
								<h2 class="font-bold text-lg">{customItem.custom_title}</h2>
							</div>
							<h3 class="font-bold   text-lg">₹ {customItem.custom_price}</h3>
						</div>
						<p class="mx-10">{customItem.custom_desc}</p>
					</div>
						{/each}
						
					</div>

					

				</form>
				 {/if}
				

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