import { k as createComponent, l as renderTemplate, p as renderComponent, m as maybeRenderHead } from './astro/server_C9L6Sq8c.mjs';
import 'kleur/colors';
import { $ as $$Dashboard } from './Dashboard_-s-1A4aB.mjs';

const $$History = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Dashboard", $$Dashboard, { "title": "histori pengerjaan kuis" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<h1>histori pengerjaan kuis</h1> ` })}`;
}, "/home/user/kuis/src/pages/history.astro", void 0);

const $$file = "/home/user/kuis/src/pages/history.astro";
const $$url = "/history";

export { $$History as default, $$file as file, $$url as url };
