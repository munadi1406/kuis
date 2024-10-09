import { supabase } from "@/lib/supabase";
import { defineMiddleware } from "astro:middleware";

// const { cookies, redirect } = Astro;
// `context` and `next` are automatically typed
export const auth = defineMiddleware(async (context, next) => {
  const { request } = context;
  const url = new URL(request.url);

  const protectedPaths = ["/dashboard", "/profile", "/feedback", "/log", "/kuis", "/createKuis", "/history", "/users", "/mapel", "/kelas", "/laporan", "/progres", "/guru", "/siswa", "/analize", "/tahunajaran", "/edit",'/hp'];
  const isProtectedPath = protectedPaths.some(path => url.pathname === path || url.pathname.startsWith(`${path}/`));

  if (isProtectedPath) {
    const accessToken = context.cookies.get("sb-access-token");
    const refreshToken = context.cookies.get("sb-refresh-token");

    // Jika tidak ada access token atau refresh token, redirect ke halaman login
    if (!accessToken || !refreshToken) {
      await supabase.auth.signOut({ scope: "global" });
      return context.redirect("/");
    }

    // Set session dengan access token yang ada
    let { data, error } = await supabase.auth.setSession({
      refresh_token: refreshToken.value,
      access_token: accessToken.value,
    });

    // Jika terjadi error, coba refresh token
    if (error) {
     

      const refreshResponse = await supabase.auth.refreshSession({ refresh_token: refreshToken.value });

      if (refreshResponse.error) {
       

        // Jika refresh token gagal, hapus token yang ada dan redirect ke halaman login
        context.cookies.delete("sb-access-token", { path: "/" });
        context.cookies.delete("sb-refresh-token", { path: "/" });

        return context.redirect('/');
      }

      // Jika refresh berhasil, update access token dan set session ulang
      data = refreshResponse.data;
      context.cookies.set("sb-access-token", data.session.access_token, { path: "/" });
      context.cookies.set("sb-refresh-token", data.session.refresh_token, { path: "/" });

      // Set session dengan token yang baru diperoleh
      await supabase.auth.setSession({
        refresh_token: data.session.refresh_token,
        access_token: data.session.access_token,
      });
    }

    if (data.session.user) {
      context.locals.role = data.session.user.user_metadata.role;
      context.locals.roleUser = data.session.user.user_metadata.roleUser;
      context.locals.id = data.session.user.id;
      context.locals.email = data.session.user.email;
    }
  }

  return next();
});


