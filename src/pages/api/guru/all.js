import { supabase } from "../../../lib/supabase";



export const GET = async ({ params, url }) => {

  const { data:mapel,error } = await supabase
    .from("guru")
    .select("*")
    .order("nama_lengkap", { ascending: true });
 

  if (!error) {
    return new Response(
      JSON.stringify({
        message: "guru data fetched successfully",
        data: mapel,
      }),
      { status: 200 }
    );
  } else {
    return new Response(
      JSON.stringify({
        message: "failed",
        data: [],
      }),
      { status: 404 }
    );
  }
};
