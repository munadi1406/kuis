import { supabase } from "@/lib/supabase";
import { defineMiddleware } from "astro:middleware";

// const { cookies, redirect } = Astro;
// `context` and `next` are automatically typed
export const auth = defineMiddleware(async (context, next) => {
  const { request } = context;
  const url = new URL(request.url);
  const protectedPaths = ["/dashboard", "/profile", "/feedback", "/log", "/kuis",'/createKuis','/history','/users'];
  if (protectedPaths.includes(url.pathname)) {
    console.log("middleware running");
    
    const accessToken = context.cookies.get("sb-access-token");
    const refreshToken = context.cookies.get("sb-refresh-token");

    if (!accessToken || !refreshToken) {
       
      return context.redirect("/");
    }

    const { error } = await supabase.auth.setSession({
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
  }

  return next();
});
