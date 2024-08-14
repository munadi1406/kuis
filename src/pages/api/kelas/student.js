import { supabase } from "../../../lib/supabase";

export const GET = async ({ params, url }) => {
  const id = url.searchParams.get("id_kelas");
  const tahunAjaran = url.searchParams.get("t");

  const { data: kelas, error } = await supabase
    .from("kelas_history")
    .select(`*, siswa(nisn, nama_lengkap)`)
    .eq('id_kelas', id)
    .eq('id_tahun_ajaran', tahunAjaran);


  console.log({error})
  if (!error) {
    const sortedKelas = kelas.map(k => ({
      ...k,
      nama_lengkap: k.siswa.nama_lengkap
    }));
    console.log({kelas})
    console.log({sortedKelas})
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
