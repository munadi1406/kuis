import { s as supabase } from './supabase_DBBGmT5w.mjs';

const POST = async ({ request, redirect }) => {
  const { email, password, passwordConfirm, username } = await request.json();

  if (!email || !password || !passwordConfirm) {
    return new Response(
      JSON.stringify({
        message: "Semua Kolom Wajib Di Isi",
      }),
      { status: 400 }
    );
  }
  if (password !== passwordConfirm) {
    return new Response(
      JSON.stringify({
        message: "Password Dan Konfirmasi Password Tidak Sama",
      }),
      {
        status: 400,
      }
    );
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        role: "users",
        username,
      },
    },
  });
  if (error) {
    return new Response(
      JSON.stringify({
        message: "Email Sudah Terdaftar",
      }),
      { status: 400 }
    );
  }
 await supabase
    .from("detail_user")
    .insert([
      {
        id_user: data.user.id,
        username: username,
        email: data.user.email,
        role:"users"
      },
    ])
    .select();
    
  return new Response("Berhasil", {
    status: 200,
  });
};

export { POST };
