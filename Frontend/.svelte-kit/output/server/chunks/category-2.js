import { c as create_ssr_component, d as add_attribute, e as escape } from "./ssr.js";
const video = "/_app/immutable/assets/container-2.DUvT9-iA.mp4";
const Category_2 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title } = $$props;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0) $$bindings.title(title);
  return `<div class="category flex justify-center items-center flex-col gap-16 h-[25rem] relative bg-[#f4f4f4]"><video class="absolute top-0 left-0 w-full h-full object-cover" autoplay muted loop data-svelte-h="svelte-7qtxyf"><source${add_attribute("src", video, 0)} type="video/mp4"></video> <div class="text-5xl z-10 text-white flex justify-center items-center flex-col gap-3"><h1 class="font-bold mb-10">${escape(title)}</h1> <p class="w-1/" data-svelte-h="svelte-1tsoba5">We bring</p> <span class="font-bold" data-svelte-h="svelte-v4rw5i">dream Weddings</span> <p data-svelte-h="svelte-g20mcx">to life</p></div></div>`;
});
export {
  Category_2 as C
};
