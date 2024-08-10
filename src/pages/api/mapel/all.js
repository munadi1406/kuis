import { supabase } from "../../../lib/supabase";

export const GET = async ({ params, url }) => {

  const { data:mapel,error } = await supabase
    .from("mapel")
    .select("*")
    .order("mapel", { ascending: true });
 

  if (!error) {
    return new Response(
      JSON.stringify({
        message: "User details fetched successfully",
        data: mapel,
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
