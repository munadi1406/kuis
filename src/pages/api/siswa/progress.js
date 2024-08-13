import { supabase } from "@/lib/supabase";

export const GET = async ({ url }) => {
  try {
    const nisn = url.searchParams.get('nisn');
    const perPage = 10;
    const id = url.searchParams.get("id");
    const years = url.searchParams.get('years');
    const print = url.searchParams.get('print');
    const search = url.searchParams.get("search");

    // Query untuk mengambil status jawaban siswa beserta detail kuis
    let statusQuery = supabase
      .from('answer_status')
      .select(`nisn, id_quiz, status,created_at, quiz!inner(id, title, mapel(mapel), kelas(kelas))`,{count:"exact"})
      .eq('nisn', nisn)
      .order('created_at', { ascending: false });

    if (!print) {
      statusQuery = statusQuery.limit(perPage);
    }
    if (search) {
      statusQuery = statusQuery.ilike("quiz.title", `%${search}%`);
    }
    if (id > 0) {
      const dateId = new Date(parseInt(id)); // Jika id adalah timestamp
      statusQuery = statusQuery.lt("created_at", dateId.toISOString());
    }
    if (years) {
      const startDate = new Date(`${years}-01-01`).toISOString();
      statusQuery = statusQuery.gte('quiz.created_at', startDate);
    }

    const { data: answerStatusData, error: answerStatusError,count } = await statusQuery;

    if (answerStatusError) {
      return new Response(
        JSON.stringify({
          message: "Internal server error",
          error: answerStatusError.message,
        }),
        { status: 500 }
      );
    }

    let lastId = null;
    if (answerStatusData.length > 0) {
      lastId = new Date(answerStatusData[answerStatusData.length - 1].created_at).getTime();
    }

    // Process each quiz in answerStatusData to calculate score and total questions
    for (const status of answerStatusData) {
      const { nisn, quiz } = status;
      const { id: quizId } = quiz;

      // Fetch answers for this quiz
      const { data: answers, error: answersError } = await supabase
        .from("answers")
        .select(`id_option, options(option_is_true)`)
        .eq('id_quiz', quizId)
        .eq('nisn', nisn);

      if (answersError) {
        return new Response(
          JSON.stringify({ message: "Error fetching answers" }),
          { status: 500 }
        );
      }

      // Fetch total number of questions in the quiz
      const { count: questionCount, error: questionError } = await supabase
        .from("questions")
        .select('id', { count: "exact", head: true })
        .eq('id_quiz', quizId);

      if (questionError || questionCount === null) {
        return new Response(
          JSON.stringify({ message: "Error fetching question count" }),
          { status: 500 }
        );
      }

      // Calculate score for this quiz
      let score = 0;
      answers.forEach(answer => {
        if (answer.options.option_is_true) {
          score += 1;
        }
      });

      // Add score and total question count to the answer status entry
      status.score = score;
      status.total = questionCount;
    }

    // Fetch the number of quizzes completed per month and year
    const kuisDikerjakanPerBulanTahunObj = answerStatusData.reduce((acc, status) => {
      const date = new Date(status.created_at);
      const yearMonth = `${date.getFullYear()}-${date.getMonth() + 1}`;
      if (!acc[yearMonth]) {
        acc[yearMonth] = 0;
      }
      acc[yearMonth]++;
      return acc;
    }, {});

    // Convert the object to an array
    const kuisDikerjakanPerBulanTahun = Object.entries(kuisDikerjakanPerBulanTahunObj).map(([key, value]) => ({
      date: key,
      count: value,
    }));

    const payload = {
      lastId,
      data: answerStatusData.map(item => ({
        title: item.quiz.title,
        desc: item.quiz.desc,
        id: item.quiz.id,
        start_quiz: item.quiz.start_quiz,
        end_quiz: item.quiz.end_quiz,
        created_at: item.created_at,
        mapel: item.quiz.mapel,
        kelas: item.quiz.kelas,
        answer_status: item.status,
        total: item.total, // Total questions for the quiz
        score: item.score,  // Correct answers
        nilai: item.score / item.total * 100
      })),
      perPage,
      total: count,
      kuisDikerjakanPerBulanTahun,
    };

    return new Response(
      JSON.stringify({
        message: "User details fetched successfully",
        data: payload,
      }),
      { status: 200 }
    );
  } catch (error) {
  
    return new Response(
      JSON.stringify({ message: "Unexpected error", error: error.message }),
      { status: 500 }
    );
  }
};


  