import { supabase } from "../../../lib/supabase";

export const POST = async ({ request, redirect }) => {
  const formData = await request.formData();
  const name = formData.get("name")?.toString();

  if (!name) {
    return new Response("Masukkan Nama Lengkap Anda", { status: 400 });
  }
  const {
    data: { user },
  } = await supabase.auth.getUser();
  console.log(user.id);

  // const { data, error } = await supabase
  //   .from("users")
  //   .update({ name, role:"users" })
  //   .eq("id", user.id)
  //   .select();
    

    const { data, error } = await supabase
    .from('users')
    .upsert({ name,id:user.id,role:"users" })
    .select()
  if (error) {
    return new Response(error.message, { status: 500 });
  }

  return redirect("/dashboard");
};
