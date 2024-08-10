import { supabase } from "@/lib/supabase";


export const GET = async ({ params, url }) => {
  const idUser = url.searchParams.get("id");


  const perPage = 10;
  let query;

  query = supabase
    .from("quiz")
    .select(`id,title,kelas(kelas),mapel(mapel)`)
    .limit(perPage)
    .eq('id_user', idUser)
    .order("created_at", { ascending: false });




  const { data, error } = await query;

  if (error) {
    return new Response(
      JSON.stringify({
        message: "Error fetching quiz details",
        error: error.message,
      }),
      { status: 500 }
    );
  }


  if (data) {
    return new Response(
      JSON.stringify({
        message: 200,
        data: data,
      }),
      { status: 200 }
    );
  } else {
    return new Response(
      JSON.stringify({
        message: 200,
        data: [],
      }),
      { status: 200 }
    );
  }
};


export const POST = async ({ params, request, url }) => {
  try {
    const { idQuiz } = await request.json();

    // Periksa apakah array idQuiz tidak kosong
    if (idQuiz.length === 0) {
      return new Response(
        JSON.stringify({
          message: "No idQuiz provided",
          data: [],
        }),
        { status: 400 }
      );
    }

    const perPage = 10;

    // Mengambil data kuis berdasarkan idQuiz
    const { data: quizzes, error: quizzesError } = await supabase
      .from("quiz")
      .select(`id, title`)
      .in('id', idQuiz)
      .limit(perPage)
      .order("created_at", { ascending: false });

    if (quizzesError) {
      throw new Error(quizzesError.message);
    }

    // Mendapatkan id_quiz dari kuis yang ditemukan
    const quizIds = quizzes.map(quiz => quiz.id);

    // Fetch answers with their corresponding option details
    const { data: answers, error: answersError } = await supabase
      .from("answers")
      .select(`id_user, id_option, id_quiz, options(option_is_true)`)
      .in('id_quiz', quizIds);

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

    // Fetch total questions for each quiz separately and include quiz title
    const questionCounts = await Promise.all(
      quizIds.map(async quizId => {
        const { count, error } = await supabase
          .from("questions")
          .select("id", { count: "exact", head: true })
          .eq("id_quiz", quizId);

        if (error) {
          throw new Error(error.message);
        }

        const quizTitle = quizzes.find(quiz => quiz.id === quizId).title;

        return { quizId, quizTitle, count };
      })
    );

    const questionCountMap = questionCounts.reduce((acc, item) => {
      acc[item.quizId] = {
        title: item.quizTitle,
        count: item.count
      };
      return acc;
    }, {});

    // Process the data to calculate the score for each user per quiz
    const quizResults = [];

    answers.forEach(answer => {
      const { id_user, id_quiz, options: { option_is_true } } = answer;

      let quizResult = quizResults.find(result => result.quizId === id_quiz);

      if (!quizResult) {
        quizResult = {
          quizId: id_quiz,
          title: questionCountMap[id_quiz].title,
          totalQuestions: questionCountMap[id_quiz].count,
          users: []
        };
        quizResults.push(quizResult);
      }

      let userScore = quizResult.users.find(user => user.userId === id_user);

      if (!userScore) {
        userScore = {
          userId: id_user,
          namaLengkap: userMap[id_user],
          score: 0
        };
        quizResult.users.push(userScore);
      }

      if (option_is_true) {
        userScore.score += 1;
      }
    });

    return new Response(
      JSON.stringify({
        message: 200,
        data: quizResults,
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




