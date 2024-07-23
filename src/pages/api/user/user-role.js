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
  const { role, id, namaLengkap } = await request.json();

  if (!role) {
    return new Response(
      JSON.stringify({
        message: "Role Tidak Boleh Kosong",
      }),
      { status: 500 }
    );
  }

  // Simpan data pengguna sebelum update
  let previousUserMetadata;
  let rollbackRequired = false;

  // 1. Update User Metadata
  const { data: user, error: userError } = await supabase.auth.admin.updateUserById(id, {
    user_metadata: {
      roleUser: role,
    },
  });

  if (userError) {
    return new Response(
      JSON.stringify({
        message: userError.message,
      }),
      { status: 500 }
    );
  }

 
  const { data: detailData, error: detailError } = await supabase
    .from('detail_user')
    .update({ nama_lengkap: namaLengkap })
    .eq('id_user', id)
    .select();

  if (detailError) {
    rollbackRequired = true;
  }

  if (rollbackRequired) {
    // Rollback the user metadata update
    const { error: rollbackError } = await supabase.auth.admin.updateUserById(id, {
      user_metadata: null,
    });

    if (rollbackError) {
      return new Response(
        JSON.stringify({
          message: `Rollback failed: ${rollbackError.message}`,
        }),
        { status: 500 }
      );
    }

    return new Response(
      JSON.stringify({
        message: `Update failed and rollback completed: ${detailError.message}`,
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

