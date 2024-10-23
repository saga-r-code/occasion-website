<script>
	import Category_2 from '$lib/categoryContainer/category-2.svelte';
	import Footer from '$lib/footer.svelte';
	import InfoContainer from '$lib/info-container.svelte';
	import Navbar from '$lib/navbar.svelte';
	import Container from './container.svelte';
	const completeEvents = [
		{
			id: 1,
			total: 10000,
			event: 'Wedding Vendors'
		},
		{
			id: 2,
			total: 20000,
			event: 'Annual Weddings'
		},
		{
			id: 3,
			total: 30800,
			event: 'Wedding Venues'
		},
		{
			id: 4,
			total: 1500000,
			event: 'Monthly Followers'
		}
	];

	const formatNumber = (value) => {
	//tofixed(1) output will always have one decimal place.
	if (value >= 1000000000) {
		return `${(value / 1000000000).toFixed(1)}B`;
	} else if (value >= 1000000) {
		return `${(value / 1000000).toFixed(1)}M`;
	} else if (value >= 10000) {
		return `${(value / 1000).toFixed(1)}K`;
	} else {
		return value.toString();
	}
};
</script>

<Navbar />
<div class="about">
	<Category_2 title="We Are Occasion" />
	<Container heading="About Us" order="0" />
	<div class="py-10">
		<div
			class="people text-white mx-auto px-10 text-base bg-[#50808e] grid grid-cols-2 place-items-center md:flex md:justify-center md:items-center gap-y-10 gap-x-14 md:gap-20 py-5"
		>
			{#each completeEvents as events}
				<div>
					<h1 class="text-xl md:text-2xl lg:text-3xl font-extrabold">
						{formatNumber(events.total)}
					</h1>
					<span class=" font-semibold md:text-lg lg:text-xl">{events.event}</span>
				</div>
			{/each}
		</div>
	</div>
	<Container heading="What We offer ?" order="1" />
	<div class="w-[80%] mx-auto">
		<InfoContainer />
	</div>
	<Container heading="Who We Are ?" order="2" />

	<Footer />
</div>

<style>
</style>
