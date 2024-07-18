import { supabase } from "../../../lib/supabase";

export const GET = async ({ params, url }) => {
  
  const { data:kelas,error } = await supabase
    .from("kelas")
    .select("*")
    .order("created_at", { ascending: false });
 

  if (!error) {
    return new Response(
      JSON.stringify({
        message: "User details fetched successfully",
        data: kelas,
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
