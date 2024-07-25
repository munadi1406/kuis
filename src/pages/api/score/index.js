import { supabase } from "@/lib/supabase";

export const GET = async ({ params, url }) => {
    try {
      const id = url.searchParams.get("id");
      const perPage = 10;
  
      // Fetch answers with their corresponding option details
      const { data: answers, error: answersError } = await supabase
        .from("answers")
        .select(`id_user, id_option, options(option_is_true)`)
        .eq('id_quiz', id);
      const { count } = await supabase
        .from("questions")
        .select('id',{count:"exact",head:"true"})
        .eq('id_quiz', id);
       
  
      if (answersError) {
       
        return new Response(
          JSON.stringify({
            message: "Error fetching answers",
            data: [],
          }),
          { status: 500 }
        );
      }
  
      // Extract unique user IDs from the answers
      const userIds = [...new Set(answers.map(answer => answer.id_user))];
  
      // Fetch user details
      const { data: users, error: usersError } = await supabase
        .from("detail_user")
        .select("id_user, nama_lengkap")
        .in('id_user', userIds);
      if (usersError) {
       
        return new Response(
          JSON.stringify({
            message: "Error fetching users",
            data: [],
          }),
          { status: 500 }
        );
      }
  
      // Create a map of userId to username
      const userMap = users.reduce((acc, user) => {
        acc[user.id_user] = user.nama_lengkap;
        return acc;
      }, {});
     
      // Process the data to calculate the score for each user
      const userScores = {};
      answers.forEach(answer => {
        const { id_user, options: { option_is_true } } = answer;
        
        if (!userScores[id_user]) {
          userScores[id_user] = { namaLengkap: userMap[id_user], score: 0 };
        }
        if (option_is_true) {
          userScores[id_user].score += 1;
        }
      
      });
    
  
      // Convert the userScores object into an array
      const userScoresArray = Object.keys(userScores).map(userId => ({
        userId,
        namaLengkap: userScores[userId].namaLengkap,
        score: userScores[userId].score,
        total: count,
      })); 
      
   
      return new Response(
        JSON.stringify({
          message: 200,
          data: userScoresArray,
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
  