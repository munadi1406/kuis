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

export const PUT = async ({ params, request, url }) => {
    const { username, id } = await request.json();

    // Pengecekan apakah username sudah ada
    const { data: existingUser, error: checkError } = await supabase
        .from('detail_user')
        .select('id_user')
        .eq('username', username);
    if (checkError) {
        return new Response(
            JSON.stringify({
                message: "Error checking existing username",
                error: checkError.message,
            }),
            { status: 500 }
        );
    }
  
    if (existingUser.length > 0) {
        return new Response(
            JSON.stringify({
                message: "Username sudah digunakan",
            }),
            { status: 409 }
        );
    }

    // Update username
    const { data: detailData, error: detailError } = await supabase
        .from('detail_user')
        .update({ username: username })
        .eq('id_user', id)
        .select();

    const { data: user, error } = await supabase.auth.admin.updateUserById(id, {
        user_metadata: {
            username,
        },
    });

    if (detailError || error) {
        return new Response(
            JSON.stringify({
                message: "Error updating username",
                error: detailError.message,
            }),
            { status: 500 }
        );
    }

    return new Response(
        JSON.stringify({
            message: "Username updated successfully",
            data: detailData,
        }),
        { status: 200 }
    );
};
