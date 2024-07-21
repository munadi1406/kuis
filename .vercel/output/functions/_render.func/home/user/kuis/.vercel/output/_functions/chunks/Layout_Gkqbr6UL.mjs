import { c as createComponent, r as renderTemplate, a as addAttribute, d as renderComponent, e as renderHead, f as renderSlot, b as createAstro } from './astro/server_xU0KpEGp.mjs';
import 'kleur/colors';
import { a as $$SEO, $ as $$Font } from './SEO_Cy6atdP4.mjs';
/* empty css                              */

const $$Astro = createAstro();
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title } = Astro2.props;
  return renderTemplate`<html lang="en"> <head><meta charset="UTF-8"><meta name="description" content="Astro description"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"${addAttribute(Astro2.generator, "content")}>${renderComponent($$result, "SEO", $$SEO, { "title": `${title} - SDN PINGARAN ULU`, "description": "A heavily optimized description full of well-researched keywords.", "openGraph": {
    basic: {
      title,
      type: "A type.",
      image: "https://user-images.githubusercontent.com/5182256/131216951-8f74f425-f775-463d-a11b-0e01ad9fce8d.png"
    }
  }, "twitter": {
    creator: "@jonasmerlins1"
  }, "extend": {
    // extending the default link tags
    link: [{ rel: "icon", href: "/favicon.ico" }],
    // extending the default meta tags
    meta: [
      {
        name: "twitter:image",
        content: "https://user-images.githubusercontent.com/5182256/131216951-8f74f425-f775-463d-a11b-0e01ad9fce8d.png"
      },
      { name: "twitter:title", content: "Tinker Tailor Soldier Spy" },
      { name: "twitter:description", content: "Agent" }
    ]
  } })}${renderComponent($$result, "Font", $$Font, {})}${renderHead()}</head> <body> <main> ${renderSlot($$result, $$slots["default"])} </main> </body></html>`;
}, "/home/user/kuis/src/layouts/Layout.astro", void 0);

export { $$Layout as $ };
