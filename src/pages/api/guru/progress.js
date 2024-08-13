import { supabase } from "../../../lib/supabase";



export const GET = async ({ params, url }) => {
  const search = url.searchParams.get("search");
  const idUser = url.searchParams.get('id_u');
  const id = url.searchParams.get("id");
  const perPage = 10;
  const years = url.searchParams.get('years');
  const print = url.searchParams.get('print');


  // Query utama untuk mengambil kuis
  let query = supabase
    .from("quiz")
    .select(`title,desc,id,start_quiz,end_quiz,created_at,mapel(mapel),kelas(kelas,siswa!left(count)),answer_status(count)`, { count: "exact" })

    .eq('id_user', idUser)
    .order("created_at", { ascending: false });
  if (!print) {
    query = query.limit(perPage)
  }

  if (id > 0) {
    const dateId = new Date(parseInt(id)); // Jika id adalah timestamp
    query = query.lt("created_at", dateId.toISOString());
  }
  if (years) {
    const startDate = new Date(`${years}-01-01`).toISOString();
    query = query.gte("created_at", startDate);
  }

  // Kondisi untuk search
  if (search) {
    query = query.ilike("title", `%${search}%`);
  }

  const { data, error, count: total } = await query;


  if (error) {
    return new Response(
      JSON.stringify({
        message: "internal server error",
        error: error.message,
      }),
      { status: 500 }
    );
  }

  let lastId = null;

  if (data.length > 0) {
    lastId = new Date(data[data.length - 1].created_at).getTime();
  }

  // Query untuk mengambil jumlah kuis yang dibuat per bulan dan tahun
  const { data: kuisPerBulan, error: errorKuisPerBulan } = await supabase
    .from("quiz")
    .select(`id, created_at`)
    .eq('id_user', idUser)
    .order("created_at", { ascending: false });

  if (errorKuisPerBulan) {
    return new Response(
      JSON.stringify({
        message: "internal server error",
        error: errorKuisPerBulan.message,
      }),
      { status: 500 }
    );
  }

  const kuisPerBulanTahunObj = kuisPerBulan.reduce((acc, kuis) => {
    const date = new Date(kuis.created_at);
    const yearMonth = `${date.getFullYear()}-${date.getMonth() + 1}`;
    if (!acc[yearMonth]) {
      acc[yearMonth] = 0;
    }
    acc[yearMonth]++;
    return acc;
  }, {});

  // Mengubah objek hasil pengelompokan menjadi array
  const kuisPerBulanTahun = Object.entries(kuisPerBulanTahunObj).map(([key, value]) => ({
    date: key,
    count: value,
  }));





  const payload = {
    lastId,
    data,
    perPage,
    total,
    kuisPerBulanTahun,
  };

  return new Response(
    JSON.stringify({
      message: "User details fetched successfully",
      data: payload,
    }),
    { status: 200 }
  );
};
