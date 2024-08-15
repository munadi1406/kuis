import { supabase } from "@/lib/supabase";

export const GET = async ({ url }) => {
  try {
    const id = url.searchParams.get("id");

    // Fetch quiz details to get the quiz creation date
    const { data: quizData, error: quizError } = await supabase
      .from('quiz')
      .select('id_kelas, created_at, start_quiz,end_quiz,id_tahun_ajaran,id_user,kelas(kelas)')
      .eq('id', id)
      .single();

    if (quizError || !quizData) {
      return new Response(
        JSON.stringify({ message: "Error fetching quiz data" }),
        { status: 500 }
      );
    }

    // Fetch class history to get the students in the class for the given academic year
    const { data: historyData, error: historyError } = await supabase
      .from('kelas_history')
      .select(`nisn, siswa(nama_lengkap)`)
      .eq('id_kelas', quizData.id_kelas)
      .eq('id_tahun_ajaran', quizData.id_tahun_ajaran);

    if (historyError || !historyData) {
      return new Response(
        JSON.stringify({ message: "Error fetching class history" }),
        { status: 500 }
      );
    }

    // Fetch answers with their corresponding option details
    const { data: answers, error: answersError } = await supabase
      .from("answers")
      .select(`nisn, id_option, options(option_is_true)`)
      .eq('id_quiz', id);

    if (answersError || !answers) {
      return new Response(
        JSON.stringify({ message: "Error fetching answers" }),
        { status: 500 }
      );
    }

    // Fetch total number of questions in the quiz
    const { count: questionCount, error: questionError } = await supabase
      .from("questions")
      .select('id', { count: "exact", head: true })
      .eq('id_quiz', id);

    if (questionError || questionCount === null) {
      return new Response(
        JSON.stringify({ message: "Error fetching question count" }),
        { status: 500 }
      );
    }

    // Fetch answer status to check if the quiz was completed by the student
    const { data: answerStatusData, error: answerStatusError } = await supabase
      .from('answer_status')
      .select('nisn, status')
      .eq('id_quiz', id);

    if (answerStatusError || !answerStatusData) {
      return new Response(
        JSON.stringify({ message: "Error fetching answer status" }),
        { status: 500 }
      );
    }

    // Create a map of nisn to student details
    const studentMap = historyData.reduce((acc, student) => {
      acc[student.nisn] = { 
        namaLengkap: student.siswa.nama_lengkap, 
        score: 0,
        status: false // Default status to false
      };
      return acc;
    }, {});

    // Process the data to calculate the score for each student
    answers.forEach(answer => {
      const { nisn, options: { option_is_true } } = answer;
      if (studentMap[nisn] && option_is_true) {
        studentMap[nisn].score += 1;
      }
    });

    // Update the status based on answer_status table
    answerStatusData.forEach(status => {
      if (studentMap[status.nisn]) {
        studentMap[status.nisn].status = status.status;
      }
    });

    // Convert the studentMap to an array and add total question count
    const userScoresArray = Object.keys(studentMap).map(nisn => ({
      nisn,
      namaLengkap: studentMap[nisn].namaLengkap,
      score: studentMap[nisn].score,
      total: questionCount,
      status: studentMap[nisn].status, // Add the status to the response
    }));

    // Sort students alphabetically by their names
    userScoresArray.sort((a, b) => a.namaLengkap.localeCompare(b.namaLengkap));
    const {data:guruData}= await supabase.from('guru').select('*').eq('id_user',quizData.id_user).single()

    return new Response(
      JSON.stringify({
        message: "User details fetched successfully",
        data: userScoresArray,
        guruData,
        quiz:quizData
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




  