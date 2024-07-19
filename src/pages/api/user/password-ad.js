// import { supabase } from "../../../lib/supabase";
import { createClient } from "@supabase/supabase-js";
const supabase = createClient(
  import.meta.env.SUPABASE_URL,
  import.meta.env.SUPABASE_SERVICE_KEY,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);

export const POST = async ({ request, cookies, redirect }) => {
  const { id, password, confirmPassword } = await request.json();
 
  if (!id || !password || !confirmPassword) {
    return new Response(
      JSON.stringify({
        message: "Password Tidak Boleh Kosong",
      }),
      { status: 500 }
    );
  }
  if(password !== confirmPassword){
    return new Response(
        JSON.stringify({
          message: "Password dan Konfirmasi Password Tidak Sama",
        }),
        { status: 500 }
      );
  }
  const { data: user, error } = await supabase.auth.admin.updateUserById(id, {
    password: password,
  });


  if (error) {
    return new Response(
      JSON.stringify({
        message: error.message,
      }),
      { status: 500 }
    );
  }

  //   const { access_token, refresh_token } = data.session;
  //   cookies.set("sb-access-token", access_token, {
  //     path: "/",
  //   });
  //   cookies.set("sb-refresh-token", refresh_token, {
  //     path: "/",
  //   });

  return new Response(
    JSON.stringify({
      message: "Password Berhasil Dirubah",
    }),
    { status: 200 }
  );
};
