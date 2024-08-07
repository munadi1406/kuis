import { supabase } from "../../../lib/supabase";



export const GET = async ({ params, url }) => {
  const filter = url.searchParams.get("filter");
  const jk = url.searchParams.get("jk");
 
  let query = supabase
    .from("siswa")
    .select(`*,detail_user!left(*)`)
    .order("nama_lengkap", { ascending: true });
  
  if (filter) {
    query = query.eq("id_kelas", filter);
  }
  if (jk) {
    query = query.eq("jenis_kelamin", jk);
  }
 
  const { data, error } = await query;

  if (error) {
    return new Response(
      JSON.stringify({
        message: "internal server error",
        error: error.message,
      }),
      { status: 500 }
    );
  }

 

  const payload = {
    data,
  };

  if (data) {
    return new Response(
      JSON.stringify({
        message: "User details fetched successfully",
        data:{...payload},
      }),
      { status: 200 }
    );
  } else {
    return new Response(
      JSON.stringify({
        message: "User details fetched successfully",
        data: [],
      }),
      { status: 404 }
    );
  }
};
