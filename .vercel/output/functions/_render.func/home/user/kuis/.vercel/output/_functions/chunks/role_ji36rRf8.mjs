import { s as supabase } from './supabase_DBBGmT5w.mjs';
import { createClient } from '@supabase/supabase-js';

const supabaseAD = createClient(
  "https://mbkrjdzimlemcuyphnla.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1ia3JqZHppbWxlbWN1eXBobmxhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwNjc1MDUxOCwiZXhwIjoyMDIyMzI2NTE4fQ.DPqjt_Ym7tqK-jepWE7UJ5RCX7q9kzXddRc4HFUKKy0",
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);
const POST = async ({ request, cookies, redirect }) => {
  const { role, id } = await request.json();
  if (!role) {
    return new Response(
      JSON.stringify({
        message: "Role Tidak Boleh Kosong"
      }),
      { status: 500 }
    );
  }
  const { data: user, error } = await supabaseAD.auth.admin.updateUserById(id, {
    user_metadata: {
      role
    }
  });
  await supabase.from("detail_user").update({ role }).eq("id_user", id).select();
  if (error) {
    return new Response(
      JSON.stringify({
        message: error.message
      }),
      { status: 500 }
    );
  }
  return new Response(
    JSON.stringify({
      message: "Role Berhasil Dirubah"
    }),
    { status: 200 }
  );
};

export { POST };
