import { supabase } from "../../../lib/supabase";

export const POST = async ({ request, redirect }) => {
  const { email, password, passwordConfirm } = await request.json();
  console.log({email,password,passwordConfirm})
  if (!email || !password || !passwordConfirm) {
    return new Response(
      JSON.stringify({
        message: "Semua Kolom Wajib Di Isi",
      }),
      { status: 400 }
    );
  }
  if(password !== passwordConfirm){
    return new Response(JSON.stringify({
      message:"Password Dan Konfirmasi Password Tidak Sama"
    }),{
      status:400
    })
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    return new Response(
      JSON.stringify({
        message: "Email Sudah Terdaftar",
      }),
      { status: 400 }
    );
  }
  return new Response("Berhasil", {
    status: 200,
  });
};
