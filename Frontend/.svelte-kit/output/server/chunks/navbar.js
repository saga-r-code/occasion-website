import { c as create_ssr_component, e as escape } from "./ssr.js";
const Navbar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="bg-[#1c2541] text-white "><div class="w-[90%] m-auto "> <div class="navbar flex flex-wrap gap-4 justify-between items-center py-5"><a href="/" class="text-3xl md:text-4xl font-semibold" data-svelte-h="svelte-1anpy2g">Occasion</a>  <button class="${[
    "fa-solid text-white text-xl md:hidden cursor-pointer",
    "fa-bars "
  ].join(" ").trim()}"></button> <ul class="${[
    escape(`bg-[#1c2541] z-20 md:bg-transparent right-0 w-full   py-10 top-16 flex flex-col justify-center items-center list-none gap-10 md:w-fit md:py-0 md:gap-8 md:flex md:flex-row md:static md:text-lg`, true),
    " hidden"
  ].join(" ").trim()}" data-svelte-h="svelte-14nlkjo"><div class="md:hidden flex justify-center items-center gap-10 bg-[#50808e] px-3 rounded-md"><input type="text" name="search" id="search" placeholder="Search....." class="bg-transparent py-2 outline-none placeholder:text-white placeholder:font-semibold font-semibold text-white"> <i class="fa-solid fa-magnifying-glass text-white"></i></div> <li><a href="/">Home</a></li> <li><a href="/venue">Venue</a></li> <li><a href="/services">Services</a></li> <li><a href="/about">About</a></li> <li><a href="/contact">Contact Us</a></li> <div class="cursor-pointer hidden md:flex bg-[#50808e] rounded-full p-2 md:p-3 justify-center items-center"><i class="fa-solid fa-magnifying-glass text-white"></i></div></ul></div></div></div>`;
});
export {
  Navbar as N
};
