import { supabase } from "@/lib/supabase";

export const GET = async ({ params, url }) => {
  try {
    const id = url.searchParams.get("id");

    const getIdKelas = await supabase.from('quiz').select('id_kelas').eq('id', id).single();

    // Fetch answers with their corresponding option details
    const { data: answers, error: answersError } = await supabase
      .from("answers")
      .select(`nisn, id_option, options(option_is_true)`)
      .eq('id_quiz', id);

    const { count: questionCount } = await supabase
      .from("questions")
      .select('id', { count: "exact", head: true })
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

    // Fetch all students in the class
    const { data: students, error: studentsError } = await supabase
      .from("siswa")
      .select("nisn, nama_lengkap")
      .eq('id_kelas', getIdKelas.data.id_kelas);
     

    if (studentsError) {
      return new Response(
        JSON.stringify({
          message: "Error fetching students",
          data: [],
        }),
        { status: 500 }
      );
    }

    // Create a map of nisn to student details
    const studentMap = students.reduce((acc, student) => {
      acc[student.nisn] = { namaLengkap: student.nama_lengkap, score: 0, status:false };
      return acc;
    }, {});

    // Process the data to calculate the score for each student
    answers.forEach(answer => {
      const { nisn, options: { option_is_true } } = answer;
      if (!studentMap[nisn]) {
        studentMap[nisn] = { namaLengkap: '', score: 0, status:true };
      } else {
        studentMap[nisn].status = true;
      }
      if (option_is_true) {
        studentMap[nisn].score += 1;
      }
    });

    const userScoresArray = Object.keys(studentMap).map(nisn => ({
      nisn,
      namaLengkap: studentMap[nisn].namaLengkap,
      score: studentMap[nisn].score,
      status: studentMap[nisn].status,
      total: questionCount,
    }));

    userScoresArray.sort((a, b) => a.namaLengkap.localeCompare(b.namaLengkap));

    return new Response(
      JSON.stringify({
        message: "User details fetched successfully",
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


  