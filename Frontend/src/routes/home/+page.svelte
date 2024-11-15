<script>
	import Category_1 from '$lib/categoryContainer/category-1.svelte';
	import Footer from '$lib/footer.svelte';
	import Headline from '$lib/headline.svelte';
	import InfoContainer from '$lib/info-container.svelte';
	import Navbar from '$lib/navbar.svelte';
	import BookingPage from '$lib/booking-page.svelte';
	import DefaultImage from '$lib/Images/default.jpg'
  
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
		const response = await fetch('http://localhost:3000/api/admin/category_item');
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
  <BookingPage {closeForm} {togglemodal} />
  <div class="Home">
	<Category_1 title="Your Occasion, Your Way" />
	<div class="some-list w-[90%] mx-auto text-white">
	  <div class="browse-category py-10 relative">
		{#each categoriesWithAll as category}
		  <Headline
			headline={category}
			no={groupedVenues.filter((item) => item.category_name === category).length}
		  />
		  <div class="category-list grid sm:grid-cols-2 lg:flex lg:flex-wrap py-10 gap-x-3 md:gap-x-16 items-center">
			{#each groupedVenues.filter((item) => item.category_name === category) as c}
			  <div
				class="category-card my-5 flex-col gap-5 justify-start items-start md:w-[20rem] w-[15rem] h-[20rem]"
				on:click={togglemodal}
			  >
				<div
				  class="category-img relative overflow-hidden h-[15rem] hover:scale-105 w-[15rem] md:w-[22rem] flex justify-center items-center rounded-2xl"
				>
				  <img
					src={c.image}
					alt={c.title}
					class="absolute top-0 left-0 w-full h-full object-cover"
				  />
				</div>
				<div>
				  <h3 class="font-bold text-lg md:text-2xl text-center mt-5">{c.title}</h3>
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
  