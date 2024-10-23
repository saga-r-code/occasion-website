import { c as create_ssr_component, v as validate_component, f as each, d as add_attribute, e as escape } from "../../../chunks/ssr.js";
import { C as Category_1, H as Headline } from "../../../chunks/headline.js";
import { I as Info_container, F as Footer } from "../../../chunks/info-container.js";
import { v as venueimg1, o as outdoorimg1, a as outdoorimg2, b as outdoorimg3, c as venueimg9, d as outdoorimg5 } from "../../../chunks/lanterns-1.js";
const categoryimg1 = "/_app/immutable/assets/birthday-2.DMt-aB4j.avif";
const categoryimg2 = "/_app/immutable/assets/haldi-1.CHVuQpQX.jpg";
const categoryimg3 = "/_app/immutable/assets/wedding-2.gTtTm2S3.jpg";
const decoimg1 = "/_app/immutable/assets/birthday-1.D8c1BPau.jpg";
const categoryimg5 = "/_app/immutable/assets/wedding-3.BW_q0n5K.jpg";
const decoimg3 = "/_app/immutable/assets/haldi-2.bL2c921E.jpg";
const decoimg4 = "/_app/immutable/assets/babyshower.Cr-CPq5U.jpg";
const decoimg5 = "/_app/immutable/assets/party-1.BA6t6rIz.jpg";
const decoimg6 = "/_app/immutable/assets/anniversary.DjrzVX9s.jpg";
const review1 = "/_app/immutable/assets/profile.CJEu386R.jpg";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const cards = [
    {
      id: 1,
      img: categoryimg1,
      title: "Birthday Party"
    },
    {
      id: 2,
      img: categoryimg2,
      title: "Haldi Decoration "
    },
    {
      id: 3,
      img: categoryimg3,
      title: "Wedding Decoration"
    },
    {
      id: 4,
      img: decoimg1,
      title: "Birthday Decoration "
    },
    {
      id: 5,
      img: categoryimg5,
      title: "Wedding Events "
    }
  ];
  const venueCards = [
    {
      id: 1,
      img: venueimg1,
      title: "Wedding Decoration",
      country: "Bharat"
    },
    {
      id: 2,
      img: outdoorimg1,
      title: "Engagement Decoration ",
      country: "Bharat"
    },
    {
      id: 3,
      img: outdoorimg2,
      title: "Outdoor Decoration ",
      country: "Bharat"
    },
    {
      id: 4,
      img: outdoorimg3,
      title: "Outside Event ",
      country: "Bharat"
    },
    {
      id: 5,
      img: venueimg9,
      title: "Welecome Decoration",
      country: "Bharat"
    }
  ];
  const decorationCard = [
    {
      id: 1,
      img: decoimg1,
      title: "Birthday Celebartion"
    },
    {
      id: 2,
      img: venueimg1,
      title: "Wedding Decoration"
    },
    {
      id: 3,
      img: decoimg3,
      title: "Haldi Event"
    },
    {
      id: 4,
      img: decoimg4,
      title: "BabyShower Event"
    },
    {
      id: 5,
      img: decoimg5,
      title: "Celebration Party"
    },
    {
      id: 6,
      img: decoimg6,
      title: "Anniversary Decoration"
    },
    {
      id: 7,
      img: outdoorimg5,
      title: "Festival Theme"
    }
  ];
  let reviews = [
    {
      id: 1,
      img: review1,
      title: "Sagar Shah",
      description: "This product exceeded my expectations! The quality is top-notch, and it’s very user-friendly. Highly recommend it to anyone looking for something reliable."
    },
    {
      id: 2,
      img: review1,
      title: "Abdul Raheman",
      description: "I had a fantastic experience with this service. The customer support was prompt and helpful, making the entire process smooth and enjoyable."
    },
    {
      id: 3,
      img: review1,
      title: "Chota Biduuu",
      description: "I was a bit skeptical at first, but this turned out to be a great purchase. It works exactly as advertised, and I am very satisfied with my decision."
    },
    {
      id: 3,
      img: review1,
      title: "Chota Biduuu",
      description: "I was a bit skeptical at first, but this turned out to be a great purchase. It works exactly as advertised, and I am very satisfied with my decision."
    }
  ];
  return `<div class="Home">${validate_component(Category_1, "Category_1").$$render($$result, { title: "Your Occasion, Your Way" }, {}, {})} <div class="some-list w-[80%] mx-auto text-white"><div class="browse-category py-10 relative">${validate_component(Headline, "Headline").$$render($$result, { headline: "Browse by Category", no: "20" }, {}, {})}  <div class="pagination" data-svelte-h="svelte-7meb9a"><button class="flex absolute z-10 top-[40%] -left-5 justify-center items-center"><i class="fa-solid fa-angles-left"></i></button> <button class="flex absolute z-10 top-[40%] -right-5 justify-center items-center"><i class="fa-solid fa-angles-right"></i></button></div>  <div class="category-list flex overflow-x-auto py-10 gap-x-3 md:gap-x-10">${each(cards, (c) => {
    return `<div class="category-card flex px-3 flex-col gap-5 justify-start items-start md:w-[22rem] w-[15rem] h-[20rem]"> <div class="category-img relative overflow-hidden h-[15rem] hover:scale-105 w-[15rem] md:w-[22rem] flex justify-center items-center rounded-2xl"><img${add_attribute("src", c.img, 0)}${add_attribute("alt", c.title, 0)} class="absolute top-0 left-0 w-full h-full object-cover"></div> <div><h3 class="font-bold text-lg md:text-xl">${escape(c.title)}</h3></div> </div>`;
  })}</div></div>  <div class="popular-venu py-10 relative">${validate_component(Headline, "Headline").$$render($$result, { headline: "Popular Venue", no: "20" }, {}, {})}  <div class="pagination" data-svelte-h="svelte-1fsy43o"><button${add_attribute("class", `flex absolute z-10 top-[45%] -left-5 justify-center items-center`, 0)}><i class="fa-solid fa-angles-left"></i></button> <button${add_attribute("class", `flex absolute z-10 top-[45%] -right-5  justify-center items-center`, 0)}><i class="fa-solid fa-angles-right"></i></button></div>  <div class="venue-list flex py-10 gap-x-3 md:gap-x-10 overflow-x-auto">${each(venueCards, (venue) => {
    return `<div class="venue-card flex flex-col px-3 gap-5 justify-start items-start h-[22rem] w-[15rem] md:w-[22rem] md:h-[25rem]"> <div class="img-container relative"><div class="venue-img hover:scale-105 h-[15rem] w-[15rem] md:w-[22rem] md:h-[20rem] flex justify-center items-center"><img${add_attribute("src", venue.img, 0)}${add_attribute("alt", venue.title, 0)} class="absolute top-0 rounded-2xl left-0 w-full h-full object-cover"></div> <div class="px-4 py-1 bg-[#294b55] rounded-full absolute bottom-3 right-5" data-svelte-h="svelte-xhppah"><span class="font-bold italic">Explore</span> </div></div> <div><h3 class="md:text-xl">${escape(venue.title)}</h3> <h2 class="font-bold text-lg md:text-xl">${escape(venue.country)}</h2></div> </div>`;
  })}</div></div>  ${validate_component(Info_container, "InfoContainer").$$render($$result, {}, {}, {})}  <div class="decoration py-10">${validate_component(Headline, "Headline").$$render(
    $$result,
    {
      headline: "Best Decoration And Event Plans",
      no: "20"
    },
    {},
    {}
  )} <div class="decoration-list flex py-10 gap-x-3 sm:gap-x-6 overflow-x-auto lg:overflow-hidden lg:flex-wrap lg:gap-9">${each(decorationCard, (deco) => {
    return `<div class="decoration-cards flex flex-col gap-5 justify-start items-start w-[15rem] h-auto md:w-[20rem] rounded-2xl"><div class="flex flex-col px-3 justify-center items-center"><div class="decoration-img relative hover:scale-105 h-[15rem] w-[15rem] md:w-[20rem] flex justify-center items-center rounded-2xl overflow-hidden"><img${add_attribute("src", deco.img, 0)}${add_attribute("alt", deco.title, 0)} class="absolute top-0 left-0 w-full h-full object-cover"></div> <h3 class="font-bold text-lg md:text-xl px-5 pt-3">${escape(deco.title)}</h3></div> </div>`;
  })}</div></div>  <div class="review-conatiner py-10 overflow-x-auto"><h1 class="text-3xl font-semibold mb-10" data-svelte-h="svelte-20h1hd">Reviews</h1> <div class="grid md:grid-cols-2 lg:flex lg:flex-wrap lg:justify-center lg:items-center gap-5 lg:gap-10 px-3">${each(reviews, (reviews2) => {
    return `<div class="reviews-box hover:scale-105 border-white border-2 bg-[#1c2541] lg:w-[40%] xl:w-1/5 rounded-2xl relative"><div class="detail-box py-5 px-3 flex flex-col justify-center items-center gap-5"><div class="w-16 h-16 rounded-full overflow-hidden"><img${add_attribute("src", reviews2.img, 0)}${add_attribute("alt", reviews2.title, 0)} class="w-full h-full object-cover"></div> <h2 class="font-bold text-xl">${escape(reviews2.title)}</h2> <p class="text-base w-11/12">${escape(reviews2.description)}</p></div> </div>`;
  })}</div> <div class="flex justify-center items-center gap-10 pt-10" data-svelte-h="svelte-1id3071"><button class="w-5 h-5 rounded-full bg-[#50808e] hover:bg-[#257d97]"></button> <button class="w-5 h-5 rounded-full bg-[#50808e] hover:bg-[#257d97]"></button> <button class="w-5 h-5 rounded-full bg-[#50808e] hover:bg-[#257d97]"></button></div></div> </div>  ${validate_component(Footer, "Footer").$$render($$result, {}, {}, {})}</div>`;
});
export {
  Page as default
};
