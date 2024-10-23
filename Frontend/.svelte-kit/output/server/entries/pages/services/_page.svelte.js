import { c as create_ssr_component, d as add_attribute, e as escape, f as each, v as validate_component } from "../../../chunks/ssr.js";
import { C as Category_1, H as Headline } from "../../../chunks/headline.js";
import { I as Info_container, F as Footer } from "../../../chunks/info-container.js";
import { N as Navbar } from "../../../chunks/navbar.js";
const Card = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { event } = $$props;
  if ($$props.event === void 0 && $$bindings.event && event !== void 0) $$bindings.event(event);
  return `<div class="venue-conatiner flex flex-col px-3 gap-5 justify-start items-start h-[22rem] w-[15rem] lg:w-[22rem] md:w-[18rem] md:h-[28rem]"><div class="img-container relative"><div class="venue-img relative overflow-hidden hover:scale-105 rounded-2xl h-[15rem] w-[15rem] md:w-[20rem] md:h-[20rem] lg:w-[22rem] flex justify-center items-center bg-red-200"><img${add_attribute("src", event.img, 0)}${add_attribute("alt", event.title, 0)} class="absolute top-0 left-0 w-full h-full object-cover"></div> <div class="px-4 py-2 bg-[#294b55] rounded-full absolute bottom-3 right-5" data-svelte-h="svelte-n9iu56"><span class="font-bold">Book Now</span></div></div> <div class="details text-lg md:text-xl"><h3>${escape(event.title)}<span class="font-bold"> ${escape(event.city)}</span></h3> <ul class="flex gap-1">${each(Array(event.ratting), (_) => {
    return `<li data-svelte-h="svelte-n4nlwj">★</li>`;
  })} <span class="ml-5 text-slate-400">${escape(event.ratting)} (22)</span></ul></div></div> `;
});
const Service1 = "/_app/immutable/assets/service-2.Oav5IqQx.jpeg";
const Service2 = "/_app/immutable/assets/service-3.BVtWuHtP.webp";
const Decoration1 = "/_app/immutable/assets/decoration-1.BKY9eRRS.jpeg";
const Decoration2 = "/_app/immutable/assets/decoration-2.cB6xdn_W.jpeg";
const Decoration3 = "/_app/immutable/assets/decoration-3.CgijGRJL.jpeg";
const Decoration4 = "/_app/immutable/assets/decoration-4.D0RQPM1S.jpeg";
const Decoration5 = "/_app/immutable/assets/decoration-5.BzblgThl.jpeg";
const Decoration6 = "/_app/immutable/assets/decoration-6.CA97Je-x.jpeg";
const Venue1 = "/_app/immutable/assets/venue-1.CpGd5aIJ.jpeg";
const Venue2 = "/_app/immutable/assets/venue-2.DTQMxQkz.jpeg";
const Venue3 = "/_app/immutable/assets/venue-3.Dx9INr03.webp";
const Venue4 = "/_app/immutable/assets/venue-4.CrW6IG-4.jpeg";
const Venue5 = "/_app/immutable/assets/venue-5.DuX3fksh.jpeg";
const Venue6 = "/_app/immutable/assets/venue-6.JLgFWfgx.jpeg";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const supplier = [
    { id: 1, img: Service1, name: "Decorator" },
    {
      id: 2,
      img: Service2,
      name: "Venue Planner"
    }
  ];
  const decorator = [
    {
      id: 1,
      img: Decoration1,
      title: "Luxurious Lantern Getaway",
      city: "Kalyan",
      ratting: 5
    },
    {
      id: 2,
      img: Decoration2,
      title: "Romantic Travel Wedding Experience",
      city: "Dombivali",
      ratting: 4
    },
    {
      id: 3,
      img: Decoration3,
      title: "Lavish Floral Arrangements",
      city: "Kalyan",
      ratting: 3
    },
    {
      id: 4,
      img: Decoration4,
      title: "Elegant Table Settings",
      city: "Dombivali",
      ratting: 3
    },
    {
      id: 5,
      img: Decoration5,
      title: "Serene Honeymoon Destinations",
      city: "Kalyan",
      ratting: 3
    },
    {
      id: 6,
      img: Decoration6,
      title: "Themed Event Decorations",
      city: "Dombivali",
      ratting: 3
    }
  ];
  const venues = [
    {
      id: 1,
      img: Venue1,
      title: "Elegant Garden Wedding",
      city: "Kalyan",
      ratting: 5
    },
    {
      id: 2,
      img: Venue2,
      title: "Luxurious Banquet Hall",
      city: "Dombiavli",
      ratting: 4
    },
    {
      id: 3,
      img: Venue3,
      title: "Charming Beachside Venue",
      city: "Kalyan",
      ratting: 3
    },
    {
      id: 4,
      img: Venue4,
      title: "Rustic Farmhouse Celebration",
      city: "Dombiavli",
      ratting: 3
    },
    {
      id: 5,
      img: Venue5,
      title: "Birthday Celebration Theme ",
      city: "Kalyan",
      ratting: 3
    },
    {
      id: 6,
      img: Venue6,
      title: "Creative vending Machine",
      city: "Kalyan",
      ratting: 3
    }
  ];
  return `${validate_component(Navbar, "Navbar").$$render($$result, {}, {}, {})} <div class="services">${validate_component(Category_1, "Category_1").$$render($$result, { title: "Occasion Services " }, {}, {})} <div class="services-container w-[80%] mx-auto text-white"><div class="category py-10"><h1 class="text-3xl font-semibold" data-svelte-h="svelte-9krf5h">Services Category</h1> <div class="services-list flex gap-y-10 py-10 flex-wrap">${each(supplier, (list) => {
    return `<div class="flex gap-5 items-center w-[15rem] flex-col"><div class="w-32 h-32 relative overflow-hidden rounded-full border-2 border-white flex justify-center items-center"><img${add_attribute("src", list.img, 0)}${add_attribute("alt", list.name, 0)} class="absolute top-0 left-0 w-full h-full object-cover"></div> <h2 class="font-medium text-xl text-center">${escape(list.name)}</h2> </div>`;
  })}</div></div>  <div class="cards py-10 relative">${validate_component(Headline, "Headline").$$render($$result, { headline: "Event Decoration", no: "20" }, {}, {})}  <div class="pagination" data-svelte-h="svelte-m5dh9c"><button${add_attribute("class", `flex absolute z-10 top-[40%] -left-5 justify-center items-center`, 0)}><i class="fa-solid fa-angles-left"></i></button> <button${add_attribute("class", `flex absolute z-10 top-[40%] -right-5  justify-center items-center`, 0)}><i class="fa-solid fa-angles-right"></i></button></div> <div class="venue-list flex overflow-x-auto gap-y-5 py-10 gap-x-10 md:gap-x-20">${each(decorator, (event) => {
    return `${validate_component(Card, "Card").$$render($$result, { event }, {}, {})}`;
  })}</div></div> <div class="cards py-10 relative">${validate_component(Headline, "Headline").$$render($$result, { headline: "Ultimate Venues", no: "20" }, {}, {})}  <div class="pagination" data-svelte-h="svelte-m5dh9c"><button${add_attribute("class", `flex absolute z-10 top-[40%] -left-5 justify-center items-center`, 0)}><i class="fa-solid fa-angles-left"></i></button> <button${add_attribute("class", `flex absolute z-10 top-[40%] -right-5  justify-center items-center`, 0)}><i class="fa-solid fa-angles-right"></i></button></div> <div class="venue-list flex overflow-x-auto gap-y-5 py-10 gap-x-10 md:gap-x-20">${each(venues, (event) => {
    return `${validate_component(Card, "Card").$$render($$result, { event }, {}, {})}`;
  })}</div></div> ${validate_component(Info_container, "InfoContainer").$$render($$result, {}, {}, {})}</div> ${validate_component(Footer, "Footer").$$render($$result, {}, {}, {})}</div>`;
});
export {
  Page as default
};
