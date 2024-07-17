import { k as createComponent, l as renderTemplate, p as renderComponent, m as maybeRenderHead } from './astro/server_C9L6Sq8c.mjs';
import 'kleur/colors';
import { $ as $$Dashboard } from './Dashboard_Bt_cIbUM.mjs';

const $$Feedback = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Dashboard", $$Dashboard, { "title": "Umpan Balik" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div>ini halaman feedback</div> ` })}`;
}, "/home/user/kuis/src/pages/feedback.astro", void 0);

const $$file = "/home/user/kuis/src/pages/feedback.astro";
const $$url = "/feedback";

export { $$Feedback as default, $$file as file, $$url as url };
