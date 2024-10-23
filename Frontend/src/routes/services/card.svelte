<script>
	export let event;
</script>

<div
	class="venue-conatiner flex flex-col px-3 gap-5 justify-start items-start h-[22rem] w-[15rem] lg:w-[22rem] md:w-[18rem] md:h-[28rem]"
>
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

		<ul class="flex gap-1">
			{#each Array(event.ratting) as _}
				<li>★</li>
			{/each}
			<span class="ml-5 text-slate-400">{event.ratting} (22)</span>
		</ul>
	</div>
</div>

<!-- popular-suppliers end -->
