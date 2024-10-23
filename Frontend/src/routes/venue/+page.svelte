<script>
	import Category_1 from '$lib/categoryContainer/category-1.svelte';
	import Footer from '$lib/footer.svelte';
	import Headline from '$lib/headline.svelte';
	import InfoContainer from '$lib/info-container.svelte';
	import Navbar from '$lib/navbar.svelte';

	import venueimg1 from '../../lib/Images/wedding-1.jpg';
	import venueimg2 from '../../lib/Images/wedding-5.jpg';
	import venueimg3 from '../../lib/Images/lantern-4.jpg';
	import venueimg4 from '../../lib/Images/mehndi.jpg';
	import venueimg5 from '../../lib/Images/wedding-7.jpg';
	import venueimg6 from '../../lib/Images/chairs-2.jpg';
	import venueimg7 from '../../lib/Images/wedding-8.jpg';
	import venueimg8 from '../../lib/Images/wedding-4.jpg';
	import venueimg9 from '../../lib/Images/welocme dec.jpg';
	import venueimg10 from '../../lib/Images/flower.jpg';
	import venueimg11 from '../../lib/Images/lantern-3.jpg';
	import venueimg12 from '../../lib/Images/babyshowe-2.jpg';

	import outdoorimg1 from '../../lib/Images/Engagement.jpg';
	import outdoorimg2 from '../../lib/Images/outdoor dec.jpg';
	import outdoorimg3 from '../../lib/Images/louge.jpg';
	import outdoorimg4 from '../../lib/Images/chairs.jpg';
	import outdoorimg5 from '../../lib/Images/lanterns-1.jpg';
	import outdoorimg6 from '../../lib/Images/wedding-6.jpg';

	const weddingVenue = [
		{
			id: 1,
			img: venueimg1,
			title: 'Serene Beachfront Wedding',
			city: 'Kalyan',
			ratting: 5,
			price: 40000
		},
		{
			id: 2,
			img: venueimg2,
			title: 'Charming Rustic Countryside Wedding',
			city: 'Dombivli',
			ratting: 4,
			price: 35000
		},
		{
			id: 3,
			img: venueimg3,
			title: 'Majestic Castle Wedding',
			city: 'Kalyan',
			ratting: 3,
			price: 45000
		},
		{
			id: 4,
			img: venueimg4,
			title: 'Enchanting Garden Wedding',
			city: 'Dombivli',
			ratting: 3,
			price: 10000
		},
		{
			id: 5,
			img: venueimg5,
			title: 'Banquet Hall Wedding',
			city: 'Kalyan',
			ratting: 3,
			price: 10000
		},
		{
			id: 6,
			img: venueimg6,
			title: 'Cozy Rooftop Wedding',
			city: 'Dombivli',
			ratting: 3,
			price: 10440
		},
		{
			id: 7,
			img: venueimg7,
			title: 'Elegant Hotel Wedding',
			city: 'Kalyan',
			ratting: 3,
			price: 40000
		},
		{
			id: 8,
			img: venueimg8,
			title: 'Trendy Urban Wedding',
			city: 'Dombivli',
			ratting: 3,
			price: 30000
		},
		{
			id: 9,
			img: venueimg9,
			title: 'Charming Cabin Wedding',
			city: 'Kalyan',
			ratting: 3,
			price: 10000
		},
		{
			id: 10,
			img: venueimg10,
			title: 'Stylish Vineyard Wedding',
			city: 'Dombivli',
			ratting: 3,
			price: 20000
		},
		{
			id: 11,
			img: venueimg11,
			title: 'Starlit Beachfront Wedding',
			city: 'Kalyan',
			ratting: 3,
			price: 20000
		},
		{
			id: 12,
			img: venueimg12,
			title: 'Romantic Starlit  Wedding',
			city: 'Kalyan',
			ratting: 3,
			price: 20000
		}
	];

	const outdoorvenue = [
		{
			id: 1,
			img: outdoorimg1,
			title: 'Rustic Countryside Wedding',
			city: 'Dombivli',
			ratting: 4,
			price: 35000
		},
		{
			id: 2,
			img: outdoorimg2,
			title: 'Elegant Flower Decoration',
			city: 'Kalyan',
			ratting: 3,
			price: 45000
		},
		{
			id: 3,
			img: outdoorimg3,
			title: 'Charming Garden Wedding',
			city: 'Dombivli',
			ratting: 3,
			price: 10000
		},
		{
			id: 4,
			img: outdoorimg4,
			title: 'Outdoor Wedding Decoration',
			city: 'Kalyan',
			ratting: 3,
			price: 10000
		},

		{
			id: 5,
			img: outdoorimg5,
			title: 'Traditional Temple Wedding',
			city: 'Kalyan',
			ratting: 3,
			price: 40000
		},
		{
			id: 6,
			img: outdoorimg6,
			title: 'Flower  Petal Wedding',
			city: 'Kalyan',
			ratting: 5,
			price: 40000
		}
	];
</script>

