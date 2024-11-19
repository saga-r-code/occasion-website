<script>
	import BookingPage from '$lib/booking-page.svelte';
	import Category_1 from '$lib/categoryContainer/category-1.svelte';
	import Footer from '$lib/footer.svelte';
	import Headline from '$lib/headline.svelte';
	import InfoContainer from '$lib/info-container.svelte';
	import Navbar from '$lib/navbar.svelte';
	import DefaultImage from '../../lib/Images/default.jpg';

	import { onMount } from 'svelte';

	let venue = [];
	let selectedCategory = 'All Venues';
	let categories = [];
  
	$: groupedVenues = selectedCategory === 'All Venues'
	  ? venue
	  : venue.filter((item) => item.category_name === selectedCategory);
  
	$: categoriesWithAll = [
	  ...new Set(venue.map((item) => item.category_name)),  
	];
  
	const fetchCategoryItem = async () => {
	  try {
		const response = await fetch('http://localhost:3000/api/admin/category_management');
		if (!response.ok) {
		  throw new Error(`HTTP error! status: ${response.status}`);
		}
		const fetchItem = await response.json();
  
		const result = fetchItem.map((item) => {
		  if (item.image && item.image.data) {
			const base64toImage = btoa(
			  String.fromCharCode(...new Uint8Array(item.image.data))
			);
			item.image = `data:image/jpeg;base64,${base64toImage}`;
		  } else {
			item.image = DefaultImage;
		  }
		  return item;
		});
  
		venue = result;
	  } catch (error) {
		console.error('Error fetching categories:', error);
	  }
	};
  
	onMount(() => {
	  fetchCategoryItem();
	});
	let closeForm = false;
  
	function togglemodal() {
	  closeForm = !closeForm;
	}

</script>

<Navbar />
<BookingPage {closeForm} {togglemodal}/>
<div class="venue overflow-hidden">
	<Category_1 title="Our Occasion Venues" />
	<div class="wedding-list w-[90%] mx-auto py-5">
		<div class="wedding-venues text-white py-10">
			{#each categoriesWithAll as category}
			<Headline headline={category} no={groupedVenues.filter((item) => item.category_name ===category).length} />

			<div
			class="venue-list flex flex-wrap justify-center sm:justify-start gap-y-10 md:gap-y-14 py-10 gap-x-10 md:gap-x-10"
		>
		{#each groupedVenues.filter((item) => item.category_name === category) as venues}
				<div
					class="venue-conatiner bg-white text-black shadow-lg shadow-gray-900 rounded-xl border-2 flex flex-col overflow-hidden gap-5 pb-5 justify-start items-start h-auto w-[15rem] lg:w-[22rem] md:w-[18rem]"
					on:click={togglemodal}
				>
					<div class="img-container relative">
						<div
							class="venue-img overflow-hidden h-[15rem] w-[15rem] md:w-[20rem] md:h-[20rem] lg:w-[22rem] flex justify-center items-center "
						>
							<img
								src={venues.image}
								alt={venues.title}
								class="absolute top-0 left-0 w-full h-full object-cover"
							/>
						</div>
						<div
							class="px-4 py-2 bg-green-900 shadow-md text-white rounded-full absolute bottom-3 right-5 md:right-10 lg:right-5"
						>
							<span class="font-bold">Book Now</span>
						</div>
					</div>
					<div class="details px-4 text-lg md:text-xl flex flex-col gap-2">
						<h3>
							{venues.title}<span class="font-bold">&nbsp; &nbsp;{venues.location}</span>
						</h3>

						
						<div class="flex gap-2 flex-wrap items-center pb-2">
							<span class="text-slate-400 line-through"> {venues.old_price > 0 ? `₹ ${venues.old_price}` : ''}</span>
							<button class="py-2 w-[7rem] rounded-full shadow-lg  bg-green-200">₹ {venues.new_price}</button>
						</div>
					</div>
				</div>
			{/each}
		</div>
			{/each}
			

			
		
			
		</div>
		

		<InfoContainer />
	</div>
	<Footer />
</div>
