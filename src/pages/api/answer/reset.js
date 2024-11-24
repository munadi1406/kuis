import { supabase } from "@/lib/supabase";




// export const POST = async ({ params, request, url }) => {
//   try {
//     const { idQuiz, nisn } = await request.json();

//     // Step 1: Delete all entries in `answers` table where nisn and idQuiz match
//     const { error: deleteAnswersError } = await supabase
//       .from('answers')
//       .delete()
//       .eq('nisn', nisn)
//       .eq('id_quiz', idQuiz);

//     if (deleteAnswersError) {
//       console.error('Error deleting answers:', deleteAnswersError);
//       return new Response(
//         JSON.stringify({

//           message: deleteAnswersError.message
//         }),
//         { status: 500 }
//       );
//     }

//     // Step 2: Delete the corresponding entry in `answer_status` table where nisn and idQuiz match
//     const { error: deleteStatusError } = await supabase
//       .from('answer_status')
//       .delete()
//       .eq('nisn', nisn)
//       .eq('id_quiz', idQuiz);

//     if (deleteStatusError) {
//       console.error('Error deleting answer status:', deleteStatusError);
//       return new Response(
//         JSON.stringify({

//           messsage: deleteStatusError.message
//         }),
//         { status: 500 }
//       );
//     }

//     // If both deletions are successful, return a success response
//     return new Response(
//       JSON.stringify({
//         message: "Answers and answer status successfully reset.",
        
//       }),
//       { status: 200 }
//     );

//   } catch (error) {
//     return new Response(
//       JSON.stringify({
//         message: "Internal Server Error",

//       }),
//       { status: 500 }
//     );
//   }
// }


export const POST = async ({ params, request, url }) => {
  try {
    const { idQuiz, nisn } = await request.json();

    // Step 1: Fetch all previous answers for the given nisn and idQuiz
    const { data: previousAnswers, error: fetchAnswersError } = await supabase
      .from('answers')
      .select('id_question, id_option')
      .eq('nisn', nisn)
      .eq('id_quiz', idQuiz);

    if (fetchAnswersError) {
      console.error('Error fetching previous answers:', fetchAnswersError);
      return new Response(
        JSON.stringify({
          message: fetchAnswersError.message
        }),
        { status: 500 }
      );
    }

    // Step 2: Fetch correct options for related questions
    const questionIds = previousAnswers.map(answer => answer.id_question);
    const { data: correctOptions, error: fetchOptionsError } = await supabase
      .from('options')
      .select('id, option_is_true, id_question')
      .in('id_question', questionIds); // Use id_question to filter

    if (fetchOptionsError) {
      console.error('Error fetching options:', fetchOptionsError);
      return new Response(
        JSON.stringify({
          message: fetchOptionsError.message
        }),
        { status: 500 }
      );
    }

    // Map the `is_true` property to the user's answers
    const enhancedAnswers = previousAnswers.map(answer => {
      const correctOption = correctOptions.find(
        option => option.id === answer.id_option && option.id_question === answer.id_question
      );
      return {
        ...answer,
        option_is_true: correctOption ? correctOption.option_is_true : false
      };
    });

    // Step 3: Fetch total questions for the quiz
    const { data: totalQuestions, error: fetchQuestionsError } = await supabase
      .from('questions')
      .select('id')
      .eq('id_quiz', idQuiz);

    if (fetchQuestionsError) {
      console.error('Error fetching questions:', fetchQuestionsError);
      return new Response(
        JSON.stringify({
          message: fetchQuestionsError.message
        }),
        { status: 500 }
      );
    }

    // Calculate total questions and score
    const totalQuestionsCount = totalQuestions.length;
    const correctCount = enhancedAnswers.filter(answer => answer.option_is_true).length;
    // console.log({correctCount})

    // Step 4: Calculate the final score as a percentage
    const score = calculateScorePercentage(correctCount, totalQuestionsCount);
    // console.log(score)

    // Step 5: Determine the next attempt number
    const { data: historyData, error: historyFetchError } = await supabase
      .from('nilai_history')
      .select('attempt_no')
      .eq('nisn', nisn)
      .eq('id_quiz', idQuiz);

    if (historyFetchError) {
      console.error('Error fetching history data:', historyFetchError);
      return new Response(
        JSON.stringify({
          message: historyFetchError.message
        }),
        { status: 500 }
      );
    }

    const attemptNo = historyData.length > 0 ? Math.max(...historyData.map(h => h.attempt_no)) + 1 : 1;

    // Step 6: Insert the history record
    const { error: insertHistoryError } = await supabase
      .from('nilai_history')
      .insert([
        {
          id_quiz: idQuiz,
          nisn: nisn,
          attempt_no: attemptNo,
          answers: JSON.stringify(enhancedAnswers),
          score: score
        }
      ]);

    if (insertHistoryError) {
      console.error('Error inserting into nilai_history:', insertHistoryError);
      return new Response(
        JSON.stringify({
          message: insertHistoryError.message
        }),
        { status: 500 }
      );
    }

    // Step 7: Delete all entries in `answers` table
    const { error: deleteAnswersError } = await supabase
      .from('answers')
      .delete()
      .eq('nisn', nisn)
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

    // Step 8: Delete the corresponding entry in `answer_status` table
    const { error: deleteStatusError } = await supabase
      .from('answer_status')
      .delete()
      .eq('nisn', nisn)
      .eq('id_quiz', idQuiz);

    if (deleteStatusError) {
      console.error('Error deleting answer status:', deleteStatusError);
      return new Response(
        JSON.stringify({
          message: deleteStatusError.message
        }),
        { status: 500 }
      );
    }

    // Success Response
    return new Response(
      JSON.stringify({
        message: "Previous answers archived, and answers and status reset successfully."
      }),
      { status: 200 }
    );

  } catch (error) {
    console.error('Internal Server Error:', error);
    return new Response(
      JSON.stringify({
        message: "Internal Server Error"
      }),
      { status: 500 }
    );
  }
};


const calculateScorePercentage = (correctCount, totalQuestionsCount) => {
  if (totalQuestionsCount === 0) return 0; // Avoid division by zero
  return Math.round((correctCount / totalQuestionsCount) * 100).toFixed(1); // Return score as percentage
};
