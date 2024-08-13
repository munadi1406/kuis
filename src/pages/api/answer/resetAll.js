import { supabase } from "@/lib/supabase";

export const POST = async ({ params, request, url }) => {
    try {
        const { idQuiz } = await request.json();
        // Step 1: Delete all entries in `answers` table where nisn and idQuiz match
        const { error: deleteAnswersError } = await supabase
            .from('answers')
            .delete()
            .eq('id_quiz', idQuiz);
        if (deleteAnswersError) {
            console.error('Error deleting answers:', deleteAnswersError);
            return new Response(
                JSON.stringify({
                    message: deleteAnswersError.message
                }),
                { status: 500 }
            );
        }
        // Step 2: Delete the corresponding entry in `answer_status` table where nisn and idQuiz match
        const { error: deleteStatusError } = await supabase
            .from('answer_status')
            .delete()

            .eq('id_quiz', idQuiz);
        if (deleteStatusError) {
            console.error('Error deleting answer status:', deleteStatusError);
            return new Response(
                JSON.stringify({

                    messsage: deleteStatusError.message
                }),
                { status: 500 }
            );
        }
        return new Response(
            JSON.stringify({
                message: "Semua Jabawan Berhasil Di Reset",

            }),
            { status: 200 }
        );
    } catch (error) {
       
        return new Response(
            JSON.stringify({
                message: "Internal Server Error",

            }),
            { status: 500 }
        );
    }
}