import { supabase } from "@/lib/supabase";

export const GET = async ({ cookies, redirect }) => {
  const { error } = await supabase.auth.signOut({scope:"global"});
  cookies.delete("sb-access-token", { path: "/" });
  cookies.delete("sb-refresh-token", { path: "/" });
  return redirect("/");
};
