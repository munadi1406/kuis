import { s as supabase } from '../../../chunks/supabase_DBBGmT5w.mjs';
export { renderers } from '../../../renderers.mjs';

const GET = async ({ params, url }) => {
  const search = url.searchParams.get("search");

  let query = supabase.from("detail_user").select("*");

  // Jika search tidak kosong, tambahkan filter ilike
  if (search) {
    query = query.ilike('username', `%${search}%`);
  }

  let { data: detail_user, error } = await query;

  if (error) {
    return new Response(
      JSON.stringify({
        message: "Error fetching user details",
        error: error.message
      }),
      { status: 500 }
    );
  }

  return new Response(
    JSON.stringify({
      message: "User details fetched successfully",
      data: detail_user,
    }),
    { status: 200 }
  );
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
