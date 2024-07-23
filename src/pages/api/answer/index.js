import { supabase } from "../../../lib/supabase";

const generateCustomToken = (length = 12) => {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let token = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    token += chars[randomIndex];
  }
  return token;
};
export const POST = async ({ params, request, url }) => {
  const { idQuiz, idUser, idQuestion, idOption } = await request.json();
  console.log(idUser)
  const { data: existingData, error: fetchError } = await supabase
  .from('answers')
  .select('id')
  .eq('id_quiz', idQuiz)
  .eq('id_user', idUser)
  .eq('id_question', idQuestion);
  if (existingData.length > 0) {
    // Jika data sudah ada, lakukan update
    const { data, error } = await supabase
      .from('answers')
      .update({
        id_option: idOption
      })
      .match({
        id_quiz: idQuiz,
        id_user: idUser,
        id_question: idQuestion
      });
  
    if (error) {
      console.error('Error updating data:', error);
    } else {
      console.log('Data updated successfully:', data);
    }
  } else {
    // Jika data tidak ada, lakukan insert
    const { data, error } = await supabase
      .from('answers')
      .insert({
        id_quiz: idQuiz,
        id_user: idUser,
        id_question: idQuestion,
        id_option: idOption
      });
  
    if (error) {
      console.error('Error inserting data:', error);
      return new Response(
        JSON.stringify({
          message: "500",
        }),
        { status: 500 }
      );
    } else {
      console.log('Data inserted successfully:', data);
      return new Response(
        JSON.stringify({
          message: "200",
        }),
        { status: 200 }
      );
    }
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