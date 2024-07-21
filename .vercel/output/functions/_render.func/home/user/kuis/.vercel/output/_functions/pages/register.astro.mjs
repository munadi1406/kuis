import { c as createComponent, r as renderTemplate, d as renderComponent } from '../chunks/astro/server_xU0KpEGp.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../chunks/Layout_Gkqbr6UL.mjs';
export { renderers } from '../renderers.mjs';

const $$Register = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Register" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "RegisterForm", null, { "client:only": "react", "client:component-hydration": "only", "client:component-path": "/home/user/kuis/src/components/RegisterForm", "client:component-export": "default" })} ` })}`;
}, "/home/user/kuis/src/pages/register.astro", void 0);

const $$file = "/home/user/kuis/src/pages/register.astro";
const $$url = "/register";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Register,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
