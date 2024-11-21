<script>
   import { onMount } from 'svelte';
  import img1 from '../lib/Images/lantern-2.jpg';
  import img2 from '../lib/Images/anniversary.jpg';
  import img3 from '../lib/Images/babyshower.jpg';
  import img4 from '../lib/Images/decoration-3.jpeg';
  import img5 from '../lib/Images/flower.jpg';
  import img6 from '../lib/Images/chairs-2.jpg';
	import LoginPage from './login-page.svelte';

  const images = [
    { id: 1, img: img1 },
    { id: 2, img: img2 },
    { id: 3, img: img3 },
    { id: 4, img: img4 },
    { id: 5, img: img5 },
    { id: 6, img: img6 },
    { id: 6, img: img6 },
  ];

  const customization = [
    {
      id: 1,
      img: img1,
      title: "Flower Decoration",
      desc: "Unleash fun with our 6x10 ft Jungle Giraffe Inflatable Bouncy! Exclusively for kids, quick 3-hour setup for instant playtime joy.",
      price: 5000
    },
    {
      id: 2,
      img: img2,
      title: "Flower Decoration",
      desc: "Unleash fun with our 6x10 ft Jungle Giraffe Inflatable Bouncy! Exclusively for kids, quick 3-hour setup for instant playtime joy.",
      price: 5000
    },
    {
      id: 3,
      img: img3,
      title: "Flower Decoration",
      desc: "Unleash fun with our 6x10 ft Jungle Giraffe Inflatable Bouncy! Exclusively for kids, quick 3-hour setup for instant playtime joy.",
      price: 5000
    },
    {
      id: 4,
      img: img4,
      title: "Flower Decoration",
      desc: "Unleash fun with our 6x10 ft Jungle Giraffe Inflatable Bouncy! Exclusively for kids, quick 3-hour setup for instant playtime joy.",
      price: 5000
    },
    {
      id: 5,
      img: img5,
      title: "Flower Decoration",
      desc: "Unleash fun with our 6x10 ft Jungle Giraffe Inflatable Bouncy! Exclusively for kids, quick 3-hour setup for instant playtime joy.",
      price: 5000
    },
    {
      id: 6,
      img: img6,
      title: "Flower Decoration",
      desc: "Unleash fun with our 6x10 ft Jungle Giraffe Inflatable Bouncy! Exclusively for kids, quick 3-hour setup for instant playtime joy.",
      price: 5000
    },
    

  ]

  let categoryData = {};
  let bookingsData = [];
  let inclusionsData = [];
  let customizationsData = [];
  let imagesData = [];


  let interval;
  let currentIndex = 0
  let val = 0
  let custom_item_price = 0;
  let price;
  let discount = 0;
  let discountPrice = (price * discount) / 100;
  let finalAmount = Math.round(price - discountPrice)

  
  let quantity = customization.map(() => 0)

  function totalCustomizationPrice() {
    custom_item_price = quantity.reduce((total, qty, idx) => total + qty * customization[idx].price)
  }

  function addItem(index) {
    quantity[index]++;
    totalCustomizationPrice()
  }

  function lessItem(index) {
    if (quantity[index] > 0) {
      quantity[index]--;
      totalCustomizationPrice()
    }
  }

  function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
  }

  function prevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
  }

  function selectImage(index) {
    currentIndex = index;
  }


  async function fetchingBookingPageDetail() {
  try {
    const response = await fetch('http://localhost:3000/api/admin/booking_details/39');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    // Log the full data to inspect the structure
    // console.log("Fetched Data:", data);

    const { category, bookings } = data;
    if (category && bookings && bookings.length > 0) {
        // Set category and booking data
        categoryData = data.category;
        bookingsData = data.bookings;
        
        // Assuming you want to use the first booking
        const firstBooking = bookingsData[0];
        
        // finalAmount = firstBooking.price; // Set the final amount
        // price = firstBooking.price;
        // discount = firstBooking.discount;
        // discountPrice = (price * discount) / 100; // Calculate discount price
        // custom_item_price = firstBooking.customizations.reduce((total, item) => total + item.price, 0); // Sum customizations
        inclusionsData = firstBooking.inclusions;
        customizationsData = firstBooking.customizations;
        imagesData = firstBooking.images;

        console.log("Category Data:", categoryData);
        console.log("Bookings Data:", bookingsData);
        console.log("Inclsuion Data:", inclusionsData);
        console.log("Images Data:", imagesData);
        console.log("Customization Data:", customizationsData);

     
    } else {
      console.error("Error: 'booking' is undefined or not an array.");
    }

  } catch (error) {
    console.error('Error fetching booking details:', error.message);
  }
}

  

  
  // Define Close Form Variable
  export let closeForm = false;
  let open = false
  

  // Define Toggle Modal Function
  function togglemodal() {
    closeForm = !closeForm;
  }

  function toggleLoginPage(){
    open = !open
  }

  onMount(()=>{
    fetchingBookingPageDetail()
  })

