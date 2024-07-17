import { k as createComponent, l as renderTemplate, p as renderComponent, o as createAstro } from './astro/server_C9L6Sq8c.mjs';
import 'kleur/colors';
import { $ as $$Layout } from './Layout_C_IM5LOY.mjs';

const $$Astro = createAstro();
const $$Index = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const { cookies, redirect } = Astro2;
  const accessToken = cookies.get("sb-access-token");
  const refreshToken = cookies.get("sb-refresh-token");
  if (accessToken && refreshToken) {
    return redirect("/dashboard");
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Login" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "LoginForm", null, { "client:only": "react", "client:component-hydration": "only", "client:component-path": "/home/user/kuis/src/components/LoginForm", "client:component-export": "default" })} ` })}`;
}, "/home/user/kuis/src/pages/index.astro", void 0);

const $$file = "/home/user/kuis/src/pages/index.astro";
const $$url = "";

export { $$Index as default, $$file as file, $$url as url };
