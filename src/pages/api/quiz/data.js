import { supabase } from "@/lib/supabase";


export const GET = async ({ params, url }) => {
  const search = url.searchParams.get("search");
  const id = url.searchParams.get("id");
  const idUser = url.searchParams.get("id_u");
  const filter = url.searchParams.get("filter");

  const perPage = 10;
  let query;

  // Kondisi untuk filter
  if (filter === "kuis") {
    query = supabase
      .from("quiz")
      .select(`*, kelas(kelas), mapel(mapel)`)
      .limit(perPage)
      .eq('id_user', idUser)
      .order("created_at", { ascending: false });
  } else if (filter === "kelas") {
    query = supabase
      .from("kelas")
      .select(`*, quiz!left(*)`)
      .limit(perPage)
      .order("kelas", { ascending: true });
  } else if (filter === "mapel") {
    query = supabase
      .from("mapel")
      .select(`*, quiz!left(*)`)
      .limit(perPage)
      .order("mapel", { ascending: true });
  } else {
    // Default filter
    query = supabase
      .from("quiz")
      .select(`*, kelas(kelas), mapel(mapel)`)
      .limit(perPage)
      .eq('id_user', idUser)
      .order("created_at", { ascending: false });
  }

  // Kondisi untuk id
  if (id > 0) {
    const dateId = new Date(parseInt(id)); // Jika id adalah timestamp
    query = query.lt("created_at", dateId.toISOString());
  }

  // Kondisi untuk search
  if (search) {
    if (filter === "kuis") {
      query = query.ilike("title", `%${search}%`);
    } else if (filter === 'kelas') {
      query = query.ilike("kelas", `%${search}%`);
    } else {
      query = query.ilike("mapel", `%${search}%`);
    }
  }

  const { data, error } = await query;

  if (error) {
    return new Response(
      JSON.stringify({
        message: "Error fetching quiz details",
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
        message: 200,
        data: { ...payload },
      }),
      { status: 200 }
    );
  } else {
    return new Response(
      JSON.stringify({
        message: 200,
        data: [],
      }),
      { status: 200 }
    );
  }
};
