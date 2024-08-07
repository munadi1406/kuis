import { supabase } from "../../../lib/supabase";

export const GET = async ({ params, url }) => {
  const search = url.searchParams.get("search");

  let query = supabase
    .from('detail_user')
    .select('id_user, nama_lengkap, email, guru!left(id_user), siswa!left(id_user)');

    if (search) {
      query = query.or(`nama_lengkap.ilike.%${search}%,email.ilike.%${search}%`);
    }
    
  let { data: detail_user, error } = await query;

  if (error) {
    
    return new Response(
      JSON.stringify({
        message: "Error fetching user details",
        error: error.message
      }),
      { status: 500 }
    );
  }

  // Filter data untuk hanya menyertakan pengguna yang tidak terkait dengan guru atau siswa
  const filteredData = detail_user.filter(user => !user.guru && !user.siswa.length);

  return new Response(
    JSON.stringify({
      message: "User details fetched successfully",
      data: filteredData,
    }),
    { status: 200 }
  );
};
