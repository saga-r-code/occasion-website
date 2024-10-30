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
			oldprice: 20000,
			price: 40000
		},
		{
			id: 2,
			img: venueimg2,
			title: 'Charming Rustic Countryside Wedding',
			city: 'Dombivli',
			ratting: 4,
			oldprice: 20000,
			price: 35000
		},
		{
			id: 3,
			img: venueimg3,
			title: 'Majestic Castle Wedding',
			city: 'Kalyan',
			ratting: 3,
			oldprice: 20000,
			price: 45000
		},
		{
			id: 4,
			img: venueimg4,
			title: 'Enchanting Garden Wedding',
			city: 'Dombivli',
			ratting: 3,
			oldprice: 20000,
			price: 10000
		},
		{
			id: 5,
			img: venueimg5,
			title: 'Banquet Hall Wedding',
			city: 'Kalyan',
			ratting: 3,
			oldprice: 20000,
			price: 10000
		},
		{
			id: 6,
			img: venueimg6,
			title: 'Cozy Rooftop Wedding',
			city: 'Dombivli',
			ratting: 3,
			oldprice: 20000,
			price: 10440
		},
		{
			id: 7,
			img: venueimg7,
			title: 'Elegant Hotel Wedding',
			city: 'Kalyan',
			ratting: 3,
			oldprice: 20000,
			price: 40000
		},
		{
			id: 8,
			img: venueimg8,
			title: 'Trendy Urban Wedding',
			city: 'Dombivli',
			ratting: 3,
			oldprice: 20000,
			price: 30000
		},
		{
			id: 9,
			img: venueimg9,
			title: 'Charming Cabin Wedding',
			city: 'Kalyan',
			ratting: 3,
			oldprice: 20000,
			price: 10000
		},
		{
			id: 10,
			img: venueimg10,
			title: 'Stylish Vineyard Wedding',
			city: 'Dombivli',
			ratting: 3,
			oldprice: 20000,
			price: 20000
		},
		{
			id: 11,
			img: venueimg11,
			title: 'Starlit Beachfront Wedding',
			city: 'Kalyan',
			ratting: 3,
			oldprice: 20000,
			price: 20000
		},
		{
			id: 12,
			img: venueimg12,
			title: 'Romantic Starlit  Wedding',
			city: 'Kalyan',
			ratting: 3,
			oldprice: 20000,
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
			oldprice: 20000,
			price: 35000
		},
		{
			id: 2,
			img: outdoorimg2,
			title: 'Elegant Flower Decoration',
			city: 'Kalyan',
			ratting: 3,
			oldprice: 20000,
			price: 45000
		},
		{
			id: 3,
			img: outdoorimg3,
			title: 'Charming Garden Wedding',
			city: 'Dombivli',
			ratting: 3,
			oldprice: 20000,
			price: 10000
		},
		{
			id: 4,
			img: outdoorimg4,
			title: 'Outdoor Wedding Decoration',
			city: 'Kalyan',
			ratting: 3,
			oldprice: 20000,
			price: 10000
		},

		{
			id: 5,
			img: outdoorimg5,
			title: 'Traditional Temple Wedding',
			city: 'Kalyan',
			ratting: 3,
			oldprice: 20000,
			price: 40000
		},
		{
			id: 6,
			img: outdoorimg6,
			title: 'Flower  Petal Wedding',
			city: 'Kalyan',
			ratting: 5,
			oldprice: 20000,
			price: 40000
		}
	];

	let currentIndex = 0;

	function showPrevious() {
		currentIndex = (currentIndex > 0) ? currentIndex - 1 : outdoorvenue.length - 1;
	}

	function showNext() {
		currentIndex = (currentIndex < outdoorvenue.length - 1) ? currentIndex + 1 : 0;
	}
	
</script>

