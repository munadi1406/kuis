import { supabase } from "../../../lib/supabase";
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const GET = async ({ params, url }) => {
  try {
    const search = url.searchParams.get("search");
    const id = url.searchParams.get("id");

   let perPage = 10

    let query = supabase
      .from("hp")
      .select(`*`)
      .limit(perPage)
      .order("id", { ascending: true })

    // Kondisi untuk id
    if (id > 0) {
      query = query.lt("id", id);
    }

    // Kondisi untuk search
    if (search) {
      query = query.ilike("merk", `%${search}%`);
    }

    const { data, error } = await query;

    if (error) {
      return new Response(
        JSON.stringify({
          message: "Error fetching hp details",
          error: error.message,
        }),
        { status: 500 }
      );
    }

    // Hitung jumlah siswa berdasarkan jenis kelamin
    

    let lastId = null;
    if (data.length > 0) {
      lastId = data[data.length - 1].id;
    }

    const payload = {
      lastId,
      data,
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
    // console.log(error)
    return new Response(
      JSON.stringify({
        message: "Internal Server error",
      }),
      { status: 500 }
    );
  }
};

export const POST = async ({ params, request, url }) => {
    const formData = await request.formData()
    // console.log(formData)
    const imei = formData.get('imei')
    const merk = formData.get('merk')
    const tahunPembuatan = formData.get('tanggal_pembuatan')

    const harga = formData.get('harga')
    const foto = formData.get('foto')
    // console.log(foto.name)

  
    
   
   
  
    const { data: datas,error:errorFilea } = await supabase.storage
      .from("test")
      .upload(`public/${foto.name}`, foto, {
        cacheControl: "3600",
        upsert: false,
      });
  
    const { data: urls, error: err } = supabase.storage
      .from("test")
      .getPublicUrl(`public/${foto.name}`);
      
      // console.log({urls})


  const { data, error } = await supabase
    .from("hp")
    .insert({imei,merk,tanggal_pembuatan:tahunPembuatan,harga,foto:urls.publicUrl})
    .select();
    // console.log(error)
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
      message: "Data Hp Berhasil Ditambahkan",
    }),
    { status: 200 }
  );
};
export const PUT = async ({ params, request, url }) => {
    const { imei,merk,tahunPembuatan,harga,foto,id } = await request.json();



  const { data, error } = await supabase
    .from("hp")
    .update({imei,merk,tahun_pembuatan:tahunPembuatan,harga,foto})
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
      message: "Data HP Berhasil Di Update",
    }),
    { status: 200 }
  );
};

export const DELETE = async ({ params, request, url }) => {
  const id = url.searchParams.get("id");

  const { error } = await supabase.from("hp").delete().eq("id", id);

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
      message: "Data HP Berhasil Di Hapus",
    }),
    { status: 200 }
  );
};
