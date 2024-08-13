import { supabase } from "../../../lib/supabase";

export const GET = async ({ params, url }) => {
  const search = url.searchParams.get("search");
  const id = url.searchParams.get("id");
 
  const perPage = 10
  let query = supabase
    .from("tahun_ajaran")
    .select(`*`)
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
        message: "tahun ajaran fetched successfully",
        data:{...payload},
      }),
      { status: 200 }
    );
  } else {
    return new Response(
      JSON.stringify({
        message: "tahun ajaran fetched successfully",
        data: [],
      }),
      { status: 404 }
    );
  }
};
 
export const POST = async ({ params, request, url }) => {
  const { tahunAwal,tahunAkhir } = await request.json();

  if(tahunAwal === tahunAkhir){
    return new Response(
      JSON.stringify({
        message: "Data tahun Gagal Ditambahkan, tahun awal dan tahun akhir tidak boleh sama",
      }),
      { status: 500 }
    );
  }


  const { data: tahunAjaranData, error: tahunAjaranError } = await supabase
    .from("tahun_ajaran")
    .insert([{ nama:`${tahunAwal}/${tahunAkhir}`,tahun_awal:tahunAwal,tahun_akhir:tahunAkhir,status:false }])
    .select();

  if (tahunAjaranError) {
    
    return new Response(
      JSON.stringify({
        message: "Data tahun Gagal Ditambahkan, Data tahun ajaran tidak boleh sama",
      }),
      { status: 500 }
    );
  }

  


  return new Response(
    JSON.stringify({
      message: "Data Tahun Ajaran Berhasil Ditambahkan ",
    }),
    { status: 200 }
  );
};



export const PUT = async ({ params, request, url }) => {
  try {
    // Parsing request body
    const { id, tahunAwal, tahunAkhir, status } = await request.json();

    // Check if the year range already exists
    const { data: existingTahunAjaran, error: checkError } = await supabase
      .from("tahun_ajaran")
      .select("*")
      .eq("tahun_awal", tahunAwal)
      .eq("tahun_akhir", tahunAkhir)
      .not("id", "eq", id); // Ensure we're not checking the same record

    if (checkError) {
     
      return new Response(
        JSON.stringify({
          message: "Internal Server Error while checking existing tahun ajaran",
        }),
        { status: 500 }
      );
    }

    if (existingTahunAjaran.length > 0) {
      return new Response(
        JSON.stringify({
          message: "Tahun ajaran dengan tahun awal dan akhir yang sama sudah ada",
        }),
        { status: 409 }
      );
    }

    // Check if there is already an active year
    if (status) {
      const { data: activeTahunAjaran, error: activeCheckError } = await supabase
        .from("tahun_ajaran")
        .select("*")
        .eq("status", true)
        .not("id", "eq", id); // Ensure we're not checking the same record

      if (activeCheckError) {
        
        return new Response(
          JSON.stringify({
            message: "Internal Server Error while checking active tahun ajaran",
          }),
          { status: 500 }
        );
      }

      if (activeTahunAjaran.length > 0) {
        return new Response(
          JSON.stringify({
            message: "Hanya boleh ada satu tahun ajaran yang aktif",
          }),
          { status: 409 }
        );
      }
    }

    // Update tahun ajaran data
    const { data: updateData, error: updateError } = await supabase
      .from("tahun_ajaran")
      .update({ 
        nama: `${tahunAwal}/${tahunAkhir}`, 
        tahun_awal: tahunAwal, 
        tahun_akhir: tahunAkhir, 
        status 
      })
      .eq('id', id)
      .select();

    if (updateError) {
      return new Response(
        JSON.stringify({
          message: "Internal Server Error during update",
        }),
        { status: 500 }
      );
    }

    return new Response(
      JSON.stringify({
        message: "Data tahun ajaran berhasil diperbarui",
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
  const id = url.searchParams.get("id");

  const { error } = await supabase.from("tahun_ajaran").delete().eq("id", id);

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
      message: "Data Tahun Ajaran Berhasil Di Hapus",
    }),
    { status: 200 }
  );
};
