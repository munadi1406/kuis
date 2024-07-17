import { k as createComponent, l as renderTemplate, p as renderComponent } from './astro/server_C9L6Sq8c.mjs';
import 'kleur/colors';
import { $ as $$Layout } from './Layout_C_IM5LOY.mjs';

const $$Register = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Register" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "RegisterForm", null, { "client:only": "react", "client:component-hydration": "only", "client:component-path": "/home/user/kuis/src/components/RegisterForm", "client:component-export": "default" })} ` })}`;
}, "/home/user/kuis/src/pages/register.astro", void 0);

const $$file = "/home/user/kuis/src/pages/register.astro";
const $$url = "/register";

export { $$Register as default, $$file as file, $$url as url };
