<script>
	import Category_1 from '$lib/categoryContainer/category-1.svelte';
	import Footer from '$lib/footer.svelte';
	import Headline from '$lib/headline.svelte';
	import InfoContainer from '$lib/info-container.svelte';
	import Navbar from '$lib/navbar.svelte';
	import Card from './card.svelte';

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

	
</script>

<Navbar />
<BookingPage />
<div class="services">
	<Category_1 title="Occasion Services " />
	<div class="services-container w-[80%] mx-auto text-white">
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

			<!-- pagination -->
			<div class="pagination">
				<button class={`flex absolute bg-[#50808e] w-10 h-10 md:w-[50px] md:h-[50px] rounded-full z-10 top-[40%] -left-5 justify-center items-center`}>
					<i class="fa-solid fa-angles-left"></i>
				</button>

				<button class={`flex absolute bg-[#50808e] w-10 h-10 md:w-[50px] md:h-[50px] rounded-full z-10 top-[40%] -right-5  justify-center items-center`}>
					<i class="fa-solid fa-angles-right"></i>
				</button>
			</div>

			<div class="venue-list flex overflow-x-auto gap-y-5 py-10 gap-x-10 ">
				{#each decorator as event}
					<Card {event} />
				{/each}
			</div>
		</div>

		<div class="cards  relative">
			<Headline headline="Ultimate Venues" no={venues.length} />

			<!-- pagination -->
			<div class="pagination">
				<button class={`flex absolute bg-[#50808e] w-10 h-10 md:w-[50px] md:h-[50px] rounded-full z-10 top-[40%] -left-5 justify-center items-center`}>
					<i class="fa-solid fa-angles-left"></i>
				</button>

				<button class={`flex absolute bg-[#50808e] w-10 h-10 md:w-[50px] md:h-[50px] rounded-full z-10 top-[40%] -right-5  justify-center items-center`}>
					<i class="fa-solid fa-angles-right"></i>
				</button>
			</div>

			<div class="venue-list flex overflow-x-auto gap-y-5 py-10 gap-x-10 ">
				{#each venues as event}
					<Card {event} />
				{/each}
			</div>
		</div>

		

		<InfoContainer />
	</div>
	<Footer />
</div>
