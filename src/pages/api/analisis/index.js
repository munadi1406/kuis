import { supabase } from "@/lib/supabase";

export const GET = async ({ params, url }) => {
    try {
      const id = url.searchParams.get("id");
     
      // Fetch answers with their corresponding option details
      const { data: answers, error: answersError } = await supabase
        .from("answers")
        .select(`nisn, id_question, options(option_is_true)`)
        .eq('id_quiz', id);
        const { data: quiz, error:err} = await supabase
        .from("quiz")
        .select(`id,title,start_quiz,end_quiz,kelas(kelas),mapel(mapel),id_user`)
        .eq('id', id).single();
      if (answersError) {
        // console.log({answersError})
        return new Response(
          JSON.stringify({
            message: "Error fetching answers",
            data: [],
          }),
          { status: 500 }
        );
      }
  
      // Fetch all questions
      const { data: questions, error: questionsError } = await supabase
        .from("questions")
        .select("id, question")
        .eq('id_quiz', id);
  
      if (questionsError) {
        // console.log(questionsError)
        return new Response(
          JSON.stringify({
            message: "Error fetching questions",
            data: [],
          }),
          { status: 500 }
        );
      }
  
      // Create a map of questionId to questionText
      const questionMap = questions.reduce((acc, question) => {
        acc[question.id] = question.question;
        return acc;
      }, {});
  
      // Count errors for each question
      const questionErrors = {};
      const questionTotal = {};
      answers.forEach(answer => {
        const { id_question, options: { option_is_true } } = answer;
  
        if (!questionTotal[id_question]) {
          questionTotal[id_question] = 0;
          questionErrors[id_question] = 0;
        }
  
        questionTotal[id_question] += 1;
        if (!option_is_true) {
          questionErrors[id_question] += 1;
        }
      });
  
      // Convert the questionErrors object into an array and sort by errors
      const questionErrorsArray = Object.keys(questionErrors).map(questionId => ({
        questionId,
        question: questionMap[questionId],
        errors: questionErrors[questionId],
        total: questionTotal[questionId],
        
      }));
  
      questionErrorsArray.sort((a, b) => b.errors - a.errors);
  
      // Format results for output
      const formattedResults = questionErrorsArray.map(q => ({
        soal: q.question,
        hasil: `${q.errors}/${q.total} siswa salah`
      }));
      const {data:gurudata} = await supabase.from('guru').select('nama_lengkap').eq('id_user',quiz.id_user).single()
      return new Response(
        JSON.stringify({
          message: 200,
          data: formattedResults,
          ...quiz,
          ...gurudata
        }),
        { status: 200 }
      );
    } catch (error) {
      console.error(error);
      return new Response(
        JSON.stringify({
          message: "Unexpected error",
          data: [],
        }),
        { status: 500 }
      );
    }
  };
  