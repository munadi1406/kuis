import { supabase } from "@/lib/supabase";

export const GET = async ({ params, url }) => {
   
    const id = url.searchParams.get("id");
    
    let { data, error } = await supabase
      .from("questions")
      .select("*,options(*)").eq('id_quiz',id);
    // console.log({data});
    
  
    
  
    if (error) {
      return new Response(
        JSON.stringify({
          message: "Error fetching quiz details",
          error: error.message,
        }),
        { status: 500 }
      );
    }
  
    
  
    if (data) {
      return new Response(
        JSON.stringify({
          message: 200,
          data: data,
        }),
        { status: 200 }
      );
    } else {
      return new Response(
        JSON.stringify({
          message: 404,
          data: [],
        }),
        { status: 404 }
      );
    }
  };