import { supabase } from "../../../lib/supabase";
import { createClient } from "@supabase/supabase-js";
const supabaseAD = createClient(
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
  const { role, id } = await request.json();

  if (!role) {
    return new Response(
      JSON.stringify({
        message: "Role Tidak Boleh Kosong",
      }),
      { status: 500 }
    );
  }

  const { data: user, error } = await supabaseAD.auth.admin.updateUserById(id, {
    user_metadata: {
      role,
    },
  });

  const { data } = await supabase
    .from("detail_user")
    .update({ role })
    .eq("id_user", id)
    .select();

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
