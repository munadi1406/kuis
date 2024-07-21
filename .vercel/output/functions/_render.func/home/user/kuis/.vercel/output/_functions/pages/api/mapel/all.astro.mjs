import { s as supabase } from '../../../chunks/supabase_DBBGmT5w.mjs';
export { renderers } from '../../../renderers.mjs';

const GET = async ({ params, url }) => {

  const { data:mapel,error } = await supabase
    .from("mapel")
    .select("*")
    .order("created_at", { ascending: false });
 

  if (!error) {
    return new Response(
      JSON.stringify({
        message: "User details fetched successfully",
        data: mapel,
      }),
      { status: 200 }
    );
  } else {
    return new Response(
      JSON.stringify({
        message: "User details fetched successfully",
        data: [],
      }),
      { status: 404 }
    );
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