<Navbar />
<div class="venue overflow-hidden">
	<Category_1 title="Our Occasion Venues" />
	<div class="wedding-list w-[90%] mx-auto py-5">
		<div class="wedding-venues text-white py-10">
			<Headline headline="Ceremony Decorations" no={weddingVenue.length} />

			<!-- Venue cards -->
			<div
				class="venue-list flex flex-wrap justify-center sm:justify-start gap-y-10 md:gap-y-14 py-10 gap-x-10 md:gap-x-10"
			>
				{#each weddingVenue as venues}
					<div
						class="venue-conatiner rounded-xl border-2 flex flex-col overflow-hidden gap-5 pb-5 justify-start items-start h-auto w-[15rem] lg:w-[22rem] md:w-[18rem]"
					>
						<div class="img-container relative">
							<div
								class="venue-img overflow-hidden h-[15rem] w-[15rem] md:w-[20rem] md:h-[20rem] lg:w-[22rem] flex justify-center items-center bg-red-200"
							>
								<img
									src={venues.img}
									alt={venues.title}
									class="absolute top-0 left-0 w-full h-full object-cover"
								/>
							</div>
							<div
								class="px-4 py-2 bg-[#294b55] rounded-full absolute bottom-3 right-5 md:right-10 lg:right-5"
							>
								<span class="font-bold">Book Now</span>
							</div>
						</div>
						<div class="details px-4 text-lg md:text-xl flex flex-col gap-2">
							<h3>
								{venues.title}<span class="font-bold">&nbsp; &nbsp;{venues.city}</span>
							</h3>

							<ul class="flex gap-1">
								{#each Array(venues.ratting) as _}
									<li>★</li>
								{/each}
							</ul>
							<div class="flex gap-2 flex-wrap items-center pb-2">
								<span class="text-slate-400 line-through">₹ {venues.oldprice}</span>
								<button class="py-2 w-[7rem] rounded-full bg-[#50808e]">₹ {venues.price}</button>
							</div>
						</div>
					</div>
				{/each}
			</div>
			<!-- Venue List end -->
		</div>

		<div class="outdoor-venu py-10 relative text-white">
			<Headline headline="Outdoor Decoration" no={outdoorvenue.length} />

			<!-- pagination -->
			<div class="pagination">
				<button
					class="flex absolute bg-[#50808e] w-10 h-10 md:w-[50px] md:h-[50px] rounded-full z-10 top-[40%] -left-3 justify-center items-center"
					on:click={showPrevious}
				>
					<i class="fa-solid fa-angles-left"></i>
				</button>
		
				<button
					class="flex absolute bg-[#50808e] w-10 h-10 md:w-[50px] md:h-[50px] rounded-full z-10 top-[40%] -right-5 justify-center items-center"
					on:click={showNext}
				>
					<i class="fa-solid fa-angles-right"></i>
				</button>
			</div>

			<!-- cards -->
			<div class="venue-list flex py-10 gap-x-3 md:gap-x-10 overflow-x-auto">
				{#each outdoorvenue as venues, index}
					<div
						class="venue-card flex flex-col gap-5 pb-5 justify-start items-start h-[30rem] w-[15rem] md:w-[22rem] md:h-[35rem]"
						class:hidden={index !== currentIndex}
					>
						<div class="border-2 rounded-xl overflow-hidden">
							<div class="img-container relative">
								<div class="venue-img h-[15rem] w-[15rem] md:w-[22rem] md:h-[20rem] flex justify-center items-center">
									<img src={venues.img} alt={venues.title} class="absolute top-0 left-0 w-full h-full object-cover" />
								</div>
								<div class="px-4 py-1 bg-[#294b55] rounded-full absolute bottom-3 right-5">
									<span class="font-bold italic">Explore</span>
								</div>
							</div>
							<div class="details px-4 py-3 text-lg md:text-xl flex flex-col gap-2">
								<h3>
									{venues.title}<span class="font-bold">&nbsp; &nbsp;{venues.city}</span>
								</h3>
		
								<ul class="flex gap-1">
									{#each Array(venues.ratting) as _}
										<li>★</li>
									{/each}
								</ul>
		
								<div class="flex gap-2 flex-wrap items-center pb-3">
									<span class="text-slate-400 line-through">₹ {venues.oldprice}</span>
									<button class="py-2 w-[7rem] rounded-full bg-[#50808e]">₹ {venues.price}</button>
								</div>
							</div>
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
