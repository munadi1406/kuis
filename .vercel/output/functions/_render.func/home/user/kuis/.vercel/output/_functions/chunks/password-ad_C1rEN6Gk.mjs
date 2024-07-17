import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
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
  const { id, password, confirmPassword } = await request.json();
  if (!id || !password || !confirmPassword) {
    return new Response(
      JSON.stringify({
        message: "Password Tidak Boleh Kosong"
      }),
      { status: 500 }
    );
  }
  if (password !== confirmPassword) {
    return new Response(
      JSON.stringify({
        message: "Password dan Konfirmasi Password Tidak Sama"
      }),
      { status: 500 }
    );
  }
  const { data: user, error } = await supabase.auth.admin.updateUserById(id, {
    password
  });
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
      message: "Password Berhasil Dirubah"
    }),
    { status: 200 }
  );
};

export { POST };
