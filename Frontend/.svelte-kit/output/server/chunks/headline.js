import { c as create_ssr_component, d as add_attribute, e as escape, f as each } from "./ssr.js";
const video = "/_app/immutable/assets/container-bg.DtvGuf64.mp4";
const Category_1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title } = $$props;
  const category = [
    { id: 1, name: "Charity Events" },
    { id: 2, name: "Fashion Events" },
    { id: 3, name: "Festival" },
    { id: 4, name: "Wedding Events" },
    { id: 5, name: "Parties " },
    { id: 6, name: "Seminar" }
  ];
  const location = [
    { id: 1, name: "Kalyan" },
    { id: 2, name: "Dombivali" },
    { id: 3, name: "Thane" },
    { id: 4, name: "Ghatkopar" },
    { id: 5, name: "Mulund" },
    { id: 6, name: "Mumbai" }
  ];
  if ($$props.title === void 0 && $$bindings.title && title !== void 0) $$bindings.title(title);
  return `<div class="category text-white flex justify-start md:justify-end items-center flex-col gap-5 h-[25rem] p-8 bg-[#f4f4f4] relative overflow-hidden"><video class="absolute top-0 left-0 w-full h-full object-cover" autoplay muted loop data-svelte-h="svelte-7qtxyf"><source${add_attribute("src", video, 0)} type="video/mp4"></video> <div class="dropdown-btn z-10 flex flex-wrap md:flex-row justify-center items-center gap-10 md:p-10 pt-3 md:text-lg"><h1 class="text-3xl md:text-4xl xl:text-5xl w-[100vw] text-center font-medium">${escape(title)}</h1> <select name="category" id="category" class="rounded-lg bg-white bg-opacity-30 backdrop-blur-md border py-4 pr-28 2xl:pr-60 pl-5 xl"><option value="" disabled selected data-svelte-h="svelte-1s8gszj">Choose a category</option>${each(category, (cat) => {
    return `<option${add_attribute("value", cat.id, 0)}>${escape(cat.name)}</option>`;
  })}</select> <select name="location" id="location" class="rounded-lg bg-white bg-opacity-30 backdrop-blur-md border-2 py-4 pr-28 2xl:pr-60 pl-5 xl"><option value="" disabled selected data-svelte-h="svelte-61qizo">Choose a Location</option>${each(location, (loc) => {
    return `<option${add_attribute("value", loc.id, 0)}>${escape(loc.name)}</option>`;
  })}</select> <div class="search bg-[#50808e] font-bold text-xl text-center text-white rounded-lg py-3 px-28 2xl:px-40 cursor-pointer active:bg-gray-500 hover:bg-gray-700" data-svelte-h="svelte-khbrjv">Search</div></div></div>`;
});
const Headline = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { headline } = $$props;
  let { no } = $$props;
  if ($$props.headline === void 0 && $$bindings.headline && headline !== void 0) $$bindings.headline(headline);
  if ($$props.no === void 0 && $$bindings.no && no !== void 0) $$bindings.no(no);
  return `<div class="flex flex-col justify-between md:flex-row md:items-center"><h1 class="text-2xl font-semibold order-1 md:order-[0] md:text-3xl">${escape(headline)}</h1> <p class="text-sm md:text-base text-right">View All (${escape(no)})</p></div>`;
});
export {
  Category_1 as C,
  Headline as H
};
