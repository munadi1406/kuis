import { supabase } from "../../../lib/supabase";

export const GET = async ({ params, url }) => {
    const id = url.searchParams.get("id_kelas");
  const { data:kelas,error } = await supabase
    .from("kelas")
    .select("*,siswa(nisn,nama_lengkap)")
    
    .eq('id',id)
 console.log(error)

  if (!error) {
    const sortedKelas = kelas.map(k => ({
      ...k,
      siswa: k.siswa.sort((a, b) => a.nama_lengkap.localeCompare(b.nama_lengkap))
    }));
    return new Response(
      JSON.stringify({
        message: "User details fetched successfully",
        data: sortedKelas,
      }),
      { status: 200 }
    );
  } else {
    return new Response(
      JSON.stringify({
        message: "User details fetched failed",
        data: [],
      }),
      { status: 404 }
    );
  }
};
