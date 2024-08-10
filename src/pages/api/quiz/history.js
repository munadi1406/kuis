import { supabase } from "@/lib/supabase";


export const GET = async ({ params, url }) => {


    const search = url.searchParams.get("search");
    const id = url.searchParams.get("id");
    const idUser = url.searchParams.get("id_u");
    


    const perPage = 10;
    let query = supabase.from('answer_status').select(`*,quiz!inner(title,detail_user(*),answers(options!inner(id)),questions(id),mapel(mapel),kelas(kelas))`)
    .eq('id_user', idUser)
    .eq('quiz.answers.id_user',idUser)
    .eq('quiz.answers.options.option_is_true',true)
    .order('id',{ascending:false});

    // Kondisi untuk filter

    // Kondisi untuk id
    if (id > 0) {
        query = query.lt("id", id);
    }

    // Kondisi untuk search
    if (search) {
        query = query.ilike("quiz.title", `%${search}%`);
    }

    const { data, error } = await query;

    if (error) {
        // console.log(error);
        return new Response(
            JSON.stringify({
                message: "Error fetching quiz details",
                error: error.message,
            }),
            { status: 500 }
        );
    }

    let lastId = null;

    if (data.length > 0) {
        lastId = data[data.length - 1].id;
    }

    const payload = {
        lastId,
        data,
        perPage
    };

    if (data) {
        return new Response(
            JSON.stringify({
                message: 200,
                data: { ...payload },
            }),
            { status: 200 }
        );
    } else {
        return new Response(
            JSON.stringify({
                message: 404,
                data: [],
            }),
            { status: 404 }
        );
    }
};