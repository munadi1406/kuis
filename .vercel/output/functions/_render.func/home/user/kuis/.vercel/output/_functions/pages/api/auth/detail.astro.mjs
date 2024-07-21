import { s as supabase } from '../../../chunks/supabase_DBBGmT5w.mjs';
export { renderers } from '../../../renderers.mjs';

const POST = async ({ request, redirect }) => {
  const formData = await request.formData();
  const name = formData.get("name")?.toString();

  if (!name) {
    return new Response("Masukkan Nama Lengkap Anda", { status: 400 });
  }
  const {
    data: { user },
  } = await supabase.auth.getUser();


  // const { data, error } = await supabase
  //   .from("users")
  //   .update({ name, role:"users" })
  //   .eq("id", user.id)
  //   .select();
    

    const { data, error } = await supabase
    .from('users')
    .upsert({ name,id:user.id,role:"users" })
    .select();
  if (error) {
    return new Response(error.message, { status: 500 });
  }

  return redirect("/dashboard");
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
