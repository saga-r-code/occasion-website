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
  ];

  const inclusions = [
    {
      id: 1,
      inclusion: "Arch of 150 Balloons in  Pastel Pink, Pastel Green and Purple colors"
    },
    {
      id: 2,
      inclusion: "8 Mermaid Theme Paper Cutouts"
    },
    {
      id: 3,
      inclusion: "4 Balloon Pillars (16 Theme Balloons in each Pillars)"
    },
    {
      id: 4,
      inclusion: "6 Mermaid Themed Foil Balloons (1 Mermaid Tail Foil Balloon, 2 Sea Shells Foil Balloons, 1 Mermaid Foil Balloon and 2 Pink Stars Foil Balloons)"
    },
    {
      id: 5,
      inclusion: "Arch of 150 Balloons in  Pastel Pink, Pastel Green and Purple colors"
    },
    {
      id: 6,
      inclusion: "8 BT Balloons"
    },
  ]

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


  let interval;
  let currentIndex = 0
  let val = 0
  let custom_item_price = 0
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
  

  // onMount(() => {
  //   interval = setInterval(() => {
  //     currentIndex = (currentIndex + 1) % images.length;
  //   }, 3000); // change image every 3 seconds
  // });

  // function previousImage() {
  //   currentIndex = (currentIndex - 1 + images.length) % images.length;
  // }

  // function nextImage() {
  //   currentIndex = (currentIndex + 1) % images.length;
  // }

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

</script>

<LoginPage {open} {toggleLoginPage}/>
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
        <div class="img-container h-full w-full md:w-[50vw] py-14 md:px-3 lg:px-7 xl:px-14 2xl:px-24 ">
          <div class="w-full h-full relative bg-red- shadow-xl rounded-md overflow-hidden  border-2 flex justify-center items-center flex-col">

            <!-- pagination -->
             <!--  on:click={previousImage} -->
               <!-- on:click={nextImage} -->
			<div class="pagination">
				<button
       
					class="flex bg-white w-10 h-10 md:w-[50px] md:h-[50px] rounded-full text-center absolute z-10 top-[45%] md:top-[40%] left-3 justify-center items-center"
				>
					<i class="fa-solid fa-angles-left"></i>
				</button>

				<button
        
					class="flex bg-white w-10 h-10 md:w-[50px] md:h-[50px] rounded-full text-center absolute z-10 top-[45%] md:top-[40%] right-3 justify-center items-center"
				>
					<i class="fa-solid fa-angles-right"></i>
				</button>
			</div>

      <img src={img1} alt={'image'} class="w-full h-full object-cover" />
      <!-- <div class="w-full h-full flex justify-center items-center overflow-x-auto">
        {#each images as image, index}
          <div
            class={`w-full h-full overflow-hidden flex justify-center items-center ${
              index === currentIndex ? 'active' : ''
            }`}
          >
            <img src={image.img} alt={'image'} class="w-full h-full object-cover" />
          </div>
        {/each}
      </div> -->

           <div class="w-full h-[20vh] flex py-4 px-3 justify-center items-center gap-10 overflow-x-auto ">
            {#each images as image}
            <div class="w-24 h-24 overflow-hidden flex justify-center items-center">
                <img
                    src={image.img}
                    alt={'image'}
                    class="w-full h-full object-cover"
                />
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
              <h1 class="text-2xl font-semibold text-wrap">Dinosaur Happy Birthday Theme Decor</h1>
              <h3 class="text-base">Make your child's birthday one to remember with our exclusive dinosaur- theme birthday décor</h3>
            </div>

          <!--Details-->
            <div class="details border-2 shadow-xl px-5 py-3  flex justify-center gap-2 flex-col">
              <h2 class="text-2xl font-bold text-right">₹ 4999</h2>
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
                  type="number"
                  id="pincode"
                  placeholder="Enter Pincdoe"
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
                {#each inclusions as inclu}
                <li class="flex gap-5">
                  <i class="fa-duotone fa-solid fa-check text-green-600 font-extrabold text-xl"></i>
                  <p>{inclu.inclusion}</p>
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
                      <button on:click={() => lessItem(index)} class="fa-solid fa-minus bg-red-500 text-white p-2 rounded-md"></button>
                      <input type="text" id="quantity" value={quantity[index]} class=" block w-1/4 text-center border border-gray-300 rounded-md p-1" />
                      <button on:click={() => addItem(index)} class="fa-solid fa-plus bg-green-500 text-white p-2 rounded-md"></button>
                    </div>
                  </div>
                </div>
                {/each}
              </div>
              <!-- custom-item end  -->
            </div>

            <!-- pricing -->
            <div class="details border-2 shadow-xl px-5 py-3  flex justify-center gap-2  flex-col">
              <h2 class="text-2xl font-bold">Contact</h2>
              <hr>

              <p class="flex flex-col gap-3 text-balance">If any queries, please contact</p>
               <a href="https://api.whatsapp.com/send?phone=919820938124" target="_blank" class="fa-solid fa-phone  flex gap-4"><p class="text-balance font-normal font-sans">91+ 9820938124</p></a>

             
              <a href="https://api.whatsapp.com/send?phone=919820938124" target="_blank" class="fa-solid fa-envelope  flex gap-4"><p class="text-balance font-normal font-sans">shah.sagar2006@gmail.com</p></a>
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