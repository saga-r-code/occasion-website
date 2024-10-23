import { c as create_ssr_component, v as validate_component } from "../../../chunks/ssr.js";
import { C as Category_2 } from "../../../chunks/category-2.js";
import { I as Info_container, F as Footer } from "../../../chunks/info-container.js";
import { N as Navbar } from "../../../chunks/navbar.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(Navbar, "Navbar").$$render($$result, {}, {}, {})} <div class="contact">${validate_component(Category_2, "Category_2").$$render($$result, { title: "We Are Occasion" }, {}, {})} <div class="form-conatiner w-[80%] mx-auto py-10 text-white"><h1 class="font-bold text-3xl pb-10" data-svelte-h="svelte-jmaogp">Say Hello !</h1> <div class="form-details items-center justify-center flex 2xl:gap-56 gap-20 flex-wrap 2xl:flex-nowrap"><form class="flex flex-col gap-10" data-svelte-h="svelte-zu8wrg"><div class="flex justify-center flex-col gap-2"><label class="font-bold text-xl" for="name">Full Name:</label> <input type="text" class="name placeholder:font-bold placeholder:text-lg w-fit py-2 sm:py-3 md:py-4 px-5 sm:pr-32 md:pr-48 rounded-lg placeholder:text-slate-300 bg-opacity-30 backdrop-blur-md bg-white shadow-md" placeholder="Enter Name" required></div> <div class="flex justify-center flex-col gap-2"><label class="font-bold text-xl" for="no">Contact Number:</label> <input type="text" class="number placeholder:font-bold placeholder:text-lg w-fit py-2 sm:py-3 md:py-4 px-5 sm:pr-32 md:pr-48 rounded-lg placeholder:text-slate-300 bg-opacity-30 backdrop-blur-md bg-white shadow-md" placeholder="Enter Number" required></div> <div class="flex justify-center flex-col gap-2"><label class="font-bold text-xl" for="email">Email Address:</label> <input type="email" class="email placeholder:font-bold placeholder:text-lg w-fit py-2 sm:py-3 md:py-4 px-5 sm:pr-32 md:pr-48 rounded-lg placeholder:text-slate-300 bg-opacity-30 backdrop-blur-md bg-white shadow-md" placeholder="Enter Email" required></div> <div class="flex justify-center flex-col gap-2"><label class="font-bold text-xl" for="mess">Enter Address:</label> <textarea name="add" placeholder="Enter Your Address ..." rows="1" class="p-5 rounded-xl max-h-72 placeholder:font-bold placeholder:text-lg placeholder:text-slate-300 bg-opacity-30 backdrop-blur-md bg-white shadow-md"></textarea></div> <div class="flex justify-center flex-col gap-2"><label class="font-bold text-xl" for="mess">Message:</label> <textarea name="message" placeholder="Enter Your Message" class="p-5 rounded-xl max-h-72 min-h-44 placeholder:font-bold placeholder:text-lg placeholder:text-slate-300 bg-opacity-30 backdrop-blur-md bg-white shadow-md"></textarea></div> <button class="bg-[#50808E] hover:bg-[#284e59] hover:shadow-black shadow-inner text-white font-bold text-xl py-3 rounded-xl">Submit</button></form> <div class="details flex justify-center items-center flex-col gap-10 text-white" data-svelte-h="svelte-14es0np"><div class="flex flex-col gap-2"><h3 class="text-2xl font-bold">Vendor</h3> <p class="text-xl">If you are a registered vendor or a business looking to promote your brand on our
						portal, please send in your queries at
						<a href="/">vendors@comany.com</a></p></div> <div class="flex flex-col gap-2"><h3 class="text-2xl font-bold">Marketing Collaborations</h3> <p class="text-xl">For brand collaborations - sponsored content, social media activations etc., please
						write into
						<a href="/">partnerships@comany.com</a></p></div> <div class="flex flex-col gap-2"><h3 class="text-2xl font-bold">Wedding Submissions</h3> <p class="text-xl">Occasion features wedding across cultures, styles and budgets. To submit your wedding,
						kindly email us 15-20 photos at
						<a href="/">submissions@comany.com</a></p></div> <div class="flex flex-col gap-2"><h3 class="text-2xl font-bold">Careers</h3> <p class="text-xl">We are a team of passionate young minds looking to reinvent the wedding space. Please
						check our careers page for current openings and email us at
						<a href="/">hr@comany.com</a></p></div> <div class="flex flex-col gap-2"><h3 class="text-2xl font-bold">Customers</h3> <p class="text-xl">We love to hear from our precious users. For any feedback or queries simply write in to
						<a href="/">info@comany.com</a></p></div></div></div> ${validate_component(Info_container, "InfoContainer").$$render($$result, {}, {}, {})}</div> ${validate_component(Footer, "Footer").$$render($$result, {}, {}, {})}</div>`;
});
export {
  Page as default
};