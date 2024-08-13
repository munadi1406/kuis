import { supabase } from "../../../lib/supabase";


export const POST = async ({ request }) => {
  try {
    const { idQuiz, nisn, idQuestion, idOption } = await request.json();

    // Cek apakah jawaban sudah ada
    const { data: existingData, error: fetchError } = await supabase
      .from('answers')
      .select('id')
      .eq('id_quiz', idQuiz)
      .eq('nisn', nisn)
      .eq('id_question', idQuestion)
      .single(); // Gunakan single() karena kita hanya mengharapkan satu hasil atau tidak ada

    

    let response;

    if (existingData) {
      // Jika jawaban sudah ada, lakukan update
      const { data, error } = await supabase
        .from('answers')
        .update({ id_option: idOption })
        .eq('id', existingData.id); // Update berdasarkan id jawaban

      if (error) {
        console.error('Error updating data:', error);
        response = new Response(
          JSON.stringify({
            message: "500",
          }),
          { status: 500 }
        );
      } else {
        response = new Response(
          JSON.stringify({
            message: "201",
          }),
          { status: 201 }
        );
      }
    } else {
      // Jika jawaban belum ada, lakukan insert
      const { data, error } = await supabase
        .from('answers')
        .insert({
          id_quiz: idQuiz,
          nisn: nisn,
          id_question: idQuestion,
          id_option: idOption,
        });

      if (error) {
        console.error('Error inserting data:', error);
        response = new Response(
          JSON.stringify({
            message: "500",
          }),
          { status: 500 }
        );
      } else {
        response = new Response(
          JSON.stringify({
            message: "201",
          }),
          { status: 201 }
        );
      }
    }

    return response;
  } catch (error) {
    console.error('Unexpected error:', error);
    return new Response(
      JSON.stringify({
        message: "500",
        error: error.message,
      }),
      { status: 500 }
    );
  }
};


export const GET = async ({ params, url }) => {
  const idUser = url.searchParams.get("id_u");
  const idQuestion = url.searchParams.get("id_q");
  const { data: existingData, error: fetchError } = await supabase
  .from('answers')
  .select('id_option')
  .eq('id_user', idUser)
  .eq('id_question', idQuestion).single();
  // console.log(fetchError)


  
    return new Response(
      JSON.stringify({
        message: 200,
        data: {...existingData},
      }),
      { status: 200 }
    );
  
};