<Navbar />
<div class="venue overflow-hidden">
	<Category_1 title="Our Occasion Venues" />
	<div class="wedding-list w-[90%] mx-auto py-5">
		<div
			class="dropdown-btn flex flex-wrap justify-center items-center gap-10 p-10 text-lg lg:text-xl"
		>
			<select
				name="type"
				id="type"
				class="rounded-lg bg-white bg-opacity-30 backdrop-blur-md border text-white py-3 lg:py-4 xl:py-5 w-56 pl-3 md:pl-4 lg:pl-5"
			>
				<option value="" selected disabled>Venue Type</option>
				<option value="type 1">type 1</option>
				<option value="type 2">type 2</option>
				<option value="type 3">type 3</option>
				<option value="type 4">type 4</option>
			</select>

			<select
				name="rating"
				id="rating"
				class="rounded-lg bg-white bg-opacity-30 backdrop-blur-md border text-white py-3 lg:py-4 xl:py-5 w-56 pl-3 md:pl-4 lg:pl-5"
			>
				<option value="0" selected disabled>Rating</option>
				<option value="rating 1">1</option>
				<option value="rating 2">2</option>
				<option value="rating 3">3</option>
				<option value="rating 4">4</option>
			</select>

			<div
				class="search bg-[#50808E] font-bold text-center py-3 lg:py-4 xl:py-5 px-10 md:px-14 lg:px-16 xl:px-20 text-white rounded-xl"
			>
				Search
			</div>
		</div>

		<div class="wedding-venues py-10 text-white">
			<Headline headline="Ceremony Decorations" no="22" />

			<!-- Venue cards -->
			<div
				class="venue-list flex flex-wrap items-center justify-center sm:justify-start gap-y-10 md:gap-y-14 py-10 gap-x-10 md:gap-x-10"
			>
				{#each weddingVenue as venues}
					<div
						class="venue-conatiner flex flex-col px-3 gap-5 justify-start items-start h-[25rem] w-[15rem] lg:w-[22rem] md:w-[18rem] md:h-[30rem]"
					>
						<div class="img-container relative">
							<div
								class="venue-img relative hover:scale-105 overflow-hidden rounded-2xl h-[15rem] w-[15rem] md:w-[20rem] md:h-[20rem] lg:w-[22rem] flex justify-center items-center bg-red-200"
							>
								<img
									src={venues.img}
									alt={venues.title}
									class="absolute top-0 left-0 w-full h-full object-cover"
								/>
							</div>
							<div class="px-4 py-2 bg-[#294b55] rounded-full absolute bottom-3 right-5">
								<span class="font-bold">Book Now</span>
							</div>
						</div>
						<div class="details text-lg md:text-xl flex flex-col gap-2">
							<h3>
								{venues.title}<span class="font-bold">&nbsp; &nbsp;{venues.city}</span>
							</h3>

							<ul class="flex gap-1">
								{#each Array(venues.ratting) as _}
									<li>★</li>
								{/each}
								<span class="ml-5 text-slate-400">{venues.ratting} (22)</span>
							</ul>

							<button class="py-2 w-[7rem] rounded-full bg-[#50808e]">₹ {venues.price}</button>
						</div>
					</div>
				{/each}
			</div>
			<!-- Venue List end -->
		</div>

		<div class="outdoor-venu py-10 relative text-white">
			<Headline headline="Outdoor Decoration" no="20" />

			<!-- pagination -->
			<div class="pagination">
				<button
					class={`flex absolute bg-[#50808e] w-10 h-10 md:w-[50px] md:h-[50px] rounded-full z-10 top-[40%] -left-3 justify-center items-center`}
				>
					<i class="fa-solid fa-angles-left"></i>
				</button>

				<button
					class={`flex absolute bg-[#50808e] w-10 h-10 md:w-[50px] md:h-[50px] rounded-full z-10 top-[40%] -right-5  justify-center items-center`}
				>
					<i class="fa-solid fa-angles-right"></i>
				</button>
			</div>

			<!-- cards -->
			<div class="venue-list flex py-10 gap-x-3 md:gap-x-10 overflow-x-auto">
				{#each outdoorvenue as venues}
					<div
						class="venue-card flex flex-col px-3 gap-5 justify-start items-start h-[25rem] w-[15rem] md:w-[22rem] md:h-[30rem]"
					>
						<!--outerbox-->
						<div class="img-container relative">
							<div
								class="venue-img hover:scale-105 h-[15rem] w-[15rem] md:w-[22rem] md:h-[20rem] flex justify-center items-center"
							>
								<img
									src={venues.img}
									alt={venues.title}
									class="absolute top-0 rounded-2xl left-0 w-full h-full object-cover"
								/>
							</div>
							<div class="px-4 py-1 bg-[#294b55] rounded-full absolute bottom-3 right-5">
								<span class="font-bold italic">Explore</span>
							</div>
						</div>
						<div class="details text-lg md:text-xl flex flex-col gap-2">
							<h3>
								{venues.title}<span class="font-bold">&nbsp; &nbsp;{venues.city}</span>
							</h3>

							<ul class="flex gap-1">
								{#each Array(venues.ratting) as _}
									<li>★</li>
								{/each}
								<span class="ml-5 text-slate-400">{venues.ratting} (22)</span>
							</ul>

							<button class="py-2 w-[7rem] rounded-full bg-[#50808e]">₹ {venues.price}</button>
						</div>
					</div>
				{/each}
			</div>
		</div>
		<!-- Wediing-venues end -->

		<InfoContainer />
	</div>
	<Footer />
</div>
