
<script>
	export let heading;
    export let order;
</script>

<div class="w-[90%] mx-auto flex justify-center  flex-col lg:flex-row items-center gap-20 py-10 text-white overflow-hidden">
	<div class={`detail flex flex-col gap-8 justify-center lg:w-1/2  order-${order}`}>
		<h1 class="text-xl md:text-3xl font-bold">{heading}</h1>
		{#if heading === "About Us" }
			<p class="text-lg md:text-2xl">
				Occasion is your premier destination for all things wedding-related. We understand that your special day deserves nothing but the best, which is why we've curated a comprehensive platform connecting couples with top-notch wedding vendors and stunning venues. Our mission is to simplify the wedding planning process, making it enjoyable and stress-free for couples across the country.
			</p>
		{:else if heading === "What We offer ?"}
			<p class="text-lg md:text-2xl">
				At Occasion, we offer a wide range of services to make your wedding planning journey seamless. Our platform provides access to thousands of verified wedding vendors, from photographers and florists to caterers and entertainment. We also showcase an extensive collection of wedding venues to suit every style and budget. Additionally, our blog offers inspiration, tips, and expert advice to help you create the wedding of your dreams.
			</p>
		{:else if heading === "Who We Are ?"}
			<p class="text-lg md:text-2xl">
				We are a passionate team of wedding enthusiasts and tech experts dedicated to revolutionizing the wedding industry. With years of experience and a deep understanding of couples' needs, we've built a platform that combines innovation with tradition. Our goal is to empower couples to plan their perfect day while supporting local businesses and creative professionals in the wedding industry.
			</p>
		{/if}
	</div>
	<div class="img  rounded-xl overflow-hidden border-2 ">
		<img src="https://www.related.com/sites/default/files/styles/4x3_horizontal_rectangle_w/public/2024-08/acquiadam-assets/related-corporate-our-company-landscape-img_4238.jpg?itok=WkYininz" alt="" class=" object-cover md:h-[25rem]">
	</div>
</div> 


