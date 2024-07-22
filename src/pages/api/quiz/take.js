import { supabase } from "@/lib/supabase";

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
  

export const GET = async ({ params, url }) => {

    const id = url.searchParams.get("id");
    // const perPage = 10

    const {data:questions} = await supabase.from('questions').select(`*,options(
        id,option
    )`).eq('id_quiz',id)
    // console.log(questions)
    const shuffledQuestions = shuffleQuestionsAndOptions(questions);
    console.log(shuffledQuestions) 
    return new Response(
        JSON.stringify({ 
            message: 200,
            data: shuffledQuestions,
        }),
        { status: 200 }
    );
}

