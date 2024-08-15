import { supabase } from "../../../lib/supabase";


export const GET = async ({ params, url }) => {
  try {


    const search = url.searchParams.get("search");
    const id = url.searchParams.get("id");

    const perPage = 10;
    const { data: activeTahunAjaran, error: tahunAjaranError } = await supabase
      .from("tahun_ajaran")
      .select("*")
      .eq("status", true)  // Get the active academic year
      .single();  // Ensure we get only one record

    if (tahunAjaranError) {
      return new Response(
        JSON.stringify({
          message: "Error fetching active academic year",
          error: tahunAjaranError.message,
        }),
        { status: 500 }
      );
    }

    let query = supabase
      .from("kelas")
      .select(`
      *,
      kelas_history!left(tahun_ajaran(id), siswa!left(jenis_kelamin))
    `)
      .limit(perPage)
      .order("kelas", { ascending: true })
      .eq('kelas_history.tahun_ajaran.id', activeTahunAjaran.id)
      .is('kelas_history.end_date', null);

    // Kondisi untuk id
    if (id > 0) {
      query = query.lt("id", id);
    }

    // Kondisi untuk search
    if (search) {
      query = query.ilike("kelas", `%${search}%`);
    }

    const { data, error } = await query;

    if (error) {
      return new Response(
        JSON.stringify({
          message: "Error fetching class details",
          error: error.message,
        }),
        { status: 500 }
      );
    }

    // Hitung jumlah siswa berdasarkan jenis kelamin
    const processedData = data.map((kelas) => {
      const siswa = kelas.kelas_history.flatMap(history => history.siswa);
      const totalLakiLaki = siswa.filter(s => s.jenis_kelamin === 'Laki-laki').length;
      const totalPerempuan = siswa.filter(s => s.jenis_kelamin === 'Perempuan').length;

      return {
        ...kelas,
        totalLakiLaki,
        totalPerempuan,
        totalSiswa: siswa.length
      };
    });

    let lastId = null;
    if (data.length > 0) {
      lastId = data[data.length - 1].id;
    }

    const payload = {
      lastId,
      data: processedData,
      perPage
    };

    return new Response(
      JSON.stringify({
        message: 200,
        data: { ...payload },
      }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: "Internal Server error",
      }),
      { status: 500 }
    );
  }
};

export const POST = async ({ params, request, url }) => {
  const { dataKelas } = await request.json();

  let { data: kelas } = await supabase
    .from("kelas")
    .select("kelas")
    .eq("kelas", dataKelas);
  if (kelas.length > 0) {

    return new Response(
      JSON.stringify({
        message: "Mata Pelajaran Sudah Ada",
      }),
      { status: 409 }
    );
  }

  const { data, error } = await supabase
    .from("kelas")
    .insert([{ kelas: dataKelas }])
    .select();
  if (error) {
    return new Response(
      JSON.stringify({
        message: "Internal Server Error",
      }),
      { status: 500 }
    );
  }
  return new Response(
    JSON.stringify({
      message: "Kelas Berhasil Di Tambahkan",
    }),
    { status: 200 }
  );
};
export const PUT = async ({ params, request, url }) => {
  const { dataKelas, id } = await request.json();

  let { data: kelas } = await supabase
    .from("kelas")
    .select("kelas")
    .eq("kelas", dataKelas);
  if (kelas.length > 0) {

    return new Response(
      JSON.stringify({
        message: "Mata Pelajaran Sudah Ada",
      }),
      { status: 409 }
    );
  }

  const { data, error } = await supabase
    .from("kelas")
    .update({ kelas: dataKelas })
    .eq("id", id)
    .select();

  if (error) {
    return new Response(
      JSON.stringify({
        message: "Internal Server Error",
      }),
      { status: 500 }
    );
  }
  return new Response(
    JSON.stringify({
      message: "Mata Pelajaran Berhasil Di Update",
    }),
    { status: 200 }
  );
};

export const DELETE = async ({ params, request, url }) => {
  const id = url.searchParams.get("id");

  const { error } = await supabase.from("kelas").delete().eq("id", id);

  if (error) {
    return new Response(
      JSON.stringify({
        message: "Internal Server Error",
      }),
      { status: 500 }
    );
  }
  return new Response(
    JSON.stringify({
      message: "Mata Pelajaran Berhasil Di Hapus",
    }),
    { status: 200 }
  );
};
