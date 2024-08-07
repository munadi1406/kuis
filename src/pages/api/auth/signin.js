import { supabase } from "../../../lib/supabase";

export const POST = async ({ request, cookies, redirect }) => {
  const { email, password } = await request.json();

  if (!email || !password) {
    return new Response(
      JSON.stringify({
        message: "email dan password tidah boleh kosong",
      }),
      { status: 500 }
    );
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return new Response(
      JSON.stringify({
        message: error.message,
      }),
      { status: 500 }
    );
  }

  const { access_token, refresh_token } = data.session;
  cookies.set("sb-access-token", access_token, {
    path: "/",
  });
  cookies.set("sb-refresh-token", refresh_token, {
    path: "/",
  });
  
  return new Response(
    JSON.stringify({
      message: "Login Berhasil",
    }),
    { status: 200,data:{access_token,refresh_token} }
  );
};
