import { k as createComponent, l as renderTemplate, p as renderComponent, m as maybeRenderHead, n as addAttribute } from './astro/server_C9L6Sq8c.mjs';
import 'kleur/colors';
import { $ as $$Dashboard } from './Dashboard_-s-1A4aB.mjs';
import { s as supabase } from './supabase_DBBGmT5w.mjs';

const $$Profile = createComponent(async ($$result, $$props, $$slots) => {
  const {
    data: { user }
  } = await supabase.auth.getUser();
  return renderTemplate`${renderComponent($$result, "Dashboard", $$Dashboard, { "title": "Profile" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="bg-white shadow-md rounded-md p-2 font-poppins"> <h2 class="text-2xl">Profile</h2> <label class="text-sm text-gray-600 pb-1 block font-poppins">Email</label> <input type="text" name="email"${addAttribute(user.email, "value")} disabled class="border focus:outline-none rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full font-poppins"> <label class="text-sm text-gray-600 pb-1 block font-poppins">Nama</label> <input type="text" name="email"${addAttribute(user.user_metadata.username, "value")} class="border focus:outline-none rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full font-poppins"> </div> ` })}`;
}, "/home/user/kuis/src/pages/profile.astro", void 0);

const $$file = "/home/user/kuis/src/pages/profile.astro";
const $$url = "/profile";

export { $$Profile as default, $$file as file, $$url as url };
