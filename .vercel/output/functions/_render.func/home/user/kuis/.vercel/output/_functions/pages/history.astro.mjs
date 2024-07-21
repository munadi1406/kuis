import { c as createComponent, r as renderTemplate, d as renderComponent, m as maybeRenderHead } from '../chunks/astro/server_xU0KpEGp.mjs';
import 'kleur/colors';
import { $ as $$Dashboard } from '../chunks/Dashboard_BZnJtW5m.mjs';
export { renderers } from '../renderers.mjs';

const $$History = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Dashboard", $$Dashboard, { "title": "histori pengerjaan kuis" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<h1>histori pengerjaan kuis</h1> ` })}`;
}, "/home/user/kuis/src/pages/history.astro", void 0);

const $$file = "/home/user/kuis/src/pages/history.astro";
const $$url = "/history";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$History,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
