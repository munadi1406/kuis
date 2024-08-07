import { supabase } from "../../../lib/supabase";

export const GET = async ({ params, url }) => {
  const search = url.searchParams.get("search");

  let query = supabase.from("detail_user").select("*");

  // Jika search tidak kosong, tambahkan filter ilike
  if (search) {
    query = query.ilike('username', `%${search}%`);
  }

  let { data: detail_user, error } = await query;

  if (error) {
    return new Response(
      JSON.stringify({
        message: "Error fetching user details",
        error: error.message
      }),
      { status: 500 }
    );
  }

  return new Response(
    JSON.stringify({
      message: "User details fetched successfully",
      data: detail_user,
    }),
    { status: 200 }
  );
};
