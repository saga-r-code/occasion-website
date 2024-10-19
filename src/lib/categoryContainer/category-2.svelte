<script>
	export let title;
	import video from '../Video/container-2.mp4';
</script>

<div
	class="category flex justify-center items-center flex-col gap-16 h-[25rem] relative "
>
	<video class="absolute top-0 left-0 w-full h-full object-cover" autoplay muted loop>
		<source src={video} type="video/mp4" />
	</video>
	<div class="text-3xl md:text-5xl z-10 text-white flex justify-center items-center flex-col gap-3">
		<h1 class=" font-bold mb-10">{title}</h1>
		<p class="w-1/">We bring</p>
		<span class="font-bold">dream Weddings</span>
		<p>to life</p>
	</div>
</div>