</script>

<!-- <LoginPage {open} {toggleLoginPage}/> -->
<!-- Conditional Rendering -->
{#if closeForm}
  <!-- Modal Container -->
  <div class="w-full h-[100vh] fixed top-0 bg-[rgba(0,0,0,0.7)] z-40 overflow-scroll overflow-x-hidden">
    <!-- Modal Content -->
    <div class="bg-white m-5 h-full relative overflow-y-scroll ">
      
      <!-- Close Button -->
      <button
      class="fa-solid fa-xmark text-2xl -mt-3 absolute bg-black text-white rounded-full px-2  top-10 right-10 float-right cursor-pointer"
      on:click={togglemodal}
    ></button>

      <!-- Modal Content -->
      <div class="flex justify-center mb-10 mt-10  items-center h-full flex-wrap md:flex-nowrap">

        <!-- Image Container -->
        <div class="img-container h-full w-full md:w-[50vw] py-14 md:px-3 lg:px-7 xl:px-14 2xl:px-24">
          <div class="relative w-full h-full bg-gray-100 shadow-lg rounded-lg overflow-hidden border-2 flex flex-col items-center">
            <!-- Main Image Section -->
            <div class="relative w-full h-[70vh] flex justify-center items-center">
              <button
                on:click={prevImage}
                class="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white w-10 h-10 md:w-12 md:h-12 rounded-full flex justify-center items-center shadow-md hover:bg-gray-200 transition"
              >
                <i class="fa-solid fa-angles-left text-gray-600"></i>
              </button>
              <img src={images[currentIndex].img} alt="Main Image" class="w-full h-full object-cover rounded-t-lg" />
              <button
                on:click={nextImage}
                class="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white w-10 h-10 md:w-12 md:h-12 rounded-full flex justify-center items-center shadow-md hover:bg-gray-200 transition"
              >
                <i class="fa-solid fa-angles-right text-gray-600"></i>
              </button>
            </div>
        
            <!-- Thumbnail Section -->
            <div class="w-[90%] mx-auto bg-gray-50 py-4 px-4 flex justify-start items-center gap-4 overflow-x-auto rounded-b-lg">
              {#each imagesData as image, index}
                <div
                  on:click={() => selectImage(index)}
                  class="w-20 h-20 md:w-24 md:h-24 flex-shrink-0 flex justify-center items-center rounded-md overflow-hidden border-2 border-gray-300 hover:border-blue-500 cursor-pointer"
                >
                  <img src={image.imgage} alt="Thumbnail" class="w-full h-full object-cover" />
                </div>
              {/each}
            </div>
          </div>
        </div>
        

        <!-- Info Container -->
        <div class="info-container relative h-full w-full md:w-[50vw] py-14 my-24 md:px-3 lg:px-7 xl:px-14 2xl:px-24 overflow-y-scroll ">
          <div class="w-full h-full flex flex-col gap-y-10">
             <!--heading-->
            <div class="heading border-2 shadow-xl px-5 py-3 flex justify-center gap-2 flex-col">
              {#each bookingsData as booking }
              <h1 class="text-2xl font-semibold text-wrap">{booking.title}</h1>
              <h3 class="text-base">{booking.description}</h3>
              {/each}
             
            </div>

          <!--Details-->
            <div class="details border-2 shadow-xl px-5 py-3  flex justify-center gap-2 flex-col">
              <div class="flex justify-between text-2xl font-bold">
              <h1>Booking Plan</h1>
              {#each bookingsData as booking }
              <h2>₹ {booking.price}</h2>
              {/each}
              </div>
              <hr>
              <form class="flex flex-col justify-center  mt-3 gap-3">  
                <div class="flex justify-center items-center gap-5">
                  <i class="fa-solid fa-user text-2xl"></i>
                  <input
                  type="text"
                  id="name"
                  placeholder="Enter Your Full Name"
                  class="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  required
                  />
                </div>

                <div class="flex justify-center items-center gap-5">
                  <i class="fa-solid fa-location-dot text-2xl"></i>
                  <input
                  type="text"
                  id="location"
                  placeholder="Enter Address"
                  class="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  required
                  />
                </div> 
                
                <div class="flex justify-center items-center gap-5">
                  <i class="fa-solid fa-envelope text-2xl"></i>
                  <input
                  type="email"
                  id="eamil"
                  placeholder="Enter Email Address"
                  class="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  required
                  />
                </div> 

                <div class="flex justify-center items-center gap-5">
                  <i class="fa-solid fa-phone text-xl"></i>
                  <input
                  type="tel"
                  id="number"
                  placeholder="+91 "
                  class="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  required
                  />
                </div>
               
                <div class="flex justify-center items-center gap-5">
                  <i class="fa-solid fa-calendar-days text-2xl"></i>
                  <input
                  type="date"
                  id="number"
                  placeholder=""
                  class="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  required
                  />
                </div>
                <p class="text-sm text-gray-500 mx-10">Select any date for us to come and decorate your space.</p>
              </form>
              <div class="bg-blue-500 px-5 py-2 text-center my-3 rounded-md">
              <button class="text-white font-bold text-lg" on:click={toggleLoginPage}>Book Now</button>
              </div>
            </div>

          <!--Inclusion-->
            <div class="inclusions border-2 shadow-xl px-5 py-3  flex justify-center gap-2 flex-col">
              <h2 class="text-2xl font-bold">Inclusions</h2>
              <p>Below are the included details, please note that no additional items are provided.</p>
              <hr>
              <ul class="mt-3">
                {#each inclusionsData as inclu}
                <li class="flex gap-5">
                  <i class="fa-duotone fa-solid fa-check text-green-600 font-extrabold text-xl"></i>
                  <p>{inclu.inclusion_desc}</p>
                </li>
                {/each}
              </ul>             
            </div>

             <!-- customization -->
             <div class="customization border-2 shadow-xl px-5 py-3  flex justify-center gap-2 flex-col">
              <h2 class="text-2xl font-bold">Customization</h2>
              <hr>
              <h2 class="text-2xl font-bold text-right">₹ {custom_item_price}</h2>
              <div class="custom-item mt-4 grid sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3">
                {#each customization as custom,index}
                  <div class="h-auto border-2 p-1 rounded-sm ">
                  <img src={custom.img} alt={custom.title} class="w-full sm:h-[20vh] lg:h-[12vh] object-cover">
                  <div class="details flex justify-center items-start flex-col gap-2 px-2 mt-2">
                    <h4 class="text-lg font-semibold">{custom.title}</h4>
                    <p class="text-sm h-16 overflow-y-scroll">{custom.desc}</p>
                    <p class="text-base font-bold">₹ {custom.price}</p>
                    <div class="flex justify-start items-center gap-3 my-2">
                      <button on:click={() => lessItem(index)} class="fa-solid fa-minus shadow-md active:shadow-inner bg-red-500 text-white p-2 rounded-md"></button>
                      <input type="text" id="quantity" value={quantity[index]} class=" block w-1/4 text-center border border-gray-300 rounded-md p-1" />
                      <button on:click={() => addItem(index)} class="fa-solid fa-plus shadow-md  active:shadow-inner bg-green-500 text-white p-2 rounded-md"></button>
                    </div>
                  </div>
                </div>
                {/each}
              </div>
              <!-- custom-item end  -->
            </div>

             <!-- pricing -->
             <div class="details border-2 shadow-xl px-5 py-3  flex justify-center gap-2  flex-col">
              <div class="flex justify-between font-bold text-2xl">
              <h2>Total Bill</h2>
              {#each bookingsData as booking }
              <h2>₹ {booking.price }</h2>
              {/each}
            </div>
              <hr>

              <div class="Payment text-sm text-slate-600 space-y-1">
                {#each bookingsData as booking }
                <h3>Actual Amount : ₹  {booking.price}</h3>
                <h3>Discount on plan : {booking.discount} %</h3>
                <h3>Discount price: ₹ {(booking.price * booking.discount) / 100}</h3>
                {/each}
                
                <h3>Add on Price: ₹ {custom_item_price}</h3>
                <hr>
                <h3 class="text-base text-slate-700 mt-2 font-semibold">Final Amount: ₹  {finalAmount + custom_item_price}</h3>
              </div>
            </div>

            <!-- contact -->
            <div class="details border-2 shadow-xl px-5 py-3  flex justify-center gap-2  flex-col">
              <h2 class="text-2xl font-bold">Contact</h2>
              <hr>

              <p class="flex flex-col gap-3 text-balance">If any queries, please contact</p>
               <a href="https://wa.me/9324847376" target="_blank" class="fa-solid fa-phone  flex gap-4"><p class="text-balance font-normal font-sans">91+ 9324847376</p></a>
             
              <a href="mailto:info@occasions.in" target="_blank" class="fa-solid fa-envelope  flex gap-4"><p class="text-balance font-normal font-sans">info@occasions.in</p></a>
            </div>

            <!-- Book -->
            <button class="details rounded-md shadow-xl px-5 py-3 text-white bg-blue-500 text-center font-semibold text-xl  flex justify-center gap-2  flex-col" on:click={toggleLoginPage}>
             Book Now
              
            </button>
            

          </div>
        </div>
      </div>

    </div>
  </div>
{/if}