import { c as create_ssr_component, v as validate_component } from "../../chunks/ssr.js";
import { N as Navbar } from "../../chunks/navbar.js";
import Page$1 from "./home/_page.svelte.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(Navbar, "Navbar").$$render($$result, {}, {}, {})} ${validate_component(Page$1, "Home").$$render($$result, {}, {}, {})}`;
});
export {
  Page as default
};
