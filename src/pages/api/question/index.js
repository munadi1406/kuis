import { supabase } from "@/lib/supabase";

export const DELETE = async ({ params, url }) => {
  
    const id = url.searchParams.get("id");
   
    const {error} =await  supabase.from("questions").delete().eq('id',id)
  
    
   
    if (error) {
      return new Response(
        JSON.stringify({
          message: "gagal menghapus soal",
         
        }),
        { status: 404 }
      );
    } else {
      return new Response(
        JSON.stringify({
          message: "soal berhasil dihapus",
         
        }),
        { status: 200 }
      );
    }
  };