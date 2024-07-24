import { supabase } from "@/lib/supabase";

export const POST = async ({ params, request, url }) => {
    const { idQuiz, idUser, status } = await request.json();
    console.log(status);
  
    // Step 1: Check if the data already exists
    const { data: existingData, error: checkError } = await supabase
      .from('answer_status')
      .select('id')
      .eq('id_user', idUser)
      .eq('id_quiz', idQuiz)
      .single();
  
    if (checkError && checkError.code !== 'PGRST116') {
      console.error('Error checking existing data:', checkError);
      return new Response(
        JSON.stringify({
          message: "500",
        }),
        { status: 500 }
      );
    }
  
    let result;
    let error;
  
    // Step 2: Update if exists, otherwise insert
    if (existingData) {
        const { data: updateData, error: updateError } = await supabase
        .from('answer_status')
        .update({
          status,
          updated_at: new Date().toISOString()  // Manually update `updated_at`
        })
        .eq('id', existingData.id)
        .select().single();
  
      result = updateData;
      error = updateError;
    } else {
      const { data: insertData, error: insertError } = await supabase
        .from('answer_status')
        .insert([{ id_user: idUser, id_quiz: idQuiz, status }])
        .select().single();
  
      result = insertData;
      error = insertError;
    }
  
    if (error) {
    //   console.error('Error inserting/updating data:', error);
      return new Response(
        JSON.stringify({
          message: "500",
          data:result
        }),
        { status: 500 }
      );
    } else {
    //   console.log('Data inserted/updated successfully:', result);
      return new Response(
        JSON.stringify({
          message: "200",
          data:result
        }),
        { status: 200 }
      );
    }
  }
  