import { k as createComponent, l as renderTemplate, m as maybeRenderHead } from './astro/server_C9L6Sq8c.mjs';
import 'kleur/colors';
import 'clsx';

const $$DetailUsers = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div> <form action="/api/auth/detail" method="post"> <input type="text" name="name"> <button type="submit">Simpan</button> </form> </div>`;
}, "/home/user/kuis/src/pages/detailUsers.astro", void 0);

const $$file = "/home/user/kuis/src/pages/detailUsers.astro";
const $$url = "/detailUsers";

export { $$DetailUsers as default, $$file as file, $$url as url };
