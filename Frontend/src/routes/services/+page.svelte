<script>
	import Category_1 from '$lib/categoryContainer/category-1.svelte';
	import Footer from '$lib/footer.svelte';
	import Headline from '$lib/headline.svelte';
	import InfoContainer from '$lib/info-container.svelte';
	import Navbar from '$lib/navbar.svelte';

	import Service1 from '../../lib/Images/service-2.jpeg'
	import Service2 from '../../lib/Images/service-3.webp'

	import Decoration1 from '../../lib/Images/decoration-1.jpeg'
	import Decoration2 from '../../lib/Images/decoration-2.jpeg'
	import Decoration3 from '../../lib/Images/decoration-3.jpeg'
	import Decoration4 from '../../lib/Images/decoration-4.jpeg'
	import Decoration5 from '../../lib/Images/decoration-5.jpeg'
	import Decoration6 from '../../lib/Images/decoration-6.jpeg'

	import Venue1 from '../../lib/Images/venue-1.jpeg'
	import Venue2 from '../../lib/Images/venue-2.jpeg'
	import Venue3 from '../../lib/Images/venue-3.webp'
	import Venue4 from '../../lib/Images/venue-4.jpeg'
	import Venue5 from '../../lib/Images/venue-5.jpeg'
	import Venue6 from '../../lib/Images/venue-6.jpeg'
	import BookingPage from '$lib/booking-page.svelte';



	const supplier = [
		{ id: 1, img: Service1, name: 'Decorator' },
		{ id: 2, img: Service2, name: 'Venue Planner' },
	];

	const decorator = [
		{
			id: 1,
			img: Decoration1,
			title: 'Luxurious Lantern Getaway',
			city: 'Kalyan',
			ratting: 5
		},
		{
			id: 2,
			img: Decoration2,
			title: 'Romantic Travel Wedding Experience',
			city: 'Dombivali',
			ratting: 4
		},
		{
			id: 3,
			img: Decoration3,
			title: 'Lavish Floral Arrangements',
			city: 'Kalyan',
			ratting: 3
		},
		{
			id: 4,
			img: Decoration4,
			title: 'Elegant Table Settings',
			city: 'Dombivali',
			ratting: 3
		},
		{
			id: 5,
			img: Decoration5,
			title: 'Serene Honeymoon Destinations',
			city: 'Kalyan',
			ratting: 3
		},
		{
			id: 6,
			img: Decoration6,
			title: 'Themed Event Decorations',
			city: 'Dombivali',
			ratting: 3
		},
		
	];

	const venues = [
		{
			id: 1,
			img: Venue1,
			title: 'Elegant Garden Wedding',
			city: 'Kalyan',
			ratting: 5
		},
		{
			id: 2,
			img: Venue2,
			title: 'Luxurious Banquet Hall',
			city: 'Dombiavli',
			ratting: 4
		},
		{
			id: 3,
			img: Venue3,
			title: 'Charming Beachside Venue',
			city: 'Kalyan',
			ratting: 3
		},
		{
			id: 4,
			img: Venue4,
			title: 'Rustic Farmhouse Celebration',
			city: 'Dombiavli',
			ratting: 3
		},
		{
			id: 5,
			img: Venue5,
			title: 'Birthday Celebration Theme ',
			city: 'Kalyan',
			ratting: 3
		},
		{
			id: 6,
			img: Venue6,
			title: 'Creative vending Machine',
			city: 'Kalyan',
			ratting: 3
		}
	];

	

	let closeForm = false;

	function togglemodal() {
		closeForm = !closeForm;
	}

	
</script>

<Navbar />
<BookingPage {closeForm} {togglemodal}/>
<div class="services">
	<Category_1 title="Occasion Services " />
	<div class="services-container w-[90%] mx-auto text-white">
		<div class="category py-10">
			<h1 class="text-3xl font-semibold">Services Category</h1>

			<div class="services-list flex gap-y-10 py-10 flex-wrap">
				{#each supplier as list}
					<div class="flex gap-5 items-center w-[15rem] flex-col">
						<div
							class="w-28 h-28 md:w-32 md:h-32 relative overflow-hidden rounded-full border-2 border-white flex justify-center items-center"
						>
							<img
								src={list.img}
								alt={list.name}
								class="absolute top-0 left-0 w-full h-full object-cover"
							/>
						</div>
						<h2 class="font-medium text-xl text-center">{list.name}</h2>
					</div>
					{/each}
			</div>
		</div>
		<!-- Category end -->

		<div class="cards  relative">
			<Headline headline="Event Decoration" no={decorator.length} />

			<div class="venue-list grid sm:grid-cols-2 lg:flex lg:flex-wrap py-10 gap-x-3 md:gap-x-16 items-center">
				{#each decorator as event}
				<div
				class="venue-conatiner flex flex-col px-3 gap-5 justify-start items-start h-[22rem] w-[15rem] lg:w-[20rem] md:w-[18rem] md:h-[28rem]"
				on:click={togglemodal}>
				<div class="img-container relative">
					<div
						class="venue-img relative overflow-hidden hover:scale-105 rounded-2xl h-[15rem] w-[15rem] md:w-[20rem] md:h-[20rem] lg:w-[22rem] flex justify-center items-center bg-red-200"
					>
						<img
							src={event.img}
							alt={event.title}
							class="absolute top-0 left-0 w-full h-full object-cover"
						/>
					</div>
					<div class="px-4 py-2 bg-[#294b55] rounded-full absolute bottom-3 right-5">
						<span class="font-bold">Book Now</span>
					</div>
				</div>
				<div class="details text-lg md:text-xl">
					<h3>
						{event.title}<span class="font-bold">&nbsp;{event.city}</span>
					</h3>
			
					
				</div>
			</div>
				{/each}
			</div>
		</div>

		<div class="cards  relative">
			<Headline headline="Ultimate Venues" no={venues.length} />

			<div class="venue-list grid sm:grid-cols-2 lg:flex lg:flex-wrap py-10 gap-x-3 md:gap-x-16 items-center ">
				{#each venues as event}
				<div
				class="venue-conatiner flex flex-col px-3 gap-5 justify-start items-start h-[22rem] w-[15rem] lg:w-[20rem] md:w-[18rem] md:h-[28rem]"
				on:click={togglemodal}>
				<div class="img-container relative">
					<div
						class="venue-img relative overflow-hidden hover:scale-105 rounded-2xl h-[15rem] w-[15rem] md:w-[20rem] md:h-[20rem] lg:w-[22rem] flex justify-center items-center bg-red-200"
					>
						<img
							src={event.img}
							alt={event.title}
							class="absolute top-0 left-0 w-full h-full object-cover"
						/>
					</div>
					<div class="px-4 py-2 bg-[#294b55] rounded-full absolute bottom-3 right-5">
						<span class="font-bold">Book Now</span>
					</div>
				</div>
				<div class="details text-lg md:text-xl">
					<h3>
						{event.title}<span class="font-bold">&nbsp;{event.city}</span>
					</h3>
			
					
				</div>
			</div>
				{/each}
			</div>
		</div>

		

		<InfoContainer />
	</div>
	<Footer />
</div>
