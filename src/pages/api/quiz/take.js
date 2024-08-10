import { supabase } from "@/lib/supabase";



// import { createClient } from "@supabase/supabase-js";
// const supabase = createClient(
//   import.meta.env.SUPABASE_URL,
//   import.meta.env.SUPABASE_SERVICE_KEY,
//   {
//     auth: {
//       autoRefreshToken: false,
//       persistSession: false,
//     },
//   }
// );



export const POST = async ({ params, request, url }) => {
    const { tokenQuiz } = await request.json();



    let { data: quizData, error } = await supabase
        .from("quiz")
        .select(`id,title,desc,waktu,start_quiz,end_quiz,mapel(
            mapel
        ),kelas(
            kelas
        ),questions(
            id
        )`)
        .eq("token", tokenQuiz).single();

    // console.log(error);
    if (!quizData) {
        return new Response(
            JSON.stringify({
                message: "Kuis Tidak DiTemukan",
            }),
            { status: 409 }
        );
    }
    const jumlahSoal = quizData.questions.length
    const copyQuizData = quizData
    copyQuizData.questions = jumlahSoal
    return new Response(
        JSON.stringify({
            message: "Kuis Ditemukan",
            data: copyQuizData
        }),
        { status: 200 }
    );
};

const fisherYatesShuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

const shuffleQuestionsAndOptions = (questions) => {
    // Mengacak options dalam setiap question
    const questionsWithShuffledOptions = questions.map((question) => {
        if (question.options && question.options.length > 0) {
            question.options = fisherYatesShuffle([...question.options]);
        }
        return question;
    });

    // Mengacak questions
    return fisherYatesShuffle(questionsWithShuffledOptions);
};


export const GET = async ({ params, url,cookies }) => {

    
    try {
        const id = url.searchParams.get("id");
        const nisn = url.searchParams.get("nisn");
        // console.log({iniID :id})
       
     
       

        
        
        const { data: status,error:e2 } = await supabase.from('answer_status').select('*').match({ id_quiz: id, nisn: nisn }).single();
        // console.log({e2});
        // console.log({status});
        const { data: quiz,error:e3 } = await supabase.from('quiz').select('waktu,id_kelas').eq('id', id).single()

        const {data:getIdKelas} = await supabase.from('siswa').select('id_kelas').eq('nisn',nisn).single();

       if(getIdKelas?.id_kelas !== quiz?.id_kelas){
        const {data:kelasName} = await supabase.from('kelas').select('kelas').eq('id',quiz.id_kelas).single();
        return new Response(
            JSON.stringify({
                message: `anda tidak bisa mengerjakan kuis ini karena anda bukan siswa di kelas ${kelasName.kelas}`,
            }),
            { status: 401 }
        );
       }


        
        // console.log({e3})




        if (status?.status) {
            return new Response(
                JSON.stringify({
                    message: "anda sudah mengerjakan kuis",
                }),
                { status: 401 }
            );
        }
        // console.log({ status })
        if (status) {
            // console.log("pengecekan waktu runn")
            const quizDurationMinutes = quiz.waktu; // Durasi waktu dalam menit
            const quizStartTime = new Date(status.created_at); // Waktu mulai quiz
            const now = new Date(); // Waktu saat ini
            const elapsedTimeMinutes = (now - quizStartTime) / (1000 * 60);
            // console.log({ elapsedTimeMinutes })
            // console.log({ quizDurationMinutes })
            if (elapsedTimeMinutes > quizDurationMinutes) {
                return new Response(
                    JSON.stringify({
                        message: "Waktu Pengerjaan Sudah Habis",
                    }),
                    { status: 401 }
                );

            }
        }
        const { data: questions, error } = await supabase.from('questions').select(`*,options(
        id,option
    )`).eq('id_quiz', id)
        const shuffledQuestions = shuffleQuestionsAndOptions(questions);
        // console.log(shuffledQuestions) 
        return new Response(
            JSON.stringify({
                message: 200,
                data: shuffledQuestions,
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

