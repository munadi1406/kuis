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
  const { role,id } = await request.json();
  
  if (!role) {
    return new Response(
      JSON.stringify({
        message: "Role Tidak Boleh Kosong",
      }),
      { status: 500 }
    );
  }
 
  const { data: user, error } = await supabase.auth.admin.updateUserById(id, {
    user_metadata:{
      roleUser : role
    }
  });
 

  if (error) {
    return new Response(
      JSON.stringify({
        message: error.message,
      }),
      { status: 500 }
    );
  }


  return new Response(
    JSON.stringify({
      message: "Role Berhasil Dirubah",
    }),
    { status: 200 }
  );
};
