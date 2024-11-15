<script>
    import Category_1 from '$lib/categoryContainer/category-1.svelte';
    import Footer from '$lib/footer.svelte';
    import Headline from '$lib/headline.svelte';
    import InfoContainer from '$lib/info-container.svelte';
    import Navbar from '$lib/navbar.svelte';
    import BookingPage from '$lib/booking-page.svelte';

    import Service1 from '../../lib/Images/service-2.jpeg';
    import Service2 from '../../lib/Images/service-3.webp';

    const supplier = [
        { id: 1, img: Service1, name: 'Decorator' },
        { id: 2, img: Service2, name: 'Venue Planner' },
    ];

    import { onMount } from 'svelte';

    let venue = [];
    let selectedCategory = 'All Venues';
    let categories = [];
    let DefaultImage = 'path/to/default/image.jpg'; // Define a default image path

    // Reactive statement to group venues based on selected category
    $: groupedVenues = selectedCategory === 'All Venues'
        ? venue
        : venue.filter((item) => item.category_name === selectedCategory);

    // Reactive statement to create a list of unique categories
    $: categoriesWithAll = [
        ...new Set(venue.map((item) => item.category_name)),
    ];

    // Fetch category items from the API
    const fetchCategoryItem = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/admin/category_item');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const fetchItem = await response.json();

            const result = fetchItem.map((item) => {
                if (item.image && item.image.data) {
                    const base64toImage = btoa(
                        String.fromCharCode(...new Uint8Array(item.image.data))
                    );
                    item.image = `data:image/jpeg;base64,${base64toImage}`;
                } else {
                    item.image = DefaultImage; // Use default image if not available
                }
                return item;
            });

            venue = result;
        } catch (error) {
            console.error('Error fetching categories:', error);
            // Consider adding user feedback here
        }
    };

    onMount(() => {
        fetchCategoryItem();
    });

    let closeForm = false;

    // Toggle modal visibility
    function togglemodal() {
        closeForm = !closeForm;
    }
</script>

<Navbar />
<BookingPage {closeForm} {togglemodal} />
<div class="services">
    <Category_1 title="Occasion Services" />
    <div class="services-container w-[90%] mx-auto text-white">
        <div class="category py-10">
            <h1 class="text-3xl font-semibold">Services Category</h1>

            <div class="services-list flex gap-y-10 py-10 flex-wrap">
                {#each supplier as list}
                    <div class="flex gap-5 items-center w-[15rem] flex-col">
                        <div class="w-28 h-28 md:w-32 md:h-32 relative overflow-hidden rounded-full border-2 border-white flex justify-center items-center">
                            <img src={list.img} alt={list.name} class="absolute top-0 left-0 w-full h-full object-cover" />
                        </div>
                        <h2 class="font-medium text-xl text-center">{list.name}</h2>
                    </div>
                {/each}
            </div>
        </div>

        <div class="cards relative">
            {#each categoriesWithAll as category}
                <Headline headline={category} no={groupedVenues.filter((item) => item.category_name === category).length} />
					<div class="venue-list grid sm:grid-cols-2 lg:flex lg:flex-wrap py-10 gap-x-3 md:gap-x-16 items-center">
					{#each groupedVenues.filter((item) => item.category_name === category) as event}
						<div class="venue-container flex flex-col px-3 gap-5 justify-start items-start h-[22rem] w-[15rem] lg:w-[20rem] md:w-[18rem] md:h-[28rem]" on:click={togglemodal}>
								<div class="img-container relative">
									<div class="venue-img relative overflow-hidden hover:scale-105 rounded-2xl h-[15rem] w-[15rem] md:w-[20rem] md:h-[20rem] lg:w-[22rem] flex justify-center items-center bg-red -200">
										<img src={event.image} alt={event.title} class="absolute top-0 left-0 w-full h-full object-cover" />
									</div>
									<div class="px-4 py-2 bg-[#294b55] rounded-full absolute bottom-3 right-5">
										<span class="font-bold">Book Now</span>
									</div>
								</div>
								<div class="details text-lg md:text-xl">
									<h3>
										{event.title}<span class="font-bold">&nbsp;{event.location}</span>
									</h3>
								</div>
							</div>
						{/each}
					</div>
            {/each}

           
        </div>

        <InfoContainer />
    </div>
    <Footer />
</div>