import { supabase } from "../../../lib/supabase";

export const GET = async ({ params, url }) => {
  const search = url.searchParams.get("search");
  const id = url.searchParams.get("id");
  const perPage = 10
  let query = supabase
    .from("guru")
    .select(`*,detail_user!left(*)`)
    .limit(perPage)
    .order("created_at", { ascending: false });
  
  // Kondisi untuk id
  if (id > 0) {
    const dateId = new Date(parseInt(id)); // Jika id adalah timestamp
    query = query.lt("created_at", dateId.toISOString());
  }

  // Kondisi untuk search
  if (search) {
    query = query.ilike("nama_lengkap", `%${search}%`);
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

  let lastId = null;

  if (data.length > 0) {
    lastId = new Date(data[data.length - 1].created_at).getTime();
  }

  const payload = {
    lastId,
    data,
    perPage
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

export const POST = async ({ params, request, url }) => {
  const { nip,idUser,namaLengkap,alamat,jenisKelamin } = await request.json();

  const { data, error } = await supabase
    .from("guru")
    .insert([{ nip,id_user:idUser,nama_lengkap:namaLengkap,alamat,jenis_kelamin:jenisKelamin }])
    .select();
  if (error) {
    return new Response(
      JSON.stringify({
        message: "Data Guru Gagal Di Tambahkan, Pastikan NIP Tidak Sama Dengan Guru Lain",
      }),
      { status: 500 }
    );
  }
  return new Response(
    JSON.stringify({
      message: "Data Guru Berhasil Di Tambahkan",
    }),
    { status: 200 }
  );
};
export const PUT = async ({ params, request, url }) => {
  try {
    // Parsing request body
    const { nip, idUser, lastNip, namaLengkap, alamat, jenisKelamin } = await request.json();

    // Check if NIP already exists for another user
    const { data: existingGuru, error: checkError } = await supabase
      .from("guru")
      .select("nip")
      .eq("nip", nip);
    
    if (checkError) {
      return new Response(
        JSON.stringify({
          message: "Internal Server Error",
        }),
        { status: 500 }
      );
    }

    if (existingGuru.length > 1) {
      return new Response(
        JSON.stringify({
          message: "NIP sudah digunakan",
        }),
        { status: 409 }
      );
    }

    // Insert or update guru data
    const { data, error } = await supabase
      .from("guru")
      .update(
        { nip, id_user: idUser, nama_lengkap: namaLengkap, alamat, jenis_kelamin: jenisKelamin },
      )
      .eq('nip',lastNip)
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
        message: "Data guru berhasil diperbarui",
      }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: "Internal Server Error",
        error: error.message,
      }),
      { status: 500 }
    );
  }
};

export const DELETE = async ({ params, request, url }) => {
  const nip = url.searchParams.get("nip");

  const { error } = await supabase.from("guru").delete().eq("nip", nip);

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
      message: "Data Guru Berhasil Di Hapus",
    }),
    { status: 200 }
  );
};
