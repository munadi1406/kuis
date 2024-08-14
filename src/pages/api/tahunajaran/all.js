import { supabase } from "@/lib/supabase";


export const GET = async ({ params, url }) => {
  
 
 
  let query = supabase
    .from("tahun_ajaran")
    .select(`*`)
    .order("nama", { ascending: true });
  
 
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


  const payload = {
    
    data,
    
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