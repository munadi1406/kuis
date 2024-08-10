
import { createClient } from "@supabase/supabase-js";
const supabase = createClient(
    import.meta.env.SUPABASE_URL,
    import.meta.env.SUPABASE_SERVICE_KEY,
    {
        auth: {
            autoRefreshToken: false,
            persistSession: false,
        },
    }
);

export const DELETE = async ({ request, cookies, redirect ,url}) => {
    const id = url.searchParams.get("id");

    if (!id) {
        return new Response(
            JSON.stringify({
                message: "Id Tidak Boleh Kosong",
            }),
            { status: 500 }
        );
    }


    const { data, error } = await supabase.auth.admin.deleteUser(
        id
    )
   

    if (error) {
        return new Response(
            JSON.stringify({
                message: error.message,
            }),
            { status: 500 }
        );
    }

    return new Response(
        JSON.stringify({
            message: "Akun Berhasil DiHapus",
        }),
        { status: 200 }
    );
};
