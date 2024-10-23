import { c as create_ssr_component, v as validate_component, f as each, d as add_attribute, e as escape } from "../../../chunks/ssr.js";
import { C as Category_1, H as Headline } from "../../../chunks/headline.js";
import { I as Info_container, F as Footer } from "../../../chunks/info-container.js";
import { N as Navbar } from "../../../chunks/navbar.js";
import { v as venueimg1, c as venueimg9, o as outdoorimg1, a as outdoorimg2, b as outdoorimg3, d as outdoorimg5 } from "../../../chunks/lanterns-1.js";
const venueimg2 = "/_app/immutable/assets/wedding-5.CsUwKCSJ.jpg";
const venueimg3 = "/_app/immutable/assets/lantern-4.De4Hu_xn.jpg";
const venueimg4 = "/_app/immutable/assets/mehndi.D0Rxh9nO.jpg";
const venueimg5 = "/_app/immutable/assets/wedding-7.wel-169a.jpg";
const venueimg6 = "/_app/immutable/assets/chairs-2.BRPV1kZS.jpg";
const venueimg7 = "/_app/immutable/assets/wedding-8.ll2ddOVW.jpg";
const venueimg8 = "/_app/immutable/assets/wedding-4.DTuiGkiV.jpg";
const venueimg10 = "/_app/immutable/assets/flower._Nf3V2MN.jpg";
const venueimg11 = "/_app/immutable/assets/lantern-3.B9laYJJu.jpg";
const venueimg12 = "/_app/immutable/assets/babyshowe-2.DlfgaR4m.jpg";
const outdoorimg4 = "/_app/immutable/assets/chairs.-ouV-9vz.jpg";
const outdoorimg6 = "/_app/immutable/assets/wedding-6.CeahbQtf.jpg";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const weddingVenue = [
    {
      id: 1,
      img: venueimg1,
      title: "Serene Beachfront Wedding",
      city: "Kalyan",
      ratting: 5,
      price: 4e4
    },
    {
      id: 2,
      img: venueimg2,
      title: "Charming Rustic Countryside Wedding",
      city: "Dombivli",
      ratting: 4,
      price: 35e3
    },
    {
      id: 3,
      img: venueimg3,
      title: "Majestic Castle Wedding",
      city: "Kalyan",
      ratting: 3,
      price: 45e3
    },
    {
      id: 4,
      img: venueimg4,
      title: "Enchanting Garden Wedding",
      city: "Dombivli",
      ratting: 3,
      price: 1e4
    },
    {
      id: 5,
      img: venueimg5,
      title: "Banquet Hall Wedding",
      city: "Kalyan",
      ratting: 3,
      price: 1e4
    },
    {
      id: 6,
      img: venueimg6,
      title: "Cozy Rooftop Wedding",
      city: "Dombivli",
      ratting: 3,
      price: 10440
    },
    {
      id: 7,
      img: venueimg7,
      title: "Elegant Hotel Wedding",
      city: "Kalyan",
      ratting: 3,
      price: 4e4
    },
    {
      id: 8,
      img: venueimg8,
      title: "Trendy Urban Wedding",
      city: "Dombivli",
      ratting: 3,
      price: 3e4
    },
    {
      id: 9,
      img: venueimg9,
      title: "Charming Cabin Wedding",
      city: "Kalyan",
      ratting: 3,
      price: 1e4
    },
    {
      id: 10,
      img: venueimg10,
      title: "Stylish Vineyard Wedding",
      city: "Dombivli",
      ratting: 3,
      price: 2e4
    },
    {
      id: 11,
      img: venueimg11,
      title: "Starlit Beachfront Wedding",
      city: "Kalyan",
      ratting: 3,
      price: 2e4
    },
    {
      id: 12,
      img: venueimg12,
      title: "Romantic Starlit  Wedding",
      city: "Kalyan",
      ratting: 3,
      price: 2e4
    }
  ];
  const outdoorvenue = [
    {
      id: 1,
      img: outdoorimg1,
      title: "Rustic Countryside Wedding",
      city: "Dombivli",
      ratting: 4,
      price: 35e3
    },
    {
      id: 2,
      img: outdoorimg2,
      title: "Elegant Flower Decoration",
      city: "Kalyan",
      ratting: 3,
      price: 45e3
    },
    {
      id: 3,
      img: outdoorimg3,
      title: "Charming Garden Wedding",
      city: "Dombivli",
      ratting: 3,
      price: 1e4
    },
    {
      id: 4,
      img: outdoorimg4,
      title: "Outdoor Wedding Decoration",
      city: "Kalyan",
      ratting: 3,
      price: 1e4
    },
    {
      id: 5,
      img: outdoorimg5,
      title: "Traditional Temple Wedding",
      city: "Kalyan",
      ratting: 3,
      price: 4e4
    },
    {
      id: 6,
      img: outdoorimg6,
      title: "Flower  Petal Wedding",
      city: "Kalyan",
      ratting: 5,
      price: 4e4
    }
  ];
  return `${validate_component(Navbar, "Navbar").$$render($$result, {}, {}, {})} <div class="venue overflow-hidden">${validate_component(Category_1, "Category_1").$$render($$result, { title: "Our Occasion Venues" }, {}, {})} <div class="wedding-list w-[90%] mx-auto py-5"><div class="dropdown-btn flex flex-wrap justify-center items-center gap-10 p-10 text-lg lg:text-xl"><select name="guest" id="guest" class="rounded-lg bg-white bg-opacity-30 backdrop-blur-md border text-white py-3 lg:py-4 xl:py-5 w-56 pl-3 md:pl-4 lg:pl-5"><option value="" selected disabled data-svelte-h="svelte-wudx52">No. Of Guests</option><option value="guest 1" data-svelte-h="svelte-guvohs">1</option><option value="guest 2" data-svelte-h="svelte-1wtjc2">2</option><option value="guest 3" data-svelte-h="svelte-1xh8i58">3</option><option value="guest 4" data-svelte-h="svelte-r4mpgi">4</option></select> <select name="type" id="type" class="rounded-lg bg-white bg-opacity-30 backdrop-blur-md border text-white py-3 lg:py-4 xl:py-5 w-56 pl-3 md:pl-4 lg:pl-5"><option value="" selected disabled data-svelte-h="svelte-1qifmsi">Venue Type</option><option value="type 1" data-svelte-h="svelte-1t47qoa">type 1</option><option value="type 2" data-svelte-h="svelte-hpmyfi">type 2</option><option value="type 3" data-svelte-h="svelte-b1fd8q">type 3</option><option value="type 4" data-svelte-h="svelte-1yulo3y">type 4</option></select> <select name="space" id="space" class="rounded-lg bg-white bg-opacity-30 backdrop-blur-md border text-white py-3 lg:py-4 xl:py-5 w-56 pl-3 md:pl-4 lg:pl-5"><option value="" selected disabled data-svelte-h="svelte-73zbu4">Space Preference</option><option value="space 1" data-svelte-h="svelte-1ylkb9">Space Preference 1</option><option value="space 2" data-svelte-h="svelte-11x6sah">Space Preference 2</option><option value="space 3" data-svelte-h="svelte-1yek9qp">Space Preference 3</option><option value="space 4" data-svelte-h="svelte-ur5yd1">Space Preference 4</option></select> <select name="rating" id="rating" class="rounded-lg bg-white bg-opacity-30 backdrop-blur-md border text-white py-3 lg:py-4 xl:py-5 w-56 pl-3 md:pl-4 lg:pl-5"><option value="0" selected disabled data-svelte-h="svelte-10j5rts">Rating</option><option value="rating 1" data-svelte-h="svelte-cq3wld">1</option><option value="rating 2" data-svelte-h="svelte-k0r6gz">2</option><option value="rating 3" data-svelte-h="svelte-7ker5p">3</option><option value="rating 4" data-svelte-h="svelte-1umqj7n">4</option></select> <div class="search bg-[#50808E] font-bold text-center py-3 lg:py-4 xl:py-5 px-10 md:px-14 lg:px-16 xl:px-20 text-white rounded-xl" data-svelte-h="svelte-7ms95b">Search</div></div> <div class="wedding-venues py-10 text-white">${validate_component(Headline, "Headline").$$render(
    $$result,
    {
      headline: "Ceremony Decorations",
      no: "22"
    },
    {},
    {}
  )}  <div class="venue-list flex flex-wrap items-center justify-center sm:justify-start gap-y-10 md:gap-y-14 py-10 gap-x-10 md:gap-x-20">${each(weddingVenue, (venues) => {
    return `<div class="venue-conatiner flex flex-col px-3 gap-5 justify-start items-start h-[25rem] w-[15rem] lg:w-[22rem] md:w-[18rem] md:h-[30rem]"><div class="img-container relative"><div class="venue-img relative hover:scale-105 overflow-hidden rounded-2xl h-[15rem] w-[15rem] md:w-[20rem] md:h-[20rem] lg:w-[22rem] flex justify-center items-center bg-red-200"><img${add_attribute("src", venues.img, 0)}${add_attribute("alt", venues.title, 0)} class="absolute top-0 left-0 w-full h-full object-cover"></div> <div class="px-4 py-2 bg-[#294b55] rounded-full absolute bottom-3 right-5" data-svelte-h="svelte-1d6kav8"><span class="font-bold">Book Now</span> </div></div> <div class="details text-lg md:text-xl flex flex-col gap-2"><h3>${escape(venues.title)}<span class="font-bold">   ${escape(venues.city)}</span></h3> <ul class="flex gap-1">${each(Array(venues.ratting), (_) => {
      return `<li data-svelte-h="svelte-n4nlwj">★</li>`;
    })} <span class="ml-5 text-slate-400">${escape(venues.ratting)} (22)</span></ul> <button class="py-2 w-[7rem] rounded-full bg-[#50808e]">₹ ${escape(venues.price)}</button></div> </div>`;
  })}</div> </div> <div class="outdoor-venu py-10 relative text-white">${validate_component(Headline, "Headline").$$render($$result, { headline: "Outdoor Decoration", no: "20" }, {}, {})}  <div class="pagination" data-svelte-h="svelte-1daj5z0"><button${add_attribute("class", `flex absolute z-10 top-[35%] -left-5 justify-center items-center`, 0)}><i class="fa-solid fa-angles-left"></i></button> <button${add_attribute("class", `flex absolute z-10 top-[35%] -right-5  justify-center items-center`, 0)}><i class="fa-solid fa-angles-right"></i></button></div>  <div class="venue-list flex py-10 gap-x-3 md:gap-x-10 overflow-x-auto">${each(outdoorvenue, (venues) => {
    return `<div class="venue-card flex flex-col px-3 gap-5 justify-start items-start h-[25rem] w-[15rem] md:w-[22rem] md:h-[30rem]"> <div class="img-container relative"><div class="venue-img hover:scale-105 h-[15rem] w-[15rem] md:w-[22rem] md:h-[20rem] flex justify-center items-center"><img${add_attribute("src", venues.img, 0)}${add_attribute("alt", venues.title, 0)} class="absolute top-0 rounded-2xl left-0 w-full h-full object-cover"></div> <div class="px-4 py-1 bg-[#294b55] rounded-full absolute bottom-3 right-5" data-svelte-h="svelte-xhppah"><span class="font-bold italic">Explore</span> </div></div> <div class="details text-lg md:text-xl flex flex-col gap-2"><h3>${escape(venues.title)}<span class="font-bold">   ${escape(venues.city)}</span></h3> <ul class="flex gap-1">${each(Array(venues.ratting), (_) => {
      return `<li data-svelte-h="svelte-n4nlwj">★</li>`;
    })} <span class="ml-5 text-slate-400">${escape(venues.ratting)} (22)</span></ul> <button class="py-2 w-[7rem] rounded-full bg-[#50808e]">₹ ${escape(venues.price)}</button></div> </div>`;
  })}</div></div>  ${validate_component(Info_container, "InfoContainer").$$render($$result, {}, {}, {})}</div> ${validate_component(Footer, "Footer").$$render($$result, {}, {}, {})}</div>`;
});
export {
  Page as default
};
