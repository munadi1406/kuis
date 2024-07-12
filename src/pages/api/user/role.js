import {supabase} from '../../../lib/supabase'

export const GET = async ({ cookies, redirect }) => {
    const {
        data: { user },
      } = await supabase.auth.getUser();
      const role = await supabase.from("users").select("role").eq("id", user.id).single();
      console.log({error:role.error})
      return new Response(
        JSON.stringify({
          message: "Success",
          role:role.data.role
        }),
        { status: 200 }
      );      
  };