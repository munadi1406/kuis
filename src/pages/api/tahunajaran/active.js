import { supabase } from "../../../lib/supabase";

export const GET = async () => {
  try {
  
    const { data: activeTahunAjaran, error: tahunAjaranError } = await supabase
      .from("tahun_ajaran")
      .select("*")
      .eq("status", true)  // Get the active academic year
      .single();  // Ensure we get only one record

    if (tahunAjaranError) {
      return new Response(
        JSON.stringify({
          message: "Error fetching active academic year",
          error: tahunAjaranError.message,
        }),
        { status: 500 }
      );
    }

    if (!activeTahunAjaran) {
      return new Response(
        JSON.stringify({
          message: "No active academic year found",
          data: [],
        }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({
        message: "Active academic year fetched successfully",
        data: activeTahunAjaran,
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

