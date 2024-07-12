import { supabase } from '../../../lib/supabase';

export const GET = async ({ cookies, redirect }) => {
  try {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError) {
      console.error(userError);
      return new Response(
        JSON.stringify({ message: "Failed to get user", error: userError.message }),
        { status: 500 }
      );
    }

    if (!user) {
      return new Response(
        JSON.stringify({ message: "User not found" }),
        { status: 404 }
      );
    }

    const { data: roleData, error: roleError } = await supabase
      .from("users")
      .select("role")
      .eq("id", user.id)
      .single();

    if (roleError) {
      console.error(roleError);
      return new Response(
        JSON.stringify({ message: "Failed to get user role", error: roleError.message }),
        { status: 500 }
      );
    }

    return new Response(
      JSON.stringify({
        message: "Success",
        role: roleData.role,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ message: "An unexpected error occurred", error: error.message }),
      { status: 500 }
    );
  }
};
