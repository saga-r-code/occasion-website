<script>
	import { onMount } from "svelte";

    export let booking;
    export let bookingPageSelectedTitle = "";
    export let bookingToggle;

    let title = '';
    let description = '';
    let price = 0;
    let discount = 0;
    let inclusion = [''];
    let images = [];
    let imagesInput;
    let custom_title = '';
    let custom_desc = '';
    let custom_price = 0;
    let custom_image = null;
    let customization = [];

	let titleAndIds = [];
	let selectedCategoryManagementId = ''

    let moreInfo = false;
    let moreInfoCustomization = false;

    // Toggle sections
    function handleMoreInfo() {
        moreInfo = !moreInfo;
    }

    function handleMoreInfoCustomization() {
        moreInfoCustomization = !moreInfoCustomization;
    }

    // Inclusion logic
    function addInputBox() {
        inclusion = [...inclusion, ''];
    }

    function deleteInputBox() {
        if (inclusion.length > 1) {
            inclusion = inclusion.slice(0, -1);
        }
    }

    // Customization logic
    function addCustomizationItem() {
        if (!custom_title || !custom_desc || !custom_price) {
            alert("Please fill all customization fields!");
            return;
        }

        customization = [
            ...customization,
            {
                custom_id: customization.length + 1,
                custom_title,
                custom_desc,
                custom_price,
                custom_image : custom_image
            }
        ];

        // Clear inputs after adding
        custom_title = '';
        custom_desc = '';
        custom_price = 0;
        custom_image = null;
    }

	function deleteCustomization(id) {
        customization = customization.filter(custom => custom.custom_id !== id);
    }

    function handleCutomImageChange(event) {
        const file = event.target.files[0];
        if (file) {
            custom_image = file;
			console.log("custom_image" , custom_image)
        }
    }

	function handleImagesChange() {
        images = Array.from(imagesInput.files);
    }

	//For categoryid input via their title
	async function fetchTitle() {
        try {
            const response = await fetch(`http://localhost:3000/api/admin/category_management`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const item = await response.json();
			 titleAndIds = item.map(items => ({
				title: items.title,
				id: items.id
			}))

			// console.log(selectedCategoryManagementId)
			// console.log("sagar", titleAndIds)
			return titleAndIds;

        } catch (error) {
            console.error('Error fetching title:', error);
        }
    }

	async function handleBookingForm() {
        const formData = new FormData();

        // Add main booking details
		formData.append('item_id', selectedCategoryManagementId)
        formData.append('title', title);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('discount', discount);

		console.log(selectedCategoryManagementId)

        try {
            const response = await fetch('http://localhost:3000/api/admin/booking_management', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                const result = await response.json();
                const booking_id = result.id;
                alert("Booking added successfully!");
				console.log("booking Id", booking_id)
                // Submit related data
                await Promise.all([
                    submitInclusion(booking_id),
                    submitImages(booking_id),
                    submitCustomization(booking_id)
                ]);

				console.log(result)
            } else {
                const errorData = await response.json();
                console.error('Failed to submit booking:', errorData);
            }
        } catch (error) {
            console.error('Error submitting booking form:', error);
        }
    }

	async function submitImages(booking_id) {
    const imageData = new FormData();
   	imageData.append('booking_id', booking_id);
    images.forEach(image => {
    imageData.append('image', image);
    });

        try {
            const response = await fetch('http://localhost:3000/api/admin/images_table', {
                method: 'POST',
                body: imageData
            });

            if (!response.ok) {
                throw new Error('Failed to submit images');
            }
        } catch (error) {
            console.error('Error in submitImages:', error);
        }
    }

    async function submitInclusion(booking_id) {
        const inclusionData = new FormData();
        inclusionData.append('booking_id', booking_id);
		inclusion.forEach((inclusions) => {
        inclusionData.append('inclusion_desc', JSON.stringify(inclusions)); 
    });

        try {
            const response = await fetch('http://localhost:3000/api/admin/inclusion_table', {
                method: 'POST',
                body: inclusionData
            });

            if (!response.ok) {
                throw new Error('Failed to submit inclusions');
            }
        } catch (error) {
            console.error('Error in submitInclusion:', error);
        }
    }

    async function submitCustomization(booking_id) {
		const customizationData = new FormData();
        customizationData.append('booking_id', booking_id);
    
        // Loop through the existing customization array and append each one to the FormData
        customization.forEach((custom) => {
            customizationData.append('custom_title', custom.custom_title);
            customizationData.append('custom_desc', custom.custom_desc);
            customizationData.append('custom_price', custom.custom_price);
    
            if (custom.custom_image) {
                customizationData.append('custom_image', custom.custom_image); // Use [] to indicate an array
            } else {
                console.log("no file found for", custom.custom_title);
            }
        });

			console.log("submit data",customizationData)

          // Send form data to backend
		  try {
                const response = await fetch('http://localhost:3000/api/admin/customization_table', {
                    method: 'POST',
                    body: customizationData
                });

				const imageBuffer = await response.json();
        		customizationData.append('custom_image',imageBuffer);

                if (response.ok) {
                    const result = await response.json();
                    console.log('Customization submitted successfully:', result);
                    // Reset fields after successful submission
                    custom_title = '';
                    custom_desc = '';
                    custom_price = 0;
                    custom_image = null;
                } else {
                    console.error('Failed to submit customization:', response);
                }
            } catch (error) {
                console.error('Error submitting customization:', error);
            }
    }



	onMount(()=>{
		fetchTitle()
	})

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
		<h2 class="text-xl font-semibold">Add Booking Form</h2>
		<h1 class="text-lg font-bold">
		  {bookingPageSelectedTitle ? bookingPageSelectedTitle : ''}
		</h1>
	  </div>


	  <!-- Select Title of Catgeory_management -->
	  <div class="relative w-full">
		<select
			id="category"
			name="category"
			bind:value={selectedCategoryManagementId}
			required
			class="block w-full pl-5 py-3 text-[17px] font-semibold text-white bg-gray-700 border appearance-auto border-gray-600 rounded-lg  "
		>
			<option value="" disabled selected>Choose a category</option>
			{#each titleAndIds as titleId}
				<option value={titleId.id}>{titleId.title}</option>
			{/each}
		</select>
		<div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
			
		</div>
	</div>
  
	  <!-- Image Input -->
	  <div>
		<label class="block text-sm font-medium text-gray-700">Upload Images:</label>
		<input
		  type="file"
		  bind:this={imagesInput}
		  on:change={handleImagesChange}
		  class="mt-1 border w-full border-gray-300 rounded-md p-2"
		  multiple
		  required
		/>
	  </div>
  
	  <!-- Title Input -->
	  <div>
		<label class="block text-sm font-medium text-gray-700">Title:</label>
		<input
		  type="text"
		  bind:value={title}
		  placeholder="Enter title"
		  class="mt-1 block w-full border border-gray-300 rounded-md p-2"
		  required
		/>
	  </div>
  
	  <!-- Description Input -->
	  <div>
		<label class="block text-sm font-medium text-gray-700">Description:</label>
		<textarea
		  bind:value={description}
		  placeholder="Enter description"
		  class="mt-1 block w-full border border-gray-300 rounded-md p-2"
		  rows="3"
		  required
		></textarea>
	  </div>
  
	  <!-- Price Input -->
	  <div>
		<label class="block text-sm font-medium text-gray-700">Price:</label>
		<input
		  type="number"
		  bind:value={price}
		  class="mt-1 block w-full border border-gray-300 rounded-md p-2"
		  required
		/>
	  </div>
  
	  <!-- Discount Input -->
	  <div>
		<label class="block text-sm font-medium text-gray-700">Discount:</label>
		<input
		  type="number"
		  bind:value={discount}
		  class="mt-1 block w-full border border-gray-300 rounded-md p-2"
		  required
		/>
	  </div>
  
	  <!-- Inclusion Section -->
	  <button
		class="text-blue-600 hover:cursor-pointer underline"
		type="button"
		on:click={handleMoreInfo}
	  >
		Add Inclusion &darr;
	  </button>
	  {#if moreInfo}
	  <div>
		{#each inclusion as inc, index}
		<input
		  type="text"
		  bind:value={inclusion[index]}
		  placeholder="Enter inclusion"
		  class="inclusion-input mt-1 block w-full border border-gray-300 rounded-md p-2"
		/>
		{/each}
		<div class="flex gap-3 mt-3">
		  <button type="button" on:click={addInputBox} class="bg-green-600 text-white p-2 rounded-md">
			Add
		  </button>
		  <button type="button" on:click={deleteInputBox} class="bg-red-600 text-white p-2 rounded-md">
			Delete
		  </button>
		</div>
	  </div>
	  {/if}
  
	  <!-- Customization Section -->
	  <button
		class="text-blue-600 hover:cursor-pointer underline"
		type="button"
		on:click={handleMoreInfoCustomization}
	  >
		Add Customization &darr;
	  </button>
	  {#if moreInfoCustomization}
	  <form enctype="multipart/form-data">
		<div>
		  <label class="block text-sm font-medium text-gray-700">Upload Image:</label>
		  <input
			type="file"
			on:change={handleCutomImageChange}
			class="mt-1 block w-full border border-gray-300 rounded-md p-2"
		  />
		</div>
		<div>
		  <label class="block text-sm font-medium text-gray-700">Title:</label>
		  <input
			type="text"
			bind:value={custom_title}
			placeholder="Enter title"
			class="mt-1 block w-full border border-gray-300 rounded-md p-2"
		  />
		</div>
		<div>
		  <label class="block text-sm font-medium text-gray-700">Description:</label>
		  <textarea
			bind:value={custom_desc}
			placeholder="Enter description"
			class="mt-1 block w-full border border-gray-300 rounded-md p-2"
		  ></textarea>
		</div>
		<div>
		  <label class="block text-sm font-medium text-gray-700">Price:</label>
		  <input
			type="number"
			bind:value={custom_price}
			placeholder="Enter price"
			class="mt-1 block w-full border border-gray-300 rounded-md p-2"
		  />
		</div>
		<button
		  type="button"
		  class="bg-blue-600 text-white mt-3 p-2 rounded-md"
		  on:click={addCustomizationItem}
		>
		  Add Customization
		</button>
	  </form>
  
	  <!-- Customization List -->
	  <div>
		{#each customization as custom}
		<div class="flex items-center justify-between mt-3 border-b pb-2">
		  <div>
			<p class="font-bold">{custom.custom_title}</p>
			<p>{custom.custom_desc}</p>
			<p class="text-gray-600">Price: {custom.custom_price}</p>
			{#if custom.custom_image}
			<img src="{custom.custom_image}" alt="Customization Image" class="w-16 h-16 mt-2"/>
			{/if}
		  </div>
		  <button
			type="button"
			class="bg-red-600 rounded-md"
			on:click={() => deleteCustomization(custom.custom_id)}
		  >
			<span class="fa-solid fa-trash text-white flex justify-center items-center p-2"></span>
		  </button>
		</div>
		{/each}
	  </div>
	  {/if}
  
	  <!-- Submit Button -->
	  <div class="mt-5">
		<button
		  type="submit"
		  class="w-full bg-blue-600 text-white rounded-md p-2"
		
		>
		  Submit
		</button>
	  </div>
	</form>
  </div>
  {/if}
  