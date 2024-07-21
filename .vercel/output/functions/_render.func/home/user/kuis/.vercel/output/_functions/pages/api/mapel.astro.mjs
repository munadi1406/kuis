import { s as supabase } from '../../chunks/supabase_DBBGmT5w.mjs';
export { renderers } from '../../renderers.mjs';

const GET = async ({ params, url }) => {
  const search = url.searchParams.get("search");
  const id = url.searchParams.get("id");
  const perPage = 10;
  let query = supabase
    .from("mapel")
    .select("*")
    .limit(perPage)
    .order("created_at", { ascending: false });
  
  // Kondisi untuk id
  if (id > 0) {
    query = query.lt("id", id);
  }

  // Kondisi untuk search
  if (search) {
    query = query.ilike("mapel", `%${search}%`);
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

const POST = async ({ params, request, url }) => {
  const { mataPelajaran } = await request.json();

  let { data: mapel } = await supabase
    .from("mapel")
    .select("mapel")
    .eq("mapel", mataPelajaran);
  if (mapel.length > 0) {
  
    return new Response(
      JSON.stringify({
        message: "Mata Pelajaran Sudah Ada",
      }),
      { status: 409 }
    );
  }

  const { data, error } = await supabase
    .from("mapel")
    .insert([{ mapel: mataPelajaran }])
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
      message: "Mata Pelajaran Berhasil Di Tambahkan",
    }),
    { status: 200 }
  );
};
const PUT = async ({ params, request, url }) => {
  const { mataPelajaran, id } = await request.json();

  let { data: mapel } = await supabase
    .from("mapel")
    .select("mapel")
    .eq("mapel", mataPelajaran);
  if (mapel.length > 0) {
  
    return new Response(
      JSON.stringify({
        message: "Mata Pelajaran Sudah Ada",
      }),
      { status: 409 }
    );
  }

  const { data, error } = await supabase
    .from("mapel")
    .update({ mapel: mataPelajaran })
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

const DELETE = async ({ params, request, url }) => {
  const id = url.searchParams.get("id");

  const { error } = await supabase.from("mapel").delete().eq("id", id);

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

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  DELETE,
  GET,
  POST,
  PUT
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
