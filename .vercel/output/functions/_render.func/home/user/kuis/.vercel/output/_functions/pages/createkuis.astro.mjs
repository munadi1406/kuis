import { c as createComponent, r as renderTemplate, d as renderComponent, m as maybeRenderHead } from '../chunks/astro/server_xU0KpEGp.mjs';
import 'kleur/colors';
import { $ as $$Dashboard } from '../chunks/Dashboard_BZnJtW5m.mjs';
export { renderers } from '../renderers.mjs';

const $$CreateKuis = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Dashboard", $$Dashboard, { "title": "Buat Kuis" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div> ${renderComponent($$result2, "CreateQuiz", null, { "client:only": "react", "client:component-hydration": "only", "client:component-path": "@/components/quiz/CreateQuiz", "client:component-export": "default" })} </div> ` })}`;
}, "/home/user/kuis/src/pages/createKuis.astro", void 0);

const $$file = "/home/user/kuis/src/pages/createKuis.astro";
const $$url = "/createKuis";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$CreateKuis,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
