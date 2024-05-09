import { supabase } from "../../../lib/supabase";

export const POST = async ({ request, redirect }) => {
  const formData = await request.formData();
  const name = formData.get("name")?.toString();

  if (!name) {
    return new Response("Masukkan Nama Lengkap Anda", { status: 400 });
  }

  const { error } = await supabase.from("users").insert([{ name }]).select();

  if (error) {
    return new Response(error.message, { status: 500 });
  }

  return redirect("/dashboard");
};
