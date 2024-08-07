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

export const POST = async ({ request }) => {
  const { role, id, nisnOrNip } = await request.json();

  if (!role) {
    return new Response(
      JSON.stringify({
        message: "Role Tidak Boleh Kosong",
      }),
      { status: 400 }
    );
  }

  let rollbackRequired = false;

  if (role === "Siswa") {
    const { data: siswa, error: siswaError } = await supabase
      .from('siswa')
      .select('id_user')
      .eq('nisn', nisnOrNip)
      .single();

    if (siswaError) {
      return new Response(
        JSON.stringify({
          message: "NISN tidak terdaftar",
          error: siswaError.message,
        }),
        { status: 500 }
      );
    }

    if (!siswa) {
      return new Response(
        JSON.stringify({
          message: "NISN tidak terdaftar",
        }),
        { status: 404 }
      );
    }

    if (siswa.id_user) {
      return new Response(
        JSON.stringify({
          message: "NISN sudah terhubung dengan akun lain, silahkan hubungi admin",
        }),
        { status: 409 }
      );
    }
  }

  if (role === "Guru") {
    const { data: guru, error: guruError } = await supabase
      .from('guru')
      .select('id_user')
      .eq('nip', nisnOrNip)
      .single();

    if (guruError) {
      return new Response(
        JSON.stringify({
          message: "NIP tidak terdaftar",
          error: guruError.message,
        }),
        { status: 500 }
      );
    }

    if (!guru) {
      return new Response(
        JSON.stringify({
          message: "NIP tidak terdaftar",
        }),
        { status: 404 }
      );
    }

    if (guru.id_user) {
      return new Response(
        JSON.stringify({
          message: "NIP sudah terhubung dengan akun lain, silahkan hubungi admin",
        }),
        { status: 409 }
      );
    }
  }

  // Update User Metadata
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

  if (role === "Siswa") {
    const { data: siswaUpdate, error: siswaUpdateError } = await supabase
      .from('siswa')
      .update({ id_user: id })
      .eq('nisn', nisnOrNip)
      .select();

    if (siswaUpdateError) {
      rollbackRequired = true;
    }
  }

  if (role === "Guru") {
    const { data: guruUpdate, error: guruUpdateError } = await supabase
      .from('guru')
      .update({ id_user: id })
      .eq('nip', nisnOrNip)
      .select();

    if (guruUpdateError) {
      rollbackRequired = true;
    }
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
        message: `Update failed and rollback completed`,
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


