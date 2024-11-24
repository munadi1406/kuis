import { supabase } from "@/lib/supabase";

export const POST = async ({ params, request, url }) => {
    try {
        const { idQuiz } = await request.json();

        // Step 1: Delete all entries in `answers` table where idQuiz matches
        const { error: deleteAnswersError } = await supabase
            .from('answers')
            .delete()
            .eq('id_quiz', idQuiz);
        if (deleteAnswersError) {
            console.error('Error deleting answers:', deleteAnswersError);
            return new Response(
                JSON.stringify({ message: deleteAnswersError.message }),
                { status: 500 }
            );
        }

        // Step 2: Delete the corresponding entries in `answer_status` table where idQuiz matches
        const { error: deleteStatusError } = await supabase
            .from('answer_status')
            .delete()
            .eq('id_quiz', idQuiz);
        if (deleteStatusError) {
            console.error('Error deleting answer status:', deleteStatusError);
            return new Response(
                JSON.stringify({ message: deleteStatusError.message }),
                { status: 500 }
            );
        }

        // Step 3: Delete the corresponding entries in `nilai_history` table where idQuiz matches
        const { error: deleteHistoryError } = await supabase
            .from('nilai_history')
            .delete()
            .eq('id_quiz', idQuiz);
        if (deleteHistoryError) {
            console.error('Error deleting nilai history:', deleteHistoryError);
            return new Response(
                JSON.stringify({ message: deleteHistoryError.message }),
                { status: 500 }
            );
        }

        return new Response(
            JSON.stringify({
                message: "Semua Jawaban dan Nilai Berhasil Direset"
            }),
            { status: 200 }
        );
    } catch (error) {
        console.error('Unexpected error:', error);
        return new Response(
            JSON.stringify({
                message: "Internal Server Error"
            }),
            { status: 500 }
        );
    }
};
