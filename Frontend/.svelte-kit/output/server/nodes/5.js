

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/home/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/5.usTGys_1.js","_app/immutable/chunks/scheduler.W2pu3yam.js","_app/immutable/chunks/index.B2sZqhdO.js","_app/immutable/chunks/each.D6YF6ztN.js","_app/immutable/chunks/headline.C3mIng4P.js","_app/immutable/chunks/info-container.CVJ4bIfC.js","_app/immutable/chunks/lanterns-1.BjlSnYdf.js"];
export const stylesheets = ["_app/immutable/assets/info-container.CU0CO3wJ.css"];
export const fonts = [];
