<!-- Script Section -->
<script>
  // Import Images
  import img1 from '../lib/Images/Engagement.jpg';
  import img2 from '../lib/Images/anniversary.jpg';
  import img3 from '../lib/Images/babyshower.jpg';
  import img4 from '../lib/Images/decoration-3.jpeg';
  import img5 from '../lib/Images/flower.jpg';

  // Define Images Array
  const images = [
    { id: 1, img: img1 },
    { id: 2, img: img2 },
    { id: 3, img: img3 },
    { id: 4, img: img4 },
    { id: 5, img: img5 },
  ];

  // Define Close Form Variable
  let closeForm = false;

  // Define Toggle Modal Function
  function togglemodal() {
    closeForm = !closeForm;
  }
</script>

<!-- Conditional Rendering -->
{#if !closeForm}
  <!-- Modal Container -->
  <div class="w-full h-[100vh] fixed top-0 bg-[rgba(0,0,0,0.7)] z-50 overflow-scroll overflow-x-hidden">
    <!-- Modal Content -->
    <div class="bg-white m-5 h-full relative overflow-y-scroll">
      <!-- Close Button -->
      <div class="">
        <button class="fa-solid fa-circle-xmark text-4xl absolute top-10 right-3 md:right-10" on:click={togglemodal}></button>
      </div>

      <!-- Modal Content -->
      <div class="flex justify-center mb-10 mt-10 lg:gap-10 items-center h-full flex-wrap md:flex-nowrap">
        <!-- Image Container -->
        <div class="img-container h-full w-full py-14 md:px-3 lg:px-7 xl:px-14 2xl:px-24 flex justify-center items-center">
          <div class="w-full h-full bg-red-300 flex justify-center items-center flex-col">
            <div class="w-full h-full bg-red-400"></div>
            <div class="w-full h-[25vh] bg-red-500 flex justify-center items-center gap-10 overflow-scroll">
                <div class="w-40 h-40 bg-red-100"></div>
                <div class="w-40 h-40 bg-red-100"></div>
                <div class="w-40 h-40 bg-red-100"></div>
                <div class="w-40 h-40 bg-red-100"></div>
            </div>
          </div>
        </div>

        <!-- Info Container -->
        <div class="info-container h-full w-full py-14 md:px-3 lg:px-7 xl:px-14 2xl:px-24 flex justify-center items-center">
          <div class="w-full h-full bg-red-300"></div>
        </div>
      </div>
    </div>
  </div>
{/if}