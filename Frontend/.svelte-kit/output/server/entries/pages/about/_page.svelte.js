import { c as create_ssr_component, d as add_attribute, e as escape, v as validate_component, f as each } from "../../../chunks/ssr.js";
import { C as Category_2 } from "../../../chunks/category-2.js";
import { I as Info_container, F as Footer } from "../../../chunks/info-container.js";
import { N as Navbar } from "../../../chunks/navbar.js";
const Container = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { heading } = $$props;
  let { order } = $$props;
  if ($$props.heading === void 0 && $$bindings.heading && heading !== void 0) $$bindings.heading(heading);
  if ($$props.order === void 0 && $$bindings.order && order !== void 0) $$bindings.order(order);
  return `<div class="w-[90%] mx-auto flex justify-center flex-col lg:flex-row items-center gap-20 py-10 text-white overflow-hidden"><div${add_attribute("class", `detail flex flex-col gap-8 justify-center lg:w-1/2  order-${order}`, 0)}><h1 class="text-xl md:text-3xl font-bold">${escape(heading)}</h1> ${heading === "About Us" ? `<p class="text-lg md:text-2xl" data-svelte-h="svelte-1qqbo92">Occasion is your premier destination for all things wedding-related. We understand that your special day deserves nothing but the best, which is why we&#39;ve curated a comprehensive platform connecting couples with top-notch wedding vendors and stunning venues. Our mission is to simplify the wedding planning process, making it enjoyable and stress-free for couples across the country.</p>` : `${heading === "What We offer ?" ? `<p class="text-lg md:text-2xl" data-svelte-h="svelte-12uose6">At Occasion, we offer a wide range of services to make your wedding planning journey seamless. Our platform provides access to thousands of verified wedding vendors, from photographers and florists to caterers and entertainment. We also showcase an extensive collection of wedding venues to suit every style and budget. Additionally, our blog offers inspiration, tips, and expert advice to help you create the wedding of your dreams.</p>` : `${heading === "Who We Are ?" ? `<p class="text-lg md:text-2xl" data-svelte-h="svelte-n68anz">We are a passionate team of wedding enthusiasts and tech experts dedicated to revolutionizing the wedding industry. With years of experience and a deep understanding of couples&#39; needs, we&#39;ve built a platform that combines innovation with tradition. Our goal is to empower couples to plan their perfect day while supporting local businesses and creative professionals in the wedding industry.</p>` : ``}`}`}</div> <div class="img rounded-xl overflow-hidden border-2 " data-svelte-h="svelte-1qk50nu"><img src="https://www.related.com/sites/default/files/styles/4x3_horizontal_rectangle_w/public/2024-08/acquiadam-assets/related-corporate-our-company-landscape-img_4238.jpg?itok=WkYininz" alt="" class="object-cover md:h-[25rem]"></div></div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const completeEvents = [
    {
      id: 1,
      total: 1e4,
      event: "Wedding Vendors"
    },
    {
      id: 2,
      total: 2e4,
      event: "Annual Weddings"
    },
    {
      id: 3,
      total: 30800,
      event: "Wedding Venues"
    },
    {
      id: 4,
      total: 15e5,
      event: "Monthly Followers"
    }
  ];
  const formatNumber = (value) => {
    if (value >= 1e9) {
      return `${(value / 1e9).toFixed(1)}B`;
    } else if (value >= 1e6) {
      return `${(value / 1e6).toFixed(1)}M`;
    } else if (value >= 1e4) {
      return `${(value / 1e3).toFixed(1)}K`;
    } else {
      return value.toString();
    }
  };
  return `${validate_component(Navbar, "Navbar").$$render($$result, {}, {}, {})} <div class="about">${validate_component(Category_2, "Category_2").$$render($$result, { title: "We Are Occasion" }, {}, {})} ${validate_component(Container, "Container").$$render($$result, { heading: "About Us", order: "0" }, {}, {})} <div class="py-10"><div class="people text-white mx-auto px-10 text-base bg-[#50808e] grid grid-cols-2 place-items-center md:flex md:justify-center md:items-center gap-y-10 gap-x-14 md:gap-20 py-5">${each(completeEvents, (events) => {
    return `<div><h1 class="text-xl md:text-2xl lg:text-3xl font-extrabold">${escape(formatNumber(events.total))}</h1> <span class="font-semibold md:text-lg lg:text-xl">${escape(events.event)}</span> </div>`;
  })}</div></div> ${validate_component(Container, "Container").$$render($$result, { heading: "What We offer ?", order: "1" }, {}, {})} <div class="w-[80%] mx-auto">${validate_component(Info_container, "InfoContainer").$$render($$result, {}, {}, {})}</div> ${validate_component(Container, "Container").$$render($$result, { heading: "Who We Are ?", order: "2" }, {}, {})} ${validate_component(Footer, "Footer").$$render($$result, {}, {}, {})} </div>`;
});
export {
  Page as default
};
