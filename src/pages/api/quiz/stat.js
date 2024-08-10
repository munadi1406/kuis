import { supabase } from "@/lib/supabase";

export const GET = async ({ url }) => {
  try {
    const id = url.searchParams.get("id");

    // Fetch answers with their corresponding option details for the specified quiz
    const { data: answers, error: answersError } = await supabase
      .from("answers")
      .select(`nisn, id_question, options(option_is_true)`)
      .eq('id_quiz', id);

    // Fetch the quiz details
    const { data: quiz, error: quizError } = await supabase
      .from("quiz")
      .select(`id, title,id_kelas`)
      .eq('id', id)
      .single();

    // Fetch all questions for this quiz to determine total number of questions
    const {  error: questionsError,count:countQuestions } = await supabase
      .from("questions")
      .select("id",{count:"exact",})
      .eq('id_quiz', id);
      console.log({countQuestions}) 

    if (answersError || quizError || questionsError) {
      return new Response(
        JSON.stringify({
          message: "Error fetching data",
          data: [],
        }),
        { status: 500 }
      );
    }
    const {  error: studentsError,count } = await supabase
      .from("siswa")
      .select(`nisn`,{count:"exact"})
      .eq('id_kelas', quiz.id_kelas);
      

    const totalQuestions = countQuestions;

    // Create a map of student answers and their correct counts
    const studentScores = {};
    answers.forEach(answer => {
      const { nisn, options: { option_is_true } } = answer;
      if (!studentScores[nisn]) {
        studentScores[nisn] = 0;
      }
      if (option_is_true) {
        studentScores[nisn] += 1; // Increment score for correct answers
      }
    });

    // Calculate statistics
    
    const quizzesDone = Object.keys(studentScores).length;
    
    // Calculate highest and lowest scores
    const scores = Object.values(studentScores);
    const highestScore = scores.length > 0 ? (Math.max(...scores) / totalQuestions * 100).toFixed(1) : 0; // Percent of highest score
    const lowestScore = scores.length > 0 ? (Math.min(...scores) / totalQuestions * 100).toFixed(1) : 0;  // Percent of lowest score

    // Format results for output
    const output = {
      message: 200,
      data: {
        quizSelesai:quizzesDone,       
        nilaiTertinggi: `${highestScore}`,
        nilaiTerendah: `${lowestScore}`,
        totalQuestions,
        siswaCount:count,
      },
    };

    return new Response(
      JSON.stringify(output),
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
