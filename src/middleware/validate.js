import { supabase } from "@/lib/supabase";
import { defineMiddleware } from "astro:middleware";

// const { cookies, redirect } = Astro;
// `context` and `next` are automatically typed
export const validate = defineMiddleware(async (context, next) => {
  const { request } = context;
  const url = new URL(request.url);
  const protectedPaths = ["/users"];
  if (protectedPaths.includes(url.pathname)) {
    const {
        data: { user },
      } = await supabase.auth.getUser();
    if(user.user_metadata.role === "admin"){
        return next();
    }else{
        return context.redirect('/dashboard')
    }
  }

  return next();
});
