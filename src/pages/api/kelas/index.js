import { supabase } from "../../../lib/supabase";


export const GET = async ({ params, url }) => {
  const search = url.searchParams.get("search");
  const id = url.searchParams.get("id");
  const perPage = 10
  let query = supabase
    .from("kelas")
    .select("*")
    .limit(perPage)
    .order("created_at", { ascending: false });
  
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
        message: "Error fetching user details",
        error: error.message,
      }),
      { status: 500 }
    );
  }

  let lastId = null;

  if (data.length > 0) {
    lastId = data[data.length - 1].id;
  }

  const payload = {
    lastId,
    data,
    perPage
  };

  if (data) {
    return new Response(
      JSON.stringify({
        message: 200,
        data:{...payload},
      }),
      { status: 200 }
    );
  } else {
    return new Response(
      JSON.stringify({
        message: 404,
        data: [],
      }),
      { status: 404 }
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
