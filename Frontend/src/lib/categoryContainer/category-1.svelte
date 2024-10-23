<script>
	export let title;
	import video from '../Video/container-bg.mp4';
	const category = [
		{
			id: 1,
			name: 'Charity Events'
		},
		{
			id: 2,
			name: 'Fashion Events'
		},
		{
			id: 3,
			name: 'Festival'
		},
		{
			id: 4,
			name: 'Wedding Events'
		},
		{
			id: 5,
			name: 'Parties '
		},
		{
			id: 6,
			name: 'Seminar'
		}
	];
	const location = [
		{
			id: 1,
			name: 'Kalyan'
		},
		{
			id: 2,
			name: 'Dombivali'
		},
		{
			id: 3,
			name: 'Thane'
		},
		{
			id: 4,
			name: 'Ghatkopar'
		},
		{
			id: 5,
			name: 'Mulund'
		},
		{
			id: 6,
			name: 'Mumbai'
		}
	];
</script>

<div
	class="category text-white flex justify-start md:justify-end items-center flex-col gap-5 h-[25rem] p-8  relative overflow-hidden"
>
	<video class="absolute top-0 left-0 w-full h-full object-cover" autoplay muted loop>
		<source src={video} type="video/mp4" />
	</video>
	<div
		class="dropdown-btn z-10 flex flex-wrap md:flex-row justify-center items-center gap-10 md:p-10 pt-3 md:text-lg"
	>
		<h1 class="text-3xl md:text-4xl xl:text-5xl w-[100vw]  text-center font-medium">{title}</h1>

		<select
			name="category"
			id="category"
			class="rounded-lg bg-white bg-opacity-30 backdrop-blur-md border py-4 pr-28 2xl:pr-60 pl-5 xl"
		>
			<option value="" disabled selected>Choose a category</option>
			{#each category as cat}
				<option value={cat.id}>{cat.name}</option>
			{/each}
		</select>
		<select
			name="location"
			id="location"
			class="rounded-lg bg-white bg-opacity-30 backdrop-blur-md border-2 py-4 pr-28 2xl:pr-60 pl-5 xl"
		>
			<option value="" disabled selected>Choose a Location</option>
			{#each location as loc}
				<option value={loc.id}>{loc.name}</option>
			{/each}
		</select>
		<div
			class="search bg-[#50808e] font-bold text-xl text-center text-white rounded-lg py-3 px-28 2xl:px-40 cursor-pointer active:bg-[#50808e] hover:bg-[#315763]"
		>
			Search
		</div>
	</div>
</div>
