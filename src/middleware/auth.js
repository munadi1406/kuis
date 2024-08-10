import { supabase } from "@/lib/supabase";
import { defineMiddleware } from "astro:middleware";

// const { cookies, redirect } = Astro;
// `context` and `next` are automatically typed
export const auth = defineMiddleware(async (context, next) => {
  const { request } = context;
  const url = new URL(request.url);
 
  const protectedPaths = ["/dashboard", "/profile", "/feedback", "/log", "/kuis", "/createKuis", "/history", "/users", "/mapel", "/kelas", "/laporan", "/progres","/guru","/siswa"];
  const isProtectedPath = protectedPaths.some(path => url.pathname === path || url.pathname.startsWith(`${path}/`));
 
  if (isProtectedPath) {
    const accessToken = context.cookies.get("sb-access-token");
    const refreshToken = context.cookies.get("sb-refresh-token");
    if (!accessToken || !refreshToken) {
      const { error } = await supabase.auth.signOut({scope:"global"});
      console.log({error})
      return context.redirect("/");
    }

    const { data, error } = await supabase.auth.setSession({
      refresh_token: refreshToken.value,
      access_token: accessToken.value,
    });

    if (error) {
      context.cookies.delete("sb-access-token", {
        path: "/",
      });
      context.cookies.delete("sb-refresh-token", {
        path: "/",
      });

      return context.redirect('/');
    }
   
    
    if(data.session.user){
      context.locals.role = data.session.user.user_metadata.role;
      context.locals.roleUser = data.session.user.user_metadata.roleUser;
      context.locals.id = data.session.user.id;
      context.locals.email = data.session.user.email
     
    }
  }

  return next();
});

