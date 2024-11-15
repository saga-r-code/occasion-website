<!-- info-container end -->

<script>
	import img from '../lib/Images/lantern-2.jpg';
</script>

<div class="info-container pb-14 text-white">
	<div
		class="info rounded-xl w-full shadow-lg h-auto p-3 sm:p-10 gap-10 flex flex-col justify-between items-center relative xl:px-30 2xl:px-40 2xl:gap-10 xl:flex-row 2xl:h-[30rem]"
	>
		<div
			class="img bg-slate-200 relative h-52 sm:h-[20rem] w-full 2xl:w-[25rem] flex justify-center items-center"
		>
			<img src={img} alt="img" class="absolute top-0 left-0 w-full h-full object-cover" />
		</div>
		<div class="details flex flex-col 2xl:w-[40rem] justify-center items-start gap-4">
			<h3 class="font-bold text-2xl md:text-3xl">Celebrate Your Special Moments</h3>
			<p class="text-lg sm:text-2xl h-40 overflow-y-scroll">
				From weddings to birthdays, corporate events to intimate gatherings, we help you create
				unforgettable experiences. Our expert team handles every detail, from venue selection and
				decor to catering and entertainment. Let us turn your vision into a stunning reality,
				ensuring your special day is filled with joy, laughter, and cherished memories.
			</p>
			<div
				class="bg-[#50808e] rounded-md font-bold hover:bg-[#215f70] active:bg-[#50808e] px-10 py-2 sm:py-3 flex justify-center items-center 2xl:absolute bottom-14 right-20"
			>
				<a href="/contact">Contact Us</a>
			</div>
		</div>
	</div>
</div>

<style>
	.info {
		background: linear-gradient(to bottom, #034b5c, #075466, #096c8f);
	}
</style>
