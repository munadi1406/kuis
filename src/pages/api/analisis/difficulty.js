import { supabase } from "@/lib/supabase";

export const GET = async ({ params, url }) => {
  try {
    const id = url.searchParams.get("id");

    // Fetch answers with their corresponding option details
    const { data: answers, error: answersError } = await supabase
      .from("answers")
      .select(`nisn, id_question, options(option_is_true)`)
      .eq('id_quiz', id);
    const { data: quiz, error: err } = await supabase
      .from("quiz")
      .select(`id, title`)
      .eq('id', id).single();

    if (answersError) {
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

    // Initialize data structures for IRT
    const questionCorrectCounts = {};
    const questionAttemptCounts = {};

    // Process answers to count correct answers and total attempts
    answers.forEach(answer => {
      const { id_question, options: { option_is_true } } = answer;
      if (!questionAttemptCounts[id_question]) {
        questionAttemptCounts[id_question] = 0;
        questionCorrectCounts[id_question] = 0;
      }

      questionAttemptCounts[id_question] += 1;
      if (option_is_true) {
        questionCorrectCounts[id_question] += 1;
      }
    });

    // Calculate difficulty parameter for each question
    const questionDifficulty = Object.keys(questionAttemptCounts).map(questionId => {
      const correctCount = questionCorrectCounts[questionId];
      const attemptCount = questionAttemptCounts[questionId];

      // Calculate difficulty parameter
      let difficulty = 0;
      let p = 0;
      if (attemptCount > 0) {
        p = correctCount / attemptCount; // Proportion of correct answers

        if (p === 1) {
          difficulty = -Infinity; // All answers are correct
        } else if (p === 0) {
          difficulty = Infinity; // All answers are incorrect
        } else {
          difficulty = -Math.log(p / (1 - p)); // Difficulty parameter
        }
      }

      // Add description for user-friendly interpretation
      let difficultyDescription = '';
      if (attemptCount > 0) {
        if (p === 1) {
          difficultyDescription = 'Mudah';
          difficulty = -1.5; // Assign a finite low value for easy questions
        } else if (p === 0) {
          difficultyDescription = 'Sulit';
          difficulty = 1.5; // Assign a finite high value for difficult questions
        } else if (difficulty < -1) {
          difficultyDescription = 'Mudah';
        } else if (difficulty <= 1) {
          difficultyDescription = 'Sedang';
        } else {
          difficultyDescription = 'Sulit';
        }
      } else {
        difficultyDescription = 'Tidak Ada Jawaban';
        difficulty = 0;
      }

      return {
        questionId,
        question: questionMap[questionId],
        difficulty: isFinite(difficulty) ? difficulty.toFixed(2) : 'N/A',
        difficultyDescription,
        correctCount,
        attemptCount,
      };
    });

    // Calculate average difficulty and success rate
    const validDifficulties = questionDifficulty.filter(q => q.attemptCount > 0);
    const averageDifficulty = validDifficulties.reduce((acc, q) => acc + parseFloat(q.difficulty), 0) / (validDifficulties.length || 1);
    const totalCorrect = validDifficulties.reduce((acc, q) => acc + q.correctCount, 0);
    const totalAttempts = validDifficulties.reduce((acc, q) => acc + q.attemptCount, 0);

    // Handle case where totalAttempts is zero
    const overallSuccessRate = totalAttempts > 0 ? totalCorrect / totalAttempts : 0;

    // Set overallDifficultyDescription based on conditions
    let overallDifficultyDescription = '';
    if (validDifficulties.length === 0) {
      overallDifficultyDescription = 'Tidak Ada Jawaban';
    } else if (averageDifficulty < -1) {
      overallDifficultyDescription = 'Mudah';
    } else if (averageDifficulty <= 1) {
      overallDifficultyDescription = 'Sedang';
    } else {
      overallDifficultyDescription = 'Sulit';
    }

    // Determine if ready to proceed to the next material
    let readyToProceed = '';
    if (overallSuccessRate >= 0.7 || overallDifficultyDescription === 'Mudah') {
      readyToProceed = 'Siswa siap untuk melanjutkan ke materi berikutnya.';
    } else {
      readyToProceed = 'Siswa perlu lebih banyak pemahaman pada materi ini sebelum melanjutkan ke materi selanjutnya.';
    }

    // Format results for output
    const formattedResults = questionDifficulty.map(q => ({
      soal: q.question,
      kesulitan: q.difficultyDescription,
      detailKesulitan: q.difficulty,
      hasil: `${q.correctCount}/${q.attemptCount} siswa benar`
    }));

    // Add overall difficulty and recommendation to results
    const output = {
      message: 200,
      data: formattedResults,
      overallDifficulty: overallDifficultyDescription,
      averageDifficulty: isFinite(averageDifficulty) ? averageDifficulty.toFixed(2) : 'N/A',
      overallSuccessRate: (overallSuccessRate * 100).toFixed(2) + '%',
      readyToProceed,
      ...quiz
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





