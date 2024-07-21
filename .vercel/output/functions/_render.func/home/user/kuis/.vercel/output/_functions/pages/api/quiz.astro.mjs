import { s as supabase } from '../../chunks/supabase_DBBGmT5w.mjs';
export { renderers } from '../../renderers.mjs';

const POST = async ({ params, request, url }) => {
    const { title, desc, startDate, endDate, token, soalData, mapel, kelas, id_user } = await request.json();
    console.log(title, desc, startDate, endDate, token, soalData, mapel, kelas);
  
    let quizId;
    let insertedQuestionIds = [];
  
    try {
      // Insert into quiz table
      const { data: quizData, error: quizError } = await supabase
        .from("quiz")
        .insert({ title, desc, startDate, endDate, token, mapel, kelas, id_user })
        .select();
  
      if (quizError) throw new Error(`Quiz insert error: ${quizError.message}`);
  
      quizId = quizData[0].id;
  
      // Prepare soalData array for bulk insert
      const soalInsertData = soalData.map(e => ({
        id_quiz: quizId,
        question: e.question
      }));
      
      // Insert all questions in bulk
      const { data: questionData, error: questionError } = await supabase
        .from("questions")
        .insert(soalInsertData)
        .select();
  
      if (questionError) throw new Error(`Question insert error: ${questionError.message}`);
  
      insertedQuestionIds = questionData.map(q => q.id);
  
      // Map questions to their respective answers
      const answerInsertData = [];
      questionData.forEach((question, index) => {
        const answers = soalData[index].answerOption.map(answer => ({
          id_question: question.id,
          answer_option: answer.answerOption,
          answer_is_true: answer.answerIsTrue
        }));
        answerInsertData.push(...answers);
      });
  
      // Insert all answers in bulk
      const { data: answerData, error: answerError } = await supabase
        .from("answers")
        .insert(answerInsertData)
        .select();
  
      if (answerError) throw new Error(`Answer insert error: ${answerError.message}`);
  
      return new Response(
        JSON.stringify({
          message: "Kuis Berhasil Dibuat",
        }),
        { status: 200 }
      );
    } catch (error) {
      console.error('Transaction error:', error.message);
  
      // Rollback operations
      if (quizId) {
        await supabase.from('quiz').delete().eq('id', quizId);
      }
  
      if (insertedQuestionIds.length > 0) {
        await supabase.from('questions').delete().in('id', insertedQuestionIds);
      }
  
      return new Response(
        JSON.stringify({
          message: "Gagal Membuat Kuis, rollback dilakukan",
          error: error.message
        }),
        { status: 500 }
      );
    }
  };

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
