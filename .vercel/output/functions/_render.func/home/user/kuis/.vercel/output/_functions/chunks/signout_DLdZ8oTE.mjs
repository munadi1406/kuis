import { s as supabase } from './supabase_DBBGmT5w.mjs';

const GET = async ({ cookies, redirect }) => {
  await supabase.auth.signOut();
  cookies.delete("sb-access-token", { path: "/" });
  cookies.delete("sb-refresh-token", { path: "/" });
  return redirect("/");
};

export { GET };
