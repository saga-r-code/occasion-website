<script>
	import Category_1 from '$lib/categoryContainer/category-1.svelte';
	import Footer from '$lib/footer.svelte';
	import Headline from '$lib/headline.svelte';
	import InfoContainer from '$lib/info-container.svelte';

	import categoryimg1 from '../../lib/Images/birthday-2.avif';
	import categoryimg2 from '../../lib/Images/haldi-1.jpg';
	import categoryimg3 from '../../lib/Images/wedding-2.jpg';
	import categoryimg4 from '../../lib/Images/birthday-1.jpg';
	import categoryimg5 from '../../lib/Images/wedding-3.jpg';

	import venueimg1 from '../../lib/Images/wedding-1.jpg';
	import venueimg2 from '../../lib/Images/Engagement.jpg';
	import venueimg3 from '../../lib/Images/outdoor dec.jpg';
	import venueimg4 from '../../lib/Images/louge.jpg';
	import venueimg5 from '../../lib/Images/welocme dec.jpg';

	import decoimg1 from '../../lib/Images/birthday-1.jpg';
	import decoimg2 from '../../lib/Images/wedding-1.jpg';
	import decoimg3 from '../../lib/Images/haldi-2.jpg';
	import decoimg4 from '../../lib/Images/babyshower.jpg';
	import decoimg5 from '../../lib/Images/party-1.jpg';
	import decoimg6 from '../../lib/Images/anniversary.jpg';
	import decoimg7 from '../../lib/Images/lanterns-1.jpg';

	import review1 from '../../lib/Images/profile.jpg';
	import Navbar from '$lib/navbar.svelte';
	import LoginPage from '$lib/login-page.svelte';

	// import { onMount } from 'svelte';

	//Category-cards
	const cards = [
		{
			id: 1,
			img: categoryimg1,
			title: 'Birthday Party'
		},

		{
			id: 2,
			img: categoryimg2,
			title: 'Haldi Decoration '
		},
		{
			id: 3,
			img: categoryimg3,
			title: 'Wedding Decoration'
		},
		{
			id: 4,
			img: categoryimg4,
			title: 'Birthday Decoration '
		},
		{
			id: 5,
			img: categoryimg5,
			title: 'Wedding Events '
		}
	];

	//Venue-cards
	const venueCards = [
		{
			id: 1,
			img: venueimg1,
			title: 'Wedding Decoration',
			country: 'Bharat'
		},
		{
			id: 2,
			img: venueimg2,
			title: 'Engagement Decoration ',
			country: 'Bharat'
		},
		{
			id: 3,
			img: venueimg3,
			title: 'Outdoor Decoration ',
			country: 'Bharat'
		},
		{
			id: 4,
			img: venueimg4,
			title: 'Outside Event ',
			country: 'Bharat'
		},
		{
			id: 5,
			img: venueimg5,
			title: 'Welecome Decoration',
			country: 'Bharat'
		}
	];

	// Feature-cards
	const decorationCard = [
		{
			id: 1,
			img: decoimg1,
			title: 'Birthday Celebartion'
		},
		{
			id: 2,
			img: decoimg2,
			title: 'Wedding Decoration'
		},
		{
			id: 3,
			img: decoimg3,
			title: 'Haldi Event'
		},
		{
			id: 4,
			img: decoimg4,
			title: 'BabyShower Event'
		},
		{
			id: 5,
			img: decoimg5,
			title: 'Celebration Party'
		},
		{
			id: 6,
			img: decoimg6,
			title: 'Anniversary Decoration'
		},
		{
			id: 7,
			img: decoimg7,
			title: 'Festival Theme'
		}
	];


	let open = false;

	function togglemodal() {
		open = !open;
	}
</script>

<Navbar />
<LoginPage {open} {togglemodal}/>
<div class="Home">
	<Category_1 title="Your Occasion, Your Way" />
	<div class="some-list w-[90%] mx-auto text-white">
		<div class="browse-category py-10 relative">
			<Headline headline="Browse by Category" no={cards.length} />

			
			
			<!-- cards -->
			<div class="category-list grid sm:grid-cols-2 lg:flex lg:flex-wrap py-10 gap-x-3 md:gap-x-16 items-center">
				{#each cards as c}
					<div
						class="category-card my-5 flex-col gap-5 justify-start items-start md:w-[20rem] w-[15rem] h-[20rem]"
						on:click={togglemodal}
					>
						<!--outerbox-->
						<div
							class="category-img relative overflow-hidden h-[15rem] hover:scale-105 w-[15rem] md:w-[22rem] flex justify-center items-center rounded-2xl"
						>
							<img
								src={c.img}
								alt={c.title}
								class="absolute top-0 left-0 w-full h-full object-cover"
							/>
						</div>
						<div>
							<h3 class="font-bold text-lg md:text-xl text-center mt-5">{c.title}</h3>
						</div>
					</div>
				{/each}
			</div>
		</div>
		<!-- browse-category end -->

		<div class="popular-venu  relative">
			
			<Headline headline="Popular Venue" no={venueCards.length} />

			

			<!-- cards -->
			<div class="venue-list grid sm:grid-cols-2 lg:flex lg:flex-wrap py-10 gap-x-3 md:gap-x-16 items-center">
				{#each venueCards as venue}
					<div
						class="venue-card flex flex-col my-5 gap-5 justify-start items-start h-[22rem] w-[15rem] md:w-[20rem] md:h-[25rem]"
						on:click={togglemodal}
					>
						<!--outerbox-->
						<div class="img-container relative">
							<div
								class="venue-img hover:scale-105 h-[15rem] w-[15rem] md:w-[22rem] md:h-[20rem] flex justify-center items-center"
							>
								<img
									src={venue.img}
									alt={venue.title}
									class="absolute top-0 rounded-2xl left-0 w-full h-full object-cover"
								/>
							</div>
							<div class="px-4 py-1 bg-[#294b55] rounded-full absolute bottom-3 right-5">
								<span class="font-bold italic">Book Now</span>
							</div>
						</div>
						<div>
							<h3 class="md:text-xl">{venue.title}</h3>
							<h2 class="font-bold text-lg md:text-xl">{venue.country}</h2>
						</div>
					</div>
				{/each}
			</div>
		</div>
		<!-- popular-venu end -->

		<InfoContainer />
		<!-- info-container end -->

		<div class="decoration  relative">
			<Headline headline="Best Decoration And Event Plans" no={decorationCard.length} />
			<div
				class="decoration-list grid sm:grid-cols-2 lg:flex lg:flex-wrap py-10 gap-x-3 md:gap-x-16 items-center"
			>
				{#each decorationCard as deco}
					<div
						class="decoration-cards flex flex-col py-5 gap-5 justify-start items-start w-[15rem] h-auto md:w-[20rem] rounded-2xl"
						on:click={togglemodal}
					>
						<div class="flex flex-col  justify-center items-center">
							<div
								class="decoration-img relative hover:scale-105 h-[15rem] w-[15rem] md:w-[20rem] flex justify-center items-center rounded-2xl overflow-hidden"
							>
								<img
									src={deco.img}
									alt={deco.title}
									class="absolute top-0 left-0 w-full h-full object-cover"
								/>
							</div>
							<h3 class="font-bold text-lg md:text-xl px-5 pt-3">{deco.title}</h3>
						</div>
					</div>
				{/each}
			</div>
		</div>
		<!-- featured-video end -->

	</div>
	<!-- End -->
	<Footer />
</div>
