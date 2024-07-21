import { c as createComponent, r as renderTemplate, d as renderComponent, m as maybeRenderHead } from '../chunks/astro/server_xU0KpEGp.mjs';
import 'kleur/colors';
import { $ as $$Dashboard } from '../chunks/Dashboard_BZnJtW5m.mjs';
export { renderers } from '../renderers.mjs';

const $$Feedback = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Dashboard", $$Dashboard, { "title": "Umpan Balik" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div>ini halaman feedback</div> ` })}`;
}, "/home/user/kuis/src/pages/feedback.astro", void 0);

const $$file = "/home/user/kuis/src/pages/feedback.astro";
const $$url = "/feedback";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Feedback,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
