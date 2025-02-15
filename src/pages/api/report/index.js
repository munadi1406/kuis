import { supabase } from "@/lib/supabase";


export const GET = async ({ params, url }) => {
  const idUser = url.searchParams.get("id");
  const idKelas = url.searchParams.get("idKelas");
  const idMapel = url.searchParams.get("idMapel");


  const perPage = 10;
  let query;

  query = supabase
    .from("quiz")
    .select(`id,title,kelas(kelas),mapel(mapel),tahun_ajaran(nama)`)
    
    .eq('id_user', idUser)
    .order("created_at", { ascending: false });
  if (idKelas) {
    query = query.eq('id_kelas', idKelas)
  }
  if (idMapel) {
    query = query.eq('id_mapel', idMapel)
  }



  const { data, error } = await query;
  const {data:guruData}= await supabase.from('guru').select('*').eq('id_user',idUser).single()


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
        ...guruData
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


// export const POST = async ({ params, request, url }) => {
//   try {
//     const { idQuiz } = await request.json();

//     // Periksa apakah array idQuiz tidak kosong
//     if (idQuiz.length === 0) {
//       return new Response(
//         JSON.stringify({
//           message: "No idQuiz provided",
//           data: [],
//         }),
//         { status: 400 }
//       );
//     }

//     const perPage = 10;

//     // Mengambil data kuis berdasarkan idQuiz
//     const { data: quizzes, error: quizzesError } = await supabase
//       .from("quiz")
//       .select(`id, title, kkm,id_tahun_ajaran,id_kelas`)
//       .in('id', idQuiz)
//       .limit(perPage)
//       .order("created_at", { ascending: false });
//     console.log(quizzes)
//     if (quizzesError) {
//       throw new Error(quizzesError.message);
//     }

//     // Mendapatkan id_quiz dari kuis yang ditemukan
//     const quizIds = quizzes.map(quiz => quiz.id);

//     // Fetch answers with their corresponding option details
//     const { data: answers, error: answersError } = await supabase
//       .from("answers")
//       .select(`nisn, id_option, id_quiz, options(option_is_true)`)
//       .in('id_quiz', quizIds);

//     if (answersError) {
//       return new Response(
//         JSON.stringify({
//           message: "Error fetching answers",
//           data: [],
//         }),
//         { status: 500 }
//       );
//     }

//     // Fetch all students in the class history for the active academic year
//     const { data: users, error: usersError } = await supabase
//       .from("kelas_history")
//       .select("nisn, siswa(nama_lengkap)")
//       .eq('id_tahun_ajaran', quizzes[0].id_tahun_ajaran)
//       .eq('id_kelas', quizzes[0].id_kelas);

//     if (usersError) {
  
//       return new Response(
//         JSON.stringify({
//           message: "Error fetching users",
//           data: [],
//         }),
//         { status: 500 }
//       );
//     }


//     // Fetch total questions for each quiz separately and include quiz title
//     const questionCounts = await Promise.all(
//       quizIds.map(async quizId => {
//         const { count, error } = await supabase
//           .from("questions")
//           .select("id", { count: "exact", head: true })
//           .eq("id_quiz", quizId);

//         if (error) {
//           throw new Error(error.message);
//         }

//         const quizTitle = quizzes.find(quiz => quiz.id === quizId).title;

//         return { quizId, quizTitle, count };
//       })
//     );

//     const questionCountMap = questionCounts.reduce((acc, item) => {
//       acc[item.quizId] = {
//         title: item.quizTitle,
//         count: item.count
//       };
//       return acc;
//     }, {});

//     // Process the data to calculate the score for each user per quiz
//     const quizResults = [];

//     // Initialize results for each quiz
//     quizIds.forEach(quizId => {
//       const quizResult = {
//         quizId,
//         title: questionCountMap[quizId].title,
//         totalQuestions: questionCountMap[quizId].count,
//         kkm: quizzes[0].kkm,
//         users: users.map(user => ({
//           nisn: user.nisn,
//           namaLengkap: user.siswa.nama_lengkap,
//           score: 0 // default score is 0, indicating no answers submitted
//         }))
//       };
//       quizResults.push(quizResult);
//     });

//     // Map answers to the appropriate user in the result set
//     answers.forEach(answer => {
//       const { nisn, id_quiz, options: { option_is_true } } = answer;

//       const quizResult = quizResults.find(result => result.quizId === id_quiz);
//       if (quizResult) {
//         const userScore = quizResult.users.find(user => user.nisn === nisn);
//         if (userScore && option_is_true) {
//           userScore.score += 1; // Increment score for correct answer
//         }
//       }
//     });

//     return new Response(
//       JSON.stringify({
//         message: 200,
//         data: quizResults,
//       }),
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error(error);
//     return new Response(
//       JSON.stringify({
//         message: "Unexpected error",
//         data: [],
//       }),
//       { status: 500 }
//     );
//   }
// };





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
      .select(`id, title, kkm, id_tahun_ajaran, id_kelas`)
      .in("id", idQuiz)
      .limit(perPage)
      .order("created_at", { ascending: false });

    if (quizzesError) {
      throw new Error(quizzesError.message);
    }

    const quizIds = quizzes.map(quiz => quiz.id);

    // Mengambil jawaban dengan detail opsi yang sesuai
    const { data: answers, error: answersError } = await supabase
      .from("answers")
      .select(`nisn, id_option, id_quiz, options(option_is_true)`)
      .in("id_quiz", quizIds);

    if (answersError) {
      return new Response(
        JSON.stringify({
          message: "Error fetching answers",
          data: [],
        }),
        { status: 500 }
      );
    }

    // Mendapatkan data siswa yang berada di kelas dan tahun ajaran aktif
    const { data: users, error: usersError } = await supabase
      .from("kelas_history")
      .select("nisn, siswa(nama_lengkap)")
      .eq("id_tahun_ajaran", quizzes[0].id_tahun_ajaran)
      .eq("id_kelas", quizzes[0].id_kelas);

    if (usersError) {
      return new Response(
        JSON.stringify({
          message: "Error fetching users",
          data: [],
        }),
        { status: 500 }
      );
    }

    // Mengambil total pertanyaan untuk setiap kuis
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
        count: item.count,
      };
      return acc;
    }, {});

    // Proses data hasil kuis dengan inisialisasi nilai siswa
    const quizResults = [];

    quizIds.forEach(quizId => {
      const quizResult = {
        quizId,
        title: questionCountMap[quizId].title,
        totalQuestions: questionCountMap[quizId].count,
        kkm: quizzes.find(quiz => quiz.id === quizId).kkm,
        users: users.map(user => ({
          nisn: user.nisn,
          namaLengkap: user.siswa.nama_lengkap,
          score: 0, // Nilai awal
          hasRemedial: false, // Properti tambahan untuk remedial
        })),
      };
      quizResults.push(quizResult);
    });

    // Periksa apakah siswa pernah remedial berdasarkan data remedial (jika tersedia)
    const { data: remedials, error: remedialsError } = await supabase
      .from("nilai_history")
      .select("nisn, id_quiz")
      .in("id_quiz", quizIds);

    if (remedialsError) {
      throw new Error(remedialsError.message);
    }

    // Tandai siswa yang pernah remedial
    remedials.forEach(remedial => {
      quizResults.forEach(quizResult => {
        if (quizResult.quizId === remedial.id_quiz) {
          const user = quizResult.users.find(user => user.nisn === remedial.nisn);
          if (user) {
            user.hasRemedial = true;
          }
        }
      });
    });

    // Hitung skor berdasarkan jawaban yang benar
    answers.forEach(answer => {
      const { nisn, id_quiz, options: { option_is_true } } = answer;

      const quizResult = quizResults.find(result => result.quizId === id_quiz);
      if (quizResult) {
        const userScore = quizResult.users.find(user => user.nisn === nisn);
        if (userScore && option_is_true) {
          userScore.score += 1; // Tambahkan nilai untuk jawaban yang benar
        }
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
