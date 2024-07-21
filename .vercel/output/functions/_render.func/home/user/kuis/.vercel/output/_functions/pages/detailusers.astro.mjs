import { c as createComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_xU0KpEGp.mjs';
import 'kleur/colors';
import 'clsx';
export { renderers } from '../renderers.mjs';

const $$DetailUsers = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div> <form action="/api/auth/detail" method="post"> <input type="text" name="name"> <button type="submit">Simpan</button> </form> </div>`;
}, "/home/user/kuis/src/pages/detailUsers.astro", void 0);

const $$file = "/home/user/kuis/src/pages/detailUsers.astro";
const $$url = "/detailUsers";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$DetailUsers,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
