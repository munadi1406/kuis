import { supabase } from "../../../lib/supabase";


export const GET = async ({ params, url }) => {
  const search = url.searchParams.get("search");
  const id = url.searchParams.get("id");
  const perPage = 10;

  // Query untuk mengambil data feedback
  let query = supabase
    .from("feedback")
    .select("*")
    .limit(perPage)
    .order("created_at", { ascending: false });

  // Kondisi untuk id
  if (id > 0) {
    query = query.lt("id", id);
  }

  // Ambil semua data feedback untuk menghitung statistik rating
  const { data: allFeedbackData, error: allFeedbackError } = await supabase
    .from("feedback")
    .select("rating");

  // Ambil data feedback berdasarkan id dan pagination
  const { data, error } = await query;

  if (error || allFeedbackError) {
    return new Response(
      JSON.stringify({
        message: "Error fetching feedback details",
        error: error ? error.message : allFeedbackError.message,
      }),
      { status: 500 }
    );
  }

  // Menghitung statistik rating
  const totalFeedback = allFeedbackData.length;
  const ratingStats = [1, 2, 3, 4, 5].map((rating) => {
    const count = allFeedbackData.filter((feedback) => feedback.rating === rating).length;
    const percentage = ((count / totalFeedback) * 100).toFixed(2);
    return { rating, percentage };
  });

  let lastId = null;
  if (data.length > 0) {
    lastId = data[data.length - 1].id;
  }

  const payload = {
    lastId,
    data,
    perPage,
    ratingStats, // Statistik rating ditambahkan ke payload
  };

  return new Response(
    JSON.stringify({
      message: 200,
      data: payload,
    }),
    { status: 200 }
  );
};



export const POST = async ({ params, request, url }) => {
  const { rating,ulasan } = await request.json();

  
  const { data, error } = await supabase
    .from("feedback")
    .insert([{ rating,ulasan }])
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